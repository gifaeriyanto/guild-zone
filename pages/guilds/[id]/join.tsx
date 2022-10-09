import { GuildDetailContainer } from 'containers/guildDetail';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Join Guild</title>
      </Head>
      <GuildDetailContainer />
    </>
  );
};

export default Index;
