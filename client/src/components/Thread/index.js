import React from 'react';
import {Link} from 'react-router-dom';
import {Box, HStack, Badge, Flex} from '@chakra-ui/react';
import styled from '@emotion/styled';
import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import RatingBox from '../RatingBox';

const HoverEffect = styled.div`
&:hover {
  background-color: #EDF2F7;
  transition: 0.2s ease-out;
}
`;

function Thread(props) {
  // const {data} = props;
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
    <HoverEffect>
      <HStack w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" spacing="0">
        <Box pl="4">
          <RatingBox rating={data.rating} vote={data.vote} />
        </Box>
        <Link to={`/thread/${data.threadUrl}`}>
          <Box p="4">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="blue">
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
                {data.timeSince} ago
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
          </Box>
        </Link>
      </HStack>
    </HoverEffect>
  );
}

export default Thread;
