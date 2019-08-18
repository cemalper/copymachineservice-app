import React, { useState } from 'react';

const AuthentationContext = React.createContext({ user: undefined, login: () => {}, logout: () => {} });

const loginKey = 'CMS.loggedUser';

const loginHelper = loginfunc => value => {
  localStorage.setItem(loginKey, JSON.stringify(value));
  loginfunc(value);
};

const AuthentationProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(loginKey)));
  const logout = () => {
    setUser(null);
    localStorage.removeItem(loginKey);
    console.log('logout');
    //client.resetStore();
  };

  return <AuthentationContext.Provider value={{ user, login: loginHelper(setUser), logout }}>{children}</AuthentationContext.Provider>;
};

export { AuthentationContext, AuthentationProvider };
