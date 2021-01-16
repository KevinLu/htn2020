import React from 'react';
import {Container} from "@chakra-ui/react"
import ThreadList from '../components/ThreadList';

function Home() {
  return (
    <div>
      <Container maxWidth="100ch">
        <ThreadList />
      </Container>
    </div>
  );
}

export default Home;
