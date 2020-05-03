import { useState, useEffect } from 'react';
import * as Types from '../Types';
import { useSelectedGroupContext } from '../context';

type ZendeskClient = any;
declare let ZAFClient: ZendeskClient;

const zendeskEvents = [
  'app.registered',
  'app.activated',
  'app.deactivated',
  'app.expanded',
  'app.collapsed',
  'app.willDestroy',
  'pane.activated',
  'pane.deactivated',
];

const useZendesk = (callback: any) => {
  let client: ZendeskClient = null;
  let timer = 0;
  const timerInterval = 30000;
  const [currentUser, setCurrentUser] = useState<Types.User | null>(null);
  const [groups, setGroups] = useState<Types.Group[] | null>(null);
  const [users, setUsers] = useState<Types.User[] | null>(null);
  const [appSettings, setAppSettings] = useState();
  const [appContext, setAppContext] = useState();
  const selectedGroup = useSelectedGroupContext();

  useEffect(() => {
    if (!client) {
      client = ZAFClient.init();
    }
    getCurrentUser();
    startListening(callback);
    getGroups();
    getUsers();
    getAppContext();
    getAppSettings();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getCurrentUser = async () => {
    const getAllAgentsPath = '/api/v2/users/me.json';
    const settings = {
      url: getAllAgentsPath,
      type: 'GET',
      dataType: 'json',
    };
    const response = await client.request(settings);
    setCurrentUser(() => response.user);
  };

  const startTimer = () => {
    getUsers();
    timer = setInterval(() => {
      console.log('Tick');
      getUsers();
    }, timerInterval);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const startListening = (callback: (event: Event) => void) => {
    zendeskEvents.forEach((zdEvent) => {
      const event = new Event(zdEvent);
      client.on(zdEvent, () => {
        callback(event);
      });
    });
  };

  const getGroups = async () => {
    try {
      const getAllAgentsPath = '/api/v2/groups.json?include=users';
      const settings = {
        url: getAllAgentsPath,
        type: 'GET',
        dataType: 'json',
      };
      const response = await client.request(settings);
      setGroups(() => response.groups);
    } catch (err) {}
  };

  const getUsers = async (): Promise<any> => {
    try {
      let getAgents = '';
      if (!selectedGroup.selectedGroup) {
        getAgents = '/api/v2/users.json?role[]=admin&role[]=agent';
      } else {
        getAgents = `/api/v2/groups/${selectedGroup}/users.json`;
      }
      const settings = {
        url: getAgents,
        type: 'GET',
        dataType: 'json',
      };
      const response = await client.request(settings);
      setUsers(() => response.users);
    } catch (err) {}
  };

  // `${status} | ${new Date().toISOString()}`
  const updateUserStatus = async function (
    userID: number,
    status: string
  ): Promise<number> {
    try {
      const userPath = `/api/v2/users/${userID}.json`;
      const userUpdateObject = {
        user: {
          user_fields: {
            ccc_agent_status: `${status} | ${new Date().toISOString()}`,
          },
        },
      };
      const settings = {
        url: userPath,
        type: 'PUT',
        data: userUpdateObject,
        dataType: 'json',
      };
      if (!client) {
        client = ZAFClient.init();
      }
      const response = await client.request(settings);
      getUsers();
      return 0;
    } catch (err) {
      return 1;
    }
  };

  const openURL = (type: string, id: number): void => {
    if (!client) {
      client = ZAFClient.init();
    }
    client.invoke('routeTo', type, id);
  };

  const getAppSettings = async () => {
    const data = await client.metadata();
    setAppSettings(() => data);
  };

  const getAppContext = async () => {
    const data = await client.context();
    setAppContext(() => data);
  };

  return {
    currentUser,
    groups,
    users,
    appSettings,
    appContext,
    updateUserStatus,
    openURL,
    startTimer,
    stopTimer,
  };
};

export { useZendesk };
