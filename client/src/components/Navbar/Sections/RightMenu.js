import React, {useContext} from 'react';
import {Flex, Button, ButtonGroup} from "@chakra-ui/react";
import {ArrowForwardIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

function RightMenu(props) {
    return (
        <Flex alignItems="center">
            <ButtonGroup>
                <Link to="/login"><Button variant="ghost">Sign in</Button></Link>
                <Link to="/register">
                    <Button
                        colorScheme="purple"
                        bgColor="black"
                        color="white"
                        rightIcon={<ArrowForwardIcon/>}>
                        Sign up
                    </Button>
                </Link>
            </ButtonGroup>
        </Flex>
    );
}

export default RightMenu;
