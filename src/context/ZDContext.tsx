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

export const ZendeskContextProvider = ({ children }: Props) => {
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

  useEffect(() => {}, [isOpen]);

  const updater = () => {
    update();
  };

  const handleZendeskEvents = (event: Event) => {
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
    const settings = await getAppSettings(client);
    setAppSettings(() => settings);

    const user = await getCurrentUser(client);
    setCurrentUser(() => user);

    const groups = await getGroups(client);
    setGroups(() => groups);

    const users = await getUsers(client);
    setAllUsers(() => users);

    return true;
  };

  const updateUser = async (event: any) => {
    if (currentUser?.id) {
      await updateUserStatus(client, currentUser.id, event);
      // update();
      const users = await getUsers(client);
      setAllUsers(() => users);
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
