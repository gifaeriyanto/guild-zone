import { useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ifElse } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithLink, verifyEmail } from 'utils/firebase/auth';

const Index: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const isVerifying = () => {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('apiKey');
    const oobCode = params.get('oobCode');
    return Boolean(apiKey && oobCode);
  };

  const verifyOrBack = () => {
    if (user?.emailVerified) {
      user?.email && verifyEmail(user?.email);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (isVerifying()) {
      logInWithLink();
    } else {
      verifyOrBack();
    }
  }, []);

  return (
    <>Email status: {user?.emailVerified ? 'verified' : 'not verified'} </>
  );
};

export default Index;