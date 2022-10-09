import React, { PropsWithChildren, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utils/firebase/auth';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isNotAuth = !loading && !user?.uid;

  useEffect(() => {
    if (isNotAuth) {
      router.push('/');
    }
  }, [isNotAuth]);

  if (loading) {
    return (
      <Box py={10} textAlign="center">
        Loading...
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
