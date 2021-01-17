import React from 'react';

const UserContext = React.createContext({
  isLoading: true,
  user: null,
});

export default UserContext;
