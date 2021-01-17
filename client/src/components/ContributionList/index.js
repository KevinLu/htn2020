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
  toast
} from '@chakra-ui/react';
import Contribution from '../Contribution';
import ContributeModal from '../ContributeModal';
import Axios from "axios";
import moment from "moment";
import Thread from "../Thread";

function getRelativeTime(date) {
  const d = new Date(date);
  return moment(d).fromNow();
}

function ContributionList(props) {
  const threadId = props.threadId;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {mb} = props;

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    Axios.get("api/thread/ " + threadId + '/contributions')
        .then(response => {
          if (response.status === 200) {
            let newContributions = [];

            response.data.forEach((contribution, index) => {
              newContributions[index] = {
                avatar: contribution.avatar,
                username: contribution.username,
                timeSince: getRelativeTime(contribution.createdAt),
                description: contribution.description,
                fileSize: contribution.fileSize
              };
            });

            setContributions(newContributions);
          }
        })
        .catch(err => {
          if (err.response) {
            toast({
              title: 'Failed to retrieve threads',
              description: 'Server error.',
              position: 'top',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        })
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
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <Button colorScheme="purple" variant="outline" onClick={onOpen}>
            Contribute
          </Button>
        </HStack>
      </HStack>
      <VStack mt="3" spacing={4}>
        { contributions.map(contribution => {
          return <Contribution data={contribution} />
        })}
      </VStack>

      <ContributeModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export default ContributionList;
