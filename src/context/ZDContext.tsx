import React, { createContext, useState, useContext, useEffect } from 'react';

import {
  getAppSettings,
  getCurrentUser,
  getGroups,
  getUsers,
  startEventListeners,
  updateUserStatus,
} from '../hooks/useZendesk';

import * as Types from '../Types';
type ZendeskClient = any;
declare let ZAFClient: ZendeskClient;

interface Props {
  children: React.ReactNode;
}

export const ZendeskContext = createContext<Types.Zendesk>({
  groups: null,
  allUsers: null,
  currentUser: null,
  appSettings: null,
  update: null,
});

const client: ZendeskClient = ZAFClient.init();
const updateInterval = 30000;

export const ZendeskContextProvider2 = ({ children }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [appSettings, setAppSettings] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  let timer = 0;

  useEffect(() => {
    if (!isLoaded) {
      events();
      update();
      setIsLoaded(() => true);
    }
  }, []);

  useEffect(() => {
    console.log('IS OPEN', isOpen);
  }, [isOpen]);

  const updater = () => {
    console.log('TICK TOCK GOES THE CLOCK');
    update();
  };

  const handleZendeskEvents = (event: Event) => {
    console.log('ZENDESK EVENT:', event);
    switch (event.type) {
      case 'app.registered':
      case 'pane.activated':
        timer = setInterval(updater, updateInterval);
        setIsOpen(() => true);
        break;
      case 'app.deactivated':
      case 'pane.deactivated':
        clearInterval(timer);
        setIsOpen(() => false);
        break;
      default:
        break;
    }
  };

  const events = async () => {
    await startEventListeners(client, handleZendeskEvents);
  };

  const update = async () => {
    getAppSettings(client).then((settings) => {
      console.log('GOT APP SETTINGS', settings);
      setAppSettings(() => settings);
    });
    getCurrentUser(client).then((user) => {
      console.log('GOT CURRENT USER', user);
      setCurrentUser(() => user);
    });
    getGroups(client).then((groups) => {
      console.log('GOT GROUPS', groups);
      setGroups(() => groups);
    });
    getUsers(client).then((users) => {
      console.log('GOT AGENTS', users);
      setAllUsers(() => users);
    });
    return true;
  };

  const updateUser = async (event: any) => {
    console.log('UPDATING USER:', currentUser.id, event);
    if (currentUser && currentUser?.id) {
      await updateUserStatus(client, currentUser.id, event);
      update();
    }
  };

  const obj = {
    groups: groups,
    allUsers: allUsers,
    currentUser: currentUser,
    appSettings: appSettings,
    update: updateUser,
  };

  return (
    <ZendeskContext.Provider value={obj}>{children}</ZendeskContext.Provider>
  );
};

export const useZendeskContext = () => useContext(ZendeskContext);
