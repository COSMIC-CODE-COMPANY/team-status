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

const updateUserStatus = async (
  client: ZendeskClient,
  userID: number,
  status: string
) => {
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
    const response = await client.request(settings);
    return response;
  } catch (err) {}
};

const getAppSettings = async (client: ZendeskClient) => {
  try {
    const data = await client.metadata();
    return data;
  } catch (err) {}
};

const getCurrentUser = async (client: ZendeskClient) => {
  try {
    const path = '/api/v2/users/me.json';
    const settings = {
      url: path,
      type: 'GET',
      dataType: 'json',
      cache: false,
    };
    const response = await client.request(settings);
    return response.user;
  } catch (err) {}
};

const getGroups = async (client: ZendeskClient) => {
  try {
    const path = '/api/v2/groups.json?include=users';
    const settings = {
      url: path,
      type: 'GET',
      dataType: 'json',
      cache: false,
    };
    const response = await client.request(settings);
    return response.groups;
  } catch (err) {}
};

const getUsers = async (client: ZendeskClient, group?: number) => {
  try {
    const selectedGroup = group;
    let path = '';
    if (selectedGroup) {
      path = `/api/v2/groups/${selectedGroup}/users.json`;
    } else {
      path = '/api/v2/users.json?role[]=admin&role[]=agent';
    }
    const settings = {
      url: path,
      type: 'GET',
      dataType: 'json',
      cache: false,
    };
    const response = await client.request(settings);
    return response.users;
  } catch (err) {}
};

const startEventListeners = async (client: ZendeskClient, callback: any) => {
  zendeskEvents.forEach((zdEvent) => {
    const event = new Event(zdEvent);
    client.on(zdEvent, () => {
      callback(event);
    });
  });
  return true;
};

export {
  updateUserStatus,
  getAppSettings,
  getCurrentUser,
  getGroups,
  getUsers,
  startEventListeners,
};
