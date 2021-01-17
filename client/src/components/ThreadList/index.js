import React, {useEffect, useState} from 'react';
import Thread from '../Thread';
import {toast, VStack} from '@chakra-ui/react';
import Axios from 'axios';

function ThreadList() {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        Axios.get('/api/thread/threads?offset=0&limit=100', {})
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    let threads = [];

                    response.data.forEach(thread => {
                        threads.push({
                            threadUrl: thread.threadUrl,
                            title: thread.title,
                            timeSince: "5 hours",
                            description: thread.description,
                            commentCount: thread.comments.length,
                            contributionCount: thread.contributions.length,
                            rating: thread.rating,
                            vote: "up"
                        });
                    })

                    setThreads(threads);
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

    console.log(threads);
    return (
        <VStack spacing={4}>
            { threads.map(thread => {
                console.log("something");
                return <Thread props={thread}/>
            }) }
        </VStack>
    );
}

export default ThreadList;
