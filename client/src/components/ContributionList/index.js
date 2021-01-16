import React from 'react';
import {Box, Flex, Heading, Text, Button, Container, VStack, HStack, AvatarGroup, Avatar} from '@chakra-ui/react';
import Contribution from '../Contribution';

function ContributionList() {
  return (
    <Container
      p={6}
      backgroundColor="white"
      maxWidth="120ch"
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
          <Button colorScheme="purple" variant="outline">
            Contribute
          </Button>
        </HStack>
      </HStack>
      <VStack mt="3" spacing={4}>
        <Contribution />
        <Contribution />
        <Contribution />
      </VStack>
    </Container>
  );
}

export default ContributionList;
