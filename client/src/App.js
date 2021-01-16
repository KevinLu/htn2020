import React from 'react';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreadPage from './pages/ThreadPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/thread/:threadUrl" component={ThreadPage} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
