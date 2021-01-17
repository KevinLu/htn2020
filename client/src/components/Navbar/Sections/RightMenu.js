import React, {useState, useEffect} from 'react';
import {Flex, Button, ButtonGroup} from "@chakra-ui/react";
import {ArrowForwardIcon, AddIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

function RightMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (window.localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
      setIsLoading(false);
    }
  }, [window.localStorage]);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <Flex alignItems="center">
        {!loggedIn ?
          <ButtonGroup>
            <Link to="/login"><Button variant="ghost">Sign in</Button></Link>
            <Link to="/register">
              <Button
                colorScheme="purple"
                bgColor="black"
                color="white"
                rightIcon={<ArrowForwardIcon />}>
                Sign up
          </Button>
            </Link>
          </ButtonGroup> :
          <ButtonGroup>
            <Link to="/create/thread">
              <Button
                colorScheme="purple"
                bgColor="black"
                color="white"
                rightIcon={<AddIcon />}>
                New Thread
            </Button>
            </Link>
          </ButtonGroup>}
      </Flex>
    );
  }
}

export default RightMenu;
