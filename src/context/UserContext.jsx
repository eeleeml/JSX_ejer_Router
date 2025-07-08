import { createContext, useState } from "react";

import usuarios from '../data/usuarios';


export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({});

  const initialValue = {
    getUserById: (id) => usuarios.filter((valUser) => valUser.id == id)[0],
    getUserByUser: (userName) => usuarios.filter((valUser) => valUser.user == userName)[0],

    getUserName: (user) => user.user,
    getUserMode: (user) => user.mode,
    getUserLang: (user) => user.lang,
    getUserPass: (user) => user.password,

    setUser: (user) => setUser(user),
    getUser: () => user
  }

  return (
    <UserContext.Provider value={initialValue}>
      {children}
    </UserContext.Provider>
  );
};
