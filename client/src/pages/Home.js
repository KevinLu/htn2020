import React from 'react';
import {Container} from "@chakra-ui/react"
import ThreadList from '../components/ThreadList';
import Hero from '../components/Hero';

function Home() {
  return (
    <div>
      <Hero />
      <Container maxWidth="130ch">
        <ThreadList />
      </Container>
    </div>
  );
}

export default Home;
