import React from 'react';
import {Flex, Button, ButtonGroup} from "@chakra-ui/react";
import {ArrowForwardIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

function RightMenu(props) {

  return (
    <Flex alignItems="center">
      <ButtonGroup>
        <Button variant="ghost">Sign in</Button>
        <Button colorScheme="purple" bgColor="black" color="white" rightIcon={<ArrowForwardIcon />}>Sign up</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default RightMenu;
