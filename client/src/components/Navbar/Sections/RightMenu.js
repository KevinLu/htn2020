import React from 'react';
import {Flex, Button, ButtonGroup} from "@chakra-ui/react";
import {ArrowForwardIcon, AddIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

function RightMenu() {
  return (
    <Flex alignItems="center">
      {window.localStorage.getItem("loggedIn") !== "true" ?
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

export default RightMenu;
