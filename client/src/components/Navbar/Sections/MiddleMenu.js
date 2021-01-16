import React from 'react';
import {Text, Flex, HStack} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

function MiddleMenu() {
  return (
    <Flex align="center">
      <HStack spacing={16}>
        <Text color="gray.600" fontSize="lg">
          <Link to="/">Threads</Link>
        </Text>
        <Text color="gray.600" fontSize="lg">
          <Link to="/">About us</Link>
        </Text>
        <Text color="gray.600" fontSize="lg">
          <Link to="/">Source code</Link>
        </Text>
      </HStack>
    </Flex>
  );
}

export default MiddleMenu;
