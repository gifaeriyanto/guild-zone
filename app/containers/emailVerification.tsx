import React, { useEffect } from 'react';
import { Box, Button, Heading, useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  always,
  andThen,
  equals,
  has,
  ifElse,
  not,
  pipe,
  PredTypeguard,
  tap,
} from 'ramda';
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
  const [loading, setLoading] = useBoolean();
  const [isSent, setIsSent] = useBoolean();
  const router = useRouter();

  const _getQueries = pipe(
    getSearchParams,
    getQueries(['apiKey', 'email', 'oobCode']),
  );

  const isVerifying = () => {
    const queries = _getQueries();
    return Boolean(queries.apiKey && queries.email && queries.oobCode);
  };

  const verify = ifElse(
    isVerified,
    always,
    pipe(
      tap(setLoading.on),
      verifyEmail,
      andThen(setIsSent.on),
      andThen(setLoading.off),
    ),
  );

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
          <Heading>
            {isSent
              ? 'Email verification has been sent'
              : 'Your email is not verified'}
          </Heading>
          <Box mt={8}>
            {user?.email && (
              <Button
                onClick={() => user.email && verify(user.email)}
                isDisabled={loading}
              >
                {loading ? 'Sending...' : isSent ? 'Send again' : 'Verify now'}
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
