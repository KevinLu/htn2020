import React, {useEffect, useState} from 'react';
import {Text, Container, VStack, HStack, toast} from '@chakra-ui/react';
import Comment from '../Comment';
import CommentBox from '../CommentBox';
import Axios from "axios";
import moment from "moment";

function getRelativeTime(date) {
    const d = new Date(date);
    return moment(d).fromNow();
}

function CommentList(props) {
    const [comments, setComments] = useState([]);

    const threadId = props.threadId;

    function updateComments() {
        Axios.get("/api/thread/" + threadId + "/comments")
            .then(res => {
                let newComments = [];

                res.data.forEach((comment, index) => {
                    newComments[index] = {
                        username: comment.username,
                        avatar: comment.avatar,
                        comment: comment.comment,
                        timeSince: getRelativeTime(comment.createdAt)
                    };
                });

                setComments(newComments.reverse());
            })
            .catch(err => {
                if (err.response) {
                    toast({
                        title: 'Failed to retrieve comments',
                        description: 'Server error.',
                        position: 'top',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            })
    }

    useEffect(() => {
        updateComments()
    }, []);

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
      <CommentBox updateComments={updateComments} threadId={threadId} />
      <VStack mt="3" spacing={4}>
          { comments.map(comment => {
              return <Comment key={comment.uuid} data={comment} />
          })}
      </VStack>
    </Container>
  );
}

export default CommentList;
