import React from 'react';
import {Flex, Textarea, Text, Button, Avatar, HStack} from '@chakra-ui/react';

function CommentBox() {
  const data = {
    username: "Kevin Lu",
    avatar: "",
  };
  return (
    <Flex mt={4} mb={4} flexDir="column">
      <HStack>
        <Avatar size="xs" name={data.username} src={data.avatar} />
        <Text color="gray.600" fontSize="sm">{data.username} says:</Text>
      </HStack>
      <Textarea mt={2} focusBorderColor="purple.500" placeholder="Write your thoughts about this data request..." />
      <Button colorScheme="purple" mt={2}>Post</Button>
    </Flex>
  );
}

export default CommentBox;
