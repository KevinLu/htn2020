import React, {useEffect, useState} from 'react';
import {Text, Container, VStack, HStack, toast} from '@chakra-ui/react';
import Comment from '../Comment';
import CommentBox from '../CommentBox';
import Axios from "axios";
import moment from "moment";
import Thread from "../Thread";

function getRelativeTime(date) {
    const d = new Date(date);
    return moment(d).fromNow();
}

function CommentList(props) {
    const [comments, setComments] = useState([]);

    const threadId = props.threadId

    useEffect(() => {
        Axios.get("/api/thread/" + threadId + "/comments")
            .then(res => {
                let newComments = [];
                console.log(res.data);

                res.data.forEach((comment, index) => {
                    newComments[index] = {
                        username: comment.user.username,
                        avatar: comment.user.avatar,
                        comment: comment.comment,
                        timeSince: getRelativeTime(comment.createdAt)
                    };

                    Axios.get("/api/user/")
                });

                setComments(newComments);
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
      <CommentBox threadId={threadId} />
      <VStack mt="3" spacing={4}>
          { comments.map(comment => {
              console.log(comment);
              return <Comment key={comment.uuid} data={comment} />
          })}
      </VStack>
    </Container>
  );
}

export default CommentList;
