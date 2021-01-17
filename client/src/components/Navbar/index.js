import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import MiddleMenu from './Sections/MiddleMenu';
import RightMenu from './Sections/RightMenu';
import {Flex, Container} from "@chakra-ui/react";

function NavBar({children}) {
  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p={4}
        backgroundColor="white"
      >
        <Container maxW="130ch" d="flex" justifyContent="space-between">
          <LeftMenu />
          <MiddleMenu />
          <RightMenu />
        </Container>
      </Flex>
      {children}
    </div>
  );
}

export default NavBar;
