import React from 'react';
import {Box, HStack, Badge, Flex} from '@chakra-ui/react';
import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import RatingBox from '../RatingBox';

function Thread(props) {
  // const {data} = props;
  const data = {
    title: "Need custom datasets for research purposes",
    timeSincePosted: "5 hours",
    description: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    commentCount: 34,
    contributionCount: 16,
    rating: 20,
    vote: "up",
  }

  return (
    <HStack w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" spacing="0">
      <Box pl="4">
        <RatingBox rating={data.rating} vote={data.vote} />
      </Box>
      <Box p="4">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {data.timeSincePosted} ago
        </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.title}
        </Box>

        <Box color="gray.600" fontSize="sm">
          {data.description}
        </Box>

        <HStack mt="3" spacing={4}>
          <Flex alignItems="center">
            <StarIcon color={"teal.500"} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.contributionCount} contributions
          </Box>
          </Flex>
          <Flex alignItems="center">
            <ChatIcon color={"teal.500"} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {data.commentCount} comments
          </Box>
          </Flex>
        </HStack>
      </Box>
    </HStack>
  );
}

export default Thread;
