import { JoinGuildContainer } from 'containers/joinGuild';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Join Guild</title>
      </Head>
      <JoinGuildContainer />
    </>
  );
};

export default Index;
