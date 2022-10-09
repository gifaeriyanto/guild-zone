import { CreateGuildContainer } from 'containers/createGuild';
import AuthLayout from 'layout/auth';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <AuthLayout>
      <CreateGuildContainer />
    </AuthLayout>
  );
};

export default Index;
