import React from 'react';
import {Box, Flex, Heading, Text, Button, Container, HStack} from '@chakra-ui/react';
import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import ContributionList from '../components/ContributionList';

function ThreadPage(props) {
  const data = {
    threadUrl: "the-thread-url",
    title: "Need custom datasets for research purposes",
    timeSince: "5 hours",
    description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    commentCount: 34,
    contributionCount: 16,
    rating: 20,
    vote: "up",
  }
  return (
    <Box backgroundColor="gray.100" h="100vh" p={2}>
      <Container
        p={6}
        mb={2}
        backgroundColor="white"
        maxWidth="120ch"
        borderWidth="1px"
        borderRadius="lg">
        <Heading as="h4" size="lg" mt={2} mb={4}>
          {data.title}
        </Heading>
        <Text>
          {data.description}
        </Text>
        <HStack mt="3" spacing={4}>
          <Flex alignItems="center">
            <StarIcon color={"purple.500"} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.contributionCount} contributions
          </Box>
          </Flex>
          <Flex alignItems="center">
            <ChatIcon color={"purple.500"} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.commentCount} comments
          </Box>
          </Flex>
        </HStack>
      </Container>
      <ContributionList />
    </Box>
  );
}

export default ThreadPage;
