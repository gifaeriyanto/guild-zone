import { EmailVerificationContainer } from 'containers/emailVerification';
import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <EmailVerificationContainer />
    </>
  );
};

export default Index;
