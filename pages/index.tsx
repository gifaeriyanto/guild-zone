import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { GuildListContainer } from 'containers/guildList';
import { HomeContainer } from 'containers/home';
import { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <>
      <HomeContainer />
      <Box my="8rem">
        <GuildListContainer query={{ limit: 3 }} />
        <Flex justify="center" mt={8}>
          <Link href="/guilds">
            <Button>See more Guilds</Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default Index;
