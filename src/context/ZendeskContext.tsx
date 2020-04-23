import React, { useState, createContext, useEffect, useContext } from 'react'

import * as Types from "../Types";
import * as Data from '../mock/data';
// import { ZendeskClient } from "../zendeskFun";

// const zd = useZendesk((event: Event) => console.log(event));
// // zd.init()
// // zd.startListening((event) => console.log(event))
// // zd.getCurrentUser().then(user => console.log(user))
// // zd.getGroups().then(groups => console.log(groups))
// // zd.getUsers().then(users => console.log(users))
// // zd.updateUserStatus(407074284553, status).then(response => console.log(response))
// console.log(zd)
// const status = `this is new | ${new Date().toISOString()}`
// zd.updateUserStatus(407074284553, status).then(response => console.log(response))



interface Props {
  children: any
}

export const CurrentUserContext = createContext<Types.User | null>(null);
export const CurrentUserProvider = (props: Props) => {
  const [user, setUser] = useState<Types.User | null>(null);
  const currentUser: Types.User = {
    id: Data.currentUserMock.id,
    name: Data.currentUserMock.name,
    status: Data.currentUserMock.user_fields.ccc_agent_status.split('|').shift()?.trim(),
  };

  useEffect(() => {
    setUser(currentUser)
  }, [])

  return (
    <CurrentUserContext.Provider value={user}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export const AllUsersContext = createContext<any[] | null>(null);
export const AllUsersProvider = (props: Props) => {
  const [users, setUsers] = useState<any[] | null>(null);
  useEffect(() => {
    setUsers(Data.allUsers.users)
  }, [])

  return (
    <AllUsersContext.Provider value={users}>
      {props.children}
    </AllUsersContext.Provider>
  )
}

export const GroupsContext = createContext<Types.Group[] | null>(null);
export const GroupsProvider = (props: Props) => {
  const [groups, setGroups] = useState<Types.Group[]>([]);
  const gList = Data.groups.groups;
  useEffect(() => {
    setGroups(state => [...gList])
  }, [])
  return (
    <GroupsContext.Provider value={groups}>
      {props.children}
    </GroupsContext.Provider>
  )
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);
export const useAllUsersContext = () => useContext(AllUsersContext);
export const useGroupsContext = () => useContext(GroupsContext);