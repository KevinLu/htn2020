import React, {useEffect, useState} from 'react';
import {Flex, Textarea, Text, Button, Avatar, HStack} from '@chakra-ui/react';
import Axios from "axios";

function CommentBox(props) {
    //const threadId = props.threadId;
    let [value, setValue] = React.useState("")
    let [isLoading, setIsLoading] = React.useState(false)

    const threadId = "27d9837a-d583-4ed6-8f39-7c1ee32f115a";
    const defaultData = {
        username: "Anonymous",
        avatar: "",
    };

    function postMessage(threadId, comment) {
        setIsLoading(true);

        // todo use threadid
        Axios.post("/api/thread/" + threadId + "/comments",
            {
                comment: comment
            })
            .then(res => {
                window.location.reload();
            });
    }

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    const [data, setData] = useState(defaultData);

    useEffect(() => {
        setData({
            username: window.localStorage.getItem("username"),
            avatar: window.localStorage.getItem("avatar"),
        });
    }, [window.localStorage]);

    return (
        <Flex mt={4} mb={4} flexDir="column">
            <HStack>
                <Avatar size="xs" name={data.username} src={data.avatar}/>
                <Text color="gray.600" fontSize="sm">{data.username} says:</Text>
            </HStack>
            <Textarea mt={2} focusBorderColor="purple.500"
                      placeholder="Write your thoughts about this data request..."
                      value={value}
                      onChange={handleInputChange}/>
            <Button isLoading={isLoading} onClick={() => {
                postMessage(threadId, value);
            }} colorScheme="purple"
                    mt={2}>Post</Button>
        </Flex>
    );
}

export default CommentBox;
