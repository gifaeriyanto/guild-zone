import { GuildMembersContainer } from 'containers/guildMembers';
import { AuthLayout } from 'layout/auth';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guild Members</title>
      </Head>
      <AuthLayout>
        <GuildMembersContainer />
      </AuthLayout>
    </>
  );
};

export default Index;
