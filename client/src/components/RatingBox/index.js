import React from 'react';
import {VStack, IconButton, Text} from "@chakra-ui/react"
import {TriangleUpIcon, TriangleDownIcon} from '@chakra-ui/icons';

function RatingBox(props) {
  const {rating, vote} = props;
  return (
    <VStack spacing="2px">
      <IconButton
        h="24px"
        color={vote === "up" ? "red.500" : "gray.400"}
        variant="unstyled"
        aria-label="Upvote thread"
        icon={<TriangleUpIcon />} />
      <Text fontWeight="bold">
        {rating}
      </Text>
      <IconButton
        h="24px"
        color={vote === "down" ? "blue.500" : "gray.400"}
        variant="unstyled"
        aria-label="Downvote thread"
        icon={<TriangleDownIcon />} />
    </VStack>
  );
}

export default RatingBox;
