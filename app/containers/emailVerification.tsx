import React, { useEffect } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { pipe } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  isVerified,
  logInWithLink,
  verifyEmail,
} from 'utils/firebase/auth';
import { getQueries, getSearchParams } from 'utils/url';

export const EmailVerificationContainer: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const _getQueries = pipe(
    getSearchParams,
    getQueries(['apiKey', 'email', 'oobCode']),
  );

  const isVerifying = () => {
    const queries = _getQueries();
    return Boolean(queries.apiKey && queries.email && queries.oobCode);
  };

  const verify = (email: string) => () => {
    if (!isVerified()) {
      verifyEmail(email);
    }
  };

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    if (isVerifying()) {
      logInWithLink(user.email)?.then(() => router.push('/email-verification'));
    }
  }, [user?.email]);

  return (
    <Box textAlign="center">
      {isVerified() ? (
        <>
          <Heading>Congratulation, your email is verified</Heading>
        </>
      ) : (
        <>
          <Heading>Your email is not verified</Heading>
          {!!user?.email && (
            <Button onClick={verify(user.email)} mt={8}>
              Verify now
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
