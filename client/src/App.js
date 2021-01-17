import React from 'react';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {Fonts} from './Fonts'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Router>
        <NavBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/thread/:threadUrl" component={ThreadPage} />
            <Route exact path="/create/thread" component={CreateThread} />
          </Switch>
        </NavBar>
      </Router>
    </ChakraProvider>
  );
}

export default App;
