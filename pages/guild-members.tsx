import { GuildMembersContainer } from 'containers/guildMembers';
import AuthLayout from 'layout/auth';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <AuthLayout>
      <GuildMembersContainer />
    </AuthLayout>
  );
};

export default Index;
