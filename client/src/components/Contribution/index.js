import React from 'react';
import {Button, Flex, Avatar, Text, HStack} from '@chakra-ui/react';

function Contribution(props) {
  /*const data = {
    username: "User Name",
    avatar: "",
    fileSize: "325kb",
    description: "I added some epic data to this thread, please check it.",
    timeSince: "2 days",
  };*/

  const data = props.data;
  console.log(data.threadUrl)
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      width="100%"
      pt={2} pb={2} pl={4} pr={4}
      alignItems="center"
      justifyContent="space-between">
      <Flex flexDir="column">
        <Text fontSize="lg" fontWeight="600">{data.description}</Text>
        <HStack mt={2} alignItems="center">
          <Avatar size="xs" name={data.username} src={data.avatar} />
          <Text>{data.username}</Text>
          <Text color="gray.500">{`contributed ${data.timeSince}`}</Text>
          <Text color="gray.500">{`(${data.fileSize})`}</Text>
        </HStack>
      </Flex>
      <Button>View</Button>
    </Flex>
  );
}

export default Contribution;
