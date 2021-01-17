import React from 'react';
import {Box, Heading, Text, Button, Container, HStack} from '@chakra-ui/react';

function Hero() {
  return (
    <Container
      d="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      maxW="130ch"
      mt={16}
      mb={16}>
      <Heading
        as="h1"
        size="4xl">
        Crowdsourced data for</Heading>
      <Heading
        mt="-.25em"
        bgGradient="linear(to-l, #667eea,#764ba2)"
        bgClip="text"
        as="h1"
        size="4xl"
        lineHeight="1.5em">
        everyone</Heading>
      <Text maxW="60ch" mt={4} mb={8} fontSize="xl" color="gray.600">
        Request data from the community and contribute to open-source data!
      </Text>
      <HStack spacing={4}>
        <Button colorScheme="purple" variant="solid" size="lg">
          Get started
        </Button>
        <Button colorScheme="purple" variant="outline" size="lg">
          Sign in
        </Button>
      </HStack>
    </Container>
  );
}

export default Hero;
