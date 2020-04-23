import React, { useState, useEffect, ReactElement } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from './Theme';
import CurrentUser from './components/CurrentUser/CurrentUser';
import AgentSummary from './components/AgentSummary/AgentSummary';

import { useZendesk } from "./hooks";

import { CurrentUserContext, AllUsersContext, GroupsContext } from "./context";


// Types
import { ThemeState, ThemeType, User, Group } from './Types';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    padding: 0,
  },
});



const App = () => {
  const zd = useZendesk((event: Event) => console.log(event));
  const pref = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, updateThemeState] = useState<ThemeState>({ type: undefined });
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
    setPrefersDarkMode(() => pref)
    updateTheme()
  }, [pref])

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
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentUser />
        </CurrentUserContext.Provider>
        <AllUsersContext.Provider value={allUsers}>
          <GroupsContext.Provider value={groups}>
            <AgentSummary />
          </GroupsContext.Provider>
        </AllUsersContext.Provider>
      </ThemeProvider>
    );
  }

  return content;
};

export default App;
