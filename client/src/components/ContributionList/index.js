import React, {useEffect, useState} from 'react';
import {
  Text,
  Button,
  Container,
  VStack,
  HStack,
  AvatarGroup,
  Avatar,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import Contribution from '../Contribution';
import ContributeModal from '../ContributeModal';
import Axios from "axios";
import moment from "moment";

function getRelativeTime(date) {
  const d = new Date(date);
  return moment(d).fromNow();
}

function ContributionList(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
      setIsUserLoading(false);
    } else if (window.localStorage.getItem("loggedIn") === "false") {
      setIsUserLoading(false);
    }
  }, [window.localStorage]);

  const threadId = props.threadId;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();

  const handleOpenModal = () => {
    if (loggedIn) {
      onOpen();
    } else {
      toast({
        position: 'bottom',
        title: 'Please login first.',
        description: 'You must be logged in to contribute.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const {mb} = props;

  const [contributions, setContributions] = useState([]);

  function updateContributions() {
    Axios.get("/api/thread/" + threadId + '/contributions')
      .then(response => {
        if (response.status === 200) {
          let newContributions = [];

          response.data.forEach((contribution, index) => {
            newContributions[index] = {
              avatar: contribution.avatar,
              username: contribution.username,
              timeSince: getRelativeTime(contribution.createdAt),
              description: contribution.description,
              fileUrl: contribution.fileUrl,
              fileSize: contribution.fileSize / 1000 + "kb"
            };
          });

          setContributions(newContributions.reverse());
        }
      })
      .catch(err => {
        if (err.response) {
          /*toast({
            title: 'Failed to retrieve contributions',
            description: 'Server error.',
            position: 'top',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });*/
        }
      })
  }

  useEffect(() => {
    updateContributions();
  }, []);

  return (
    <Container
      mb={mb}
      p={6}
      backgroundColor="white"
      maxWidth="130ch"
      borderWidth="1px"
      borderRadius="lg">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="600">
          Contributions
        </Text>
        <HStack spacing={4}>
          <AvatarGroup size="sm" max={5}>
            {contributions.map(contribution => {
              return <Avatar name={contribution.username} src={contribution.avatar} />
            })}
            {/*<Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />*/}
          </AvatarGroup>
          <Button disabled={isUserLoading} colorScheme="purple" variant="outline" onClick={handleOpenModal}>
            Contribute
          </Button>
        </HStack>
      </HStack>
      <VStack mt="3" spacing={4}>
        {contributions.map(contribution => {
          return <Contribution data={contribution} />
        })}
      </VStack>
      <ContributeModal updateContributions={updateContributions} isOpen={isOpen} onClose={onClose} threadId={threadId} />
    </Container>
  );
}

export default ContributionList;
