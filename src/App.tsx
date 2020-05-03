import React, { useState, useEffect, useContext, ReactElement } from 'react';
import CurrentUser from './components/CurrentUser/CurrentUser';
import AgentSummary from './components/AgentSummary/AgentSummary';

// React Themeing
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { Chrome, Body, Content, Main } from '@zendeskgarden/react-chrome';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { useZendesk } from './hooks';

import './styles/main.css';

import {
  CurrentUserContext,
  AllUsersContext,
  GroupsContext,
  SelectedGroupProvider,
  AppSettingsContext,
} from './context';

// Types
import { ThemeState, User, Group } from './Types';

const App = () => {
  const handleZendeskEvents = (event: Event) => {
    console.log(event);
    switch (event.type) {
      case 'app.registered':
      case 'pane.activated':
        console.log('Recieved pane or app activated');
        zd.startTimer();
        break;
      case 'app.deactivated':
      case 'pane.deactivated':
        console.log('Recieved pane or app deactivated');
        zd.stopTimer();
        break;
      default:
        break;
    }
  };

  const zd = useZendesk(handleZendeskEvents);
  const [isLoading, updateIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(zd.currentUser);
  const [allUsers, setAllUsers] = useState<User[] | null>(zd.users);
  const [groups, setGroups] = useState<Group[] | null>(zd.groups);

  useEffect(() => {
    setCurrentUser(() => zd.currentUser);
    setAllUsers(() => zd.users);
    setGroups(() => zd.groups);
  });

  let content: ReactElement = <div>Loading...</div>;

  if (!isLoading) {
    content = (
      <ThemeProvider theme={DEFAULT_THEME}>
        <Chrome>
          <Body>
            <Content>
              <AppSettingsContext.Provider value={zd.appSettings}>
                <SelectedGroupProvider>
                  <Grid gutters='sm'>
                    <Row className='u-mv'>
                      <CurrentUserContext.Provider value={currentUser}>
                        <Col>
                          <CurrentUser updateStatus={zd.updateUserStatus} />
                        </Col>
                      </CurrentUserContext.Provider>
                    </Row>
                    <Row>
                      <AllUsersContext.Provider value={allUsers}>
                        <GroupsContext.Provider value={groups}>
                          <Col>
                            <AgentSummary />
                          </Col>
                        </GroupsContext.Provider>
                      </AllUsersContext.Provider>
                    </Row>
                  </Grid>
                </SelectedGroupProvider>
              </AppSettingsContext.Provider>
            </Content>
          </Body>
        </Chrome>
      </ThemeProvider>
    );
  }

  return content;
};

export default App;
