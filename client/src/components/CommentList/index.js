import React from 'react';
import {Text, Container, VStack, HStack} from '@chakra-ui/react';
import Comment from '../Comment';
import CommentBox from '../CommentBox';

function CommentList(props) {
    const threadId = props.threadId
  return (
    <Container
      p={6}
      backgroundColor="white"
      maxWidth="130ch"
      borderWidth="1px"
      borderRadius="lg">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="600">
          Discussion
        </Text>
      </HStack>
      <CommentBox threadId={threadId} />
      <VStack mt="3" spacing={4}>
        <Comment />
        <Comment />
        <Comment />
      </VStack>
    </Container>
  );
}

export default CommentList;
