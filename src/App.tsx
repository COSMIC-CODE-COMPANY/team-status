import React, { useState, useEffect, useContext, ReactElement } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from './Theme';
import CurrentUser from './components/CurrentUser/CurrentUser';
import AgentSummary from './components/AgentSummary/AgentSummary';

import { useZendesk } from './hooks';

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
  const pref = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, updateThemeState] = useState<ThemeState>({
    type: undefined,
  });
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(zd.currentUser);
  const [allUsers, setAllUsers] = useState<User[] | null>(zd.users);
  const [groups, setGroups] = useState<Group[] | null>(zd.groups);

  const updateTheme = (): void => {
    if (prefersDarkMode) {
      console.log(`Prefers Dark Mode`);
      updateThemeState({ type: 'dark' });
    } else {
      console.log(`Doesn't prefer Dark Mode`);
      updateThemeState({ type: 'light' });
    }
  };

  useEffect(() => {
    setPrefersDarkMode(() => pref);
    updateTheme();
  }, [pref]);

  useEffect(() => {
    setCurrentUser(() => zd.currentUser);
    setAllUsers(() => zd.users);
    setGroups(() => zd.groups);
  });

  let content: ReactElement = <div>Loading...</div>;
  if (!isLoading) {
    content = (
      <ThemeProvider theme={Theme(themeState)}>
        <CssBaseline />
        <AppSettingsContext.Provider value={zd.appSettings}>
          <SelectedGroupProvider>
            <CurrentUserContext.Provider value={currentUser}>
              <CurrentUser updateStatus={zd.updateUserStatus} />
            </CurrentUserContext.Provider>
            <AllUsersContext.Provider value={allUsers}>
              <GroupsContext.Provider value={groups}>
                <AgentSummary />
              </GroupsContext.Provider>
            </AllUsersContext.Provider>
          </SelectedGroupProvider>
        </AppSettingsContext.Provider>
      </ThemeProvider>
    );
  }

  return content;
};

export default App;
