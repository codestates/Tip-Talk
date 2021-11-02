import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/me`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        // ! 에러 처리
      });
  }, [user]);

  return { user };
};

export default useUser;
