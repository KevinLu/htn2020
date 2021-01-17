import React, {useEffect, useState} from 'react';
import Thread from '../Thread';
import {toast, VStack} from '@chakra-ui/react';
import Axios from 'axios';
import moment from 'moment';

function getRelativeTime(date) {
  const d = new Date(date);
  return moment(d).fromNow();
}

function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    Axios.get('/api/thread/threads?offset=0&limit=100')
      .then(response => {
        if (response.status === 200) {
          console.log("response.data", response.data);
          let newthreads = [];
          response.data.forEach((thread, index) => {
            newthreads[index] = {
              threadUrl: thread.uuid,
              title: thread.title,
              timeSince: getRelativeTime(thread.createdAt),
              description: thread.description,
              commentCount: thread.comments ? thread.comments : 0,
              contributionCount: thread.contributions ? thread.contributions : 0,
              rating: thread.rating ? thread.rating : 0,
              vote: "up",
              user: thread.user
            };
          });
          setThreads(newthreads);
        }
      })
      .catch(err => {
        if (err.response) {
          toast({
            title: 'Failed to retrieve threads',
            description: 'Server error.',
            position: 'top',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
  }, []);

  console.log("threads state", threads);
  return (
    <VStack spacing={4}>
      { threads.map(thread => {
        console.log("something");
        return <Thread data={thread} />
      })}
    </VStack>
  );
}

export default ThreadList;
