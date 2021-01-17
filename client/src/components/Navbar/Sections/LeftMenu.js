import React from 'react';
import {Heading, Flex} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

function LeftMenu() {
  return (
    <Flex align="center">
      <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
        <Link to="/">crowd.source</Link>
      </Heading>
    </Flex>
  );
}

export default LeftMenu;
