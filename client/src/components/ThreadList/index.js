import React from 'react';
import Thread from '../Thread';
import {VStack} from '@chakra-ui/react';

function ThreadList() {
  return (
    <VStack spacing={4}>
      <Thread />
      <Thread />
      <Thread />
      <Thread />
      <Thread />
    </VStack>
  );
}

export default ThreadList;
