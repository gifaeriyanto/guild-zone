import { Box, Heading } from '@chakra-ui/react';
import { GuildListContainer } from 'containers/guildList';
import { HomeContainer } from 'containers/home';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <>
      <HomeContainer />
      <Box my="8rem">
        <GuildListContainer />
      </Box>
    </>
  );
};

export default Index;
