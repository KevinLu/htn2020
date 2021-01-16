import React from 'react';
import {Flex, Avatar, Text, HStack} from '@chakra-ui/react';

function Comment() {
  const data = {
    username: "User Name",
    avatar: "",
    comment: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    timeSince: "2 days",
  };
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      width="100%"
      pt={2} pb={2} pl={4} pr={4}
      alignItems="center"
      justifyContent="space-between">
      <Flex flexDir="column">
        <HStack alignItems="center">
          <Avatar size="xs" name={data.username} src={data.avatar} />
          <Text>{data.username}</Text>
          <Text color="gray.500">{`commented ${data.timeSince} ago`}</Text>
        </HStack>
        <Text mt={2}>{data.comment}</Text>
      </Flex>
    </Flex>
  );
}

export default Comment;
