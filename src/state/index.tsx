import React, { createContext, useState } from "react";
import { useZendesk } from "../hooks";


const currentUserContext = createContext({});

const currentUserProvider = ({ children }: any) => {
  return (
    <currentUserContext.Provider value={{}}>

    </currentUserContext.Provider>

  )
}



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

