import { GuildListContainer } from 'containers/guildList';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guild List</title>
      </Head>
      <GuildListContainer />
    </>
  );
};

export default Index;
