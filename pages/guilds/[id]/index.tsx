import { GuildDetailContainer } from 'containers/guildDetail';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guild Detail</title>
      </Head>
      <GuildDetailContainer />
    </>
  );
};

export default Index;
