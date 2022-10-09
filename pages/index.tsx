import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { GuildListContainer } from 'containers/guildList';
import { HomeContainer } from 'containers/home';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guild Zone</title>
      </Head>
      <HomeContainer />
      <Box my="8rem">
        <GuildListContainer query={{ limit: 3 }} />
        <Flex justify="center" mt={8}>
          <Link href="/guilds">
            <a>
              <Button>See more Guilds</Button>
            </a>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default Index;
