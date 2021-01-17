import React from 'react';
import {Text, Flex, HStack} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

function MiddleMenu() {
  return (
    <Flex align="center" d={{base: 'none', lg: 'flex'}}>
      <HStack spacing={16}>
        <Text color="gray.600" fontSize="lg">
          <Link to="/">Threads</Link>
        </Text>
        <Text color="gray.600" fontSize="lg">
          <a href="https://devpost.com/software/crowd-space">About us</a>
        </Text>
        <Text color="gray.600" fontSize="lg">
          <a href="https://github.com/KevinLu/htn2020">Source code</a>
        </Text>
      </HStack>
    </Flex>
  );
}

export default MiddleMenu;
