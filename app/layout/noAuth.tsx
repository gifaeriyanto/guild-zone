import React, { PropsWithChildren, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utils/firebase/auth';

export const NoAuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const isAuth = !loading && user?.uid;

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth]);

  if (loading) {
    return (
      <Box py={10} textAlign="center">
        Loading...
      </Box>
    );
  }

  if (isAuth) {
    return null;
  }

  return <>{children}</>;
};
