import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import { pipe, replace } from 'ramda';
import { fetchHandler } from 'utils/api';
import { firebaseApp } from 'utils/firebase';
import { capitalizeFirstLetter } from 'utils/string';

interface authParams {
  email: string;
  password: string;
}

export const auth = getAuth(firebaseApp);

export const signUp = ({ email, password }: authParams) => {
  const fetcher = createUserWithEmailAndPassword(auth, email, password);
  return fetchHandler(fetcher);
};

export const logIn = ({ email, password }: authParams) => {
  const fetcher = signInWithEmailAndPassword(auth, email, password);
  return fetchHandler(fetcher);
};

export const logOut = () => {
  const fetcher = signOut(auth);
  return fetchHandler(fetcher);
};

export const verifyEmail = (email: string) => {
  const fetcher = sendSignInLinkToEmail(auth, email, {
    url:
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3003/email-verification?email=${email}`
        : `https://gifa-guild-zone.vercel.app/email-verification?email=${email}`,
    handleCodeInApp: true,
  });
  return fetchHandler(fetcher);
};

export const logInWithLink = (email: string) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const fetcher = signInWithEmailLink(auth, email, window.location.href);
    return fetchHandler(fetcher);
  }
};

export const authErrorMessage = (error: AuthError) =>
  pipe(
    replace('auth/', ''),
    replace(/-/g, ' '),
    capitalizeFirstLetter,
  )(error.code);

export const authErrorHandler = (error: Error | undefined) => {
  if (!error && !error?.['code']) {
    return;
  }
  const authError = error as AuthError;
  return authErrorMessage(authError);
};

export const isVerified = () => Boolean(auth.currentUser?.emailVerified);
