import React from 'react';
import {useQuery} from 'react-query';
import Axios from 'axios';
import Loading from '../components/Loading';

// Auth(SpecificComponent, option)
// option:
const PUBLIC_PAGE = 0; // includes anonymous users
const LOGGED_IN_ONLY = 1;
const PUBLIC_ONLY = 2; // includes anonymous users

export default function (SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const authQuery = useQuery('auth', async () => Axios.get('/api/auth/'), {retry: false});
    console.log(authQuery);

    if (option === PUBLIC_PAGE) {
      return (
        <SpecificComponent {...props} />
      );
    } else if (option === LOGGED_IN_ONLY) {
      if (authQuery.isLoading) {
        return (<Loading />);
      } else if (!authQuery.isLoading && authQuery.isSuccess && authQuery.data) {
        return (
          <SpecificComponent {...props} user={authQuery.data.user} />
        );
      } else if (!authQuery.isLoading && authQuery.isError) {
        window.location.href = '/';
        console.log("LOGGED_IN_ONLY")
        return (
          <div></div>
        );
      }
    } else if (option === PUBLIC_ONLY) {
      if (authQuery.isLoading) {
        return (<Loading />);
      } else if (!authQuery.isLoading && authQuery.isSuccess && authQuery.data) {
        window.location.href = '/';
        console.log("PUBLIC_ONLY")
        return (
          <div></div>
        );
      } else if (!authQuery.isLoading && authQuery.isError) {
        return (
          <SpecificComponent {...props} />
        );
      }
    } else {
      return (
        <SpecificComponent {...props} />
      );
    }
  }
  return AuthenticationCheck
}
