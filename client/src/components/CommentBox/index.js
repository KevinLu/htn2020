import React, {useEffect, useState} from 'react';
import {Flex, Textarea, Text, Button, Avatar, HStack} from '@chakra-ui/react';

function CommentBox() {
  const defaultData = {
    username: "Anonymous",
    avatar: "",
  };
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    setData({
      username: window.localStorage.getItem("username"),
      avatar: window.localStorage.getItem("avatar"),
    });
  }, [window.localStorage]);
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
