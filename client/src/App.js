import React from 'react';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {Fonts} from './Fonts'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import AuthHOC from './hoc/AuthHOC';
import NavBar from "./components/Navbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreadPage from './pages/ThreadPage';
import CreateThread from './pages/CreateThread';

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
});

const queryClient = new QueryClient();

// Auth(SpecificComponent, option)
// option:
const PUBLIC_PAGE = 0; // includes anonymous users
const LOGGED_IN_ONLY = 1;
const PUBLIC_ONLY = 2; // includes anonymous users

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Fonts />
        <Router>
          <NavBar>
            <Switch>
              <Route exact path="/" component={AuthHOC(Home, PUBLIC_PAGE)} />
              <Route exact path="/login" component={AuthHOC(Login, PUBLIC_ONLY)} />
              <Route exact path="/register" component={AuthHOC(Register, PUBLIC_ONLY)} />
              <Route exact path="/thread/:threadUrl" component={AuthHOC(ThreadPage, PUBLIC_PAGE)} />
              <Route exact path="/create/thread" component={AuthHOC(CreateThread, LOGGED_IN_ONLY)} />
            </Switch>
          </NavBar>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
