import { JoinGuildContainer } from 'containers/joinGuild';
import { NoAuthLayout } from 'layout/noAuth';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Join Guild</title>
      </Head>
      <NoAuthLayout>
        <JoinGuildContainer />
      </NoAuthLayout>
    </>
  );
};

export default Index;
