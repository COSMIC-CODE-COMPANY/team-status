import React from 'react';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import CurrentUser from './components/CurrentUser/CurrentUser';
import AgentSummary from './components/AgentSummary/AgentSummary';
import { SelectedGroupProvider } from './context';
import { ZendeskContextProvider } from './context/ZDContext';
import './styles/main.css';

const App = () => {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <ZendeskContextProvider>
        <SelectedGroupProvider>
          <CurrentUser />
          <AgentSummary />
        </SelectedGroupProvider>
      </ZendeskContextProvider>
    </ThemeProvider>
  );
};

export default App;
