import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Container,
  HStack,
} from '@chakra-ui/react';
import { ChatIcon, StarIcon } from '@chakra-ui/icons';
import ContributionList from '../components/ContributionList';
import CommentList from '../components/CommentList';
import axios from "axios";
import {toast} from '@chakra-ui/react';

function ThreadPage(props) {
  const threadId = props.threadId;

  useEffect(() => {
    document.body.style.backgroundColor = '#EDF2F7';
    return () => {
      document.body.style.backgroundColor = '#fff';
    };
  }, []);

  useEffect(() => {
    axios.get(`/api/users/${props.location.state.user}`)
      .then(response => {
        if (response.status === 200) {
          console.log('response.data', response.data);
          setUser(response.data);
        }
      })
      .catch(err => {
        if (err.response) {
          toast({
            title: 'Failed to retrieve user',
            description: 'Server error.',
            position: 'top',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          console.log(err.response)
        }
      });
  }, [props.location.state]);

  const [currUser, setUser] = useState({});
  // const data = {
  //   username: "Some Scientist",
  //   avatar: "https://bit.ly/dan-abramov",
  //   threadUrl: "the-thread-url",
  //   title: "Need custom datasets for research purposes",
  //   timeSince: "5 hours",
  //   description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  //   commentCount: 34,
  //   contributionCount: 16,
  //   rating: 20,
  //   vote: "up",
  // }
  const data = props.location.state;
  console.log(data);
  console.log(props);
  return (
    <Box mt={2}>
      <Container
        p={6}
        mb={2}
        backgroundColor="white"
        maxWidth="130ch"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Heading as="h4" size="lg" mb={2}>
          {data.title}
        </Heading>
        <Flex alignItems="center" mb={2}>
          <Avatar size="sm" name={currUser.username} src={currUser.avatar} />
          <Text fontWeight="semibold" ml="2">
            {currUser.username}
          </Text>
          <Text color="gray.500" ml="2">
            posted {data.timeSince}
          </Text>
        </Flex>
        <Text>{data.description}</Text>
        <HStack mt="3" spacing={4}>
          <Flex alignItems="center">
            <StarIcon color={'purple.500'} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.contributionCount} contributions
            </Box>
          </Flex>
          <Flex alignItems="center">
            <ChatIcon color={'purple.500'} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.commentCount} comments
            </Box>
          </Flex>
        </HStack>
      </Container>
      <ContributionList mb={2} />
      <CommentList threadId={threadId} />
    </Box>
  );
}

export default ThreadPage;
