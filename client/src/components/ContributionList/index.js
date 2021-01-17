import React from 'react';
import {Text, Button, Container, VStack, HStack, AvatarGroup, Avatar, useDisclosure} from '@chakra-ui/react';
import Contribution from '../Contribution';
import ContributeModal from '../ContributeModal';

function ContributionList(props) {
  const threadId = props.threadId;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {mb} = props;

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
        <Contribution />
        <Contribution />
        <Contribution />
      </VStack>
      <ContributeModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export default ContributionList;
