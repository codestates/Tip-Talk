import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const value = [user, setUser];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/me`, {
        headers: { withCredentials: true },
      })
      .then(({ data }) => {
        if (data.status) {
          const { user } = data.data;
          setUser(user);
        }
      })
      .catch(() => {
        // * 에러 처리
      });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
