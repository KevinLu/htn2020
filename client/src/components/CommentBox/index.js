import React, {useEffect, useState} from 'react';
import {Flex, Textarea, Text, Button, Avatar, HStack} from '@chakra-ui/react';
import Axios from "axios";

function postMessage(threadId, comment) {

    console.log(comment);

    // todo use threadid
    Axios.post("/api/thread/8402b2b4-8dea-4c59-84e8-787af17ee33d/comments",
        {
            comment: comment
        })
        .then(res => {
            console.log("posted");
        });
}

function CommentBox(props) {
    //const threadId = props.threadId;
    let [value, setValue] = React.useState("")
    const threadId = "8402b2b4-8dea-4c59-84e8-787af17ee33d";
    const defaultData = {
        username: "Anonymous",
        avatar: "",
    };

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
            <Button onClick={() => postMessage(threadId, value)} colorScheme="purple"
                    mt={2}>Post</Button>
        </Flex>
    );
}

export default CommentBox;
