import React, { createContext, useState, ReactElement } from 'react';
import { useZendesk } from '../hooks';

const currentUserContext = createContext({});

const currentUserProvider = ({ children }: any) => {
  return <currentUserContext.Provider value={{}}></currentUserContext.Provider>;
};

const selectedGroupContext = createContext({});

const selectedGroupProvider = ({ children }: any) => {
  return (
    <selectedGroupContext.Provider value={{}}>
      {children}
    </selectedGroupContext.Provider>
  );
};
