import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
  UserCredential,
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
        ? 'http://localhost:3003/email-verification'
        : 'https://gifa-guild-zone.vercel.app/email-verification',
    handleCodeInApp: true,
  }).then(() => {
    window.localStorage.setItem('emailForSignIn', email);
  });
  return fetchHandler(fetcher);
};

export const logInWithLink = () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      return;
    }
    const fetcher = signInWithEmailLink(auth, email, window.location.href).then(
      () => {
        window.localStorage.removeItem('emailForSignIn');
      },
    );
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
