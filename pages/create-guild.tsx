import { CreateGuildContainer } from 'containers/createGuild';
import { AuthLayout } from 'layout/auth';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Your Guild</title>
      </Head>
      <AuthLayout>
        <CreateGuildContainer />
      </AuthLayout>
    </>
  );
};

export default Index;
