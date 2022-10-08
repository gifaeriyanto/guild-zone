import { useEffect } from 'react';
import { Box, Button, FormControl, Input, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { pipe } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  formPreventDefault,
  getFieldsData,
  getFormData,
} from 'utils/events/form';
import {
  auth,
  authErrorHandler,
  logIn,
  logOut,
  signUp,
} from 'utils/firebase/auth';
import { addUser } from 'utils/firebase/db/users';

const Index: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();
  const router = useRouter();

  const errorToast = (title: string) => (error: Error | undefined) => {
    const errorMessage = authErrorHandler(error);
    toast({
      title,
      description: errorMessage,
      status: 'error',
      position: 'top',
    });
  };

  const saveUser = ({ email, name, password }: Record<string, string>) => {
    signUp({ email, password })
      .then((res) => {
        const uid = res?.user.uid;
        if (uid) {
          return addUser({
            displayName: name,
            email,
            uid,
          });
        }
      })
      .then(() => {
        router.push(`/email-verification?email=${email}`);
      })
      .catch(errorToast('Failed to sign up'));
  };

  const tryLogIn = ({ email, password }: Record<string, string>) => {
    logIn({ email, password }).catch(errorToast('Failed to log in'));
  };

  const handleLogIn = pipe(
    formPreventDefault,
    getFormData,
    getFieldsData(['email', 'password']),
    tryLogIn,
  );

  const handleSignUp = pipe(
    formPreventDefault,
    getFormData,
    getFieldsData(['name', 'email', 'password']),
    saveUser,
  );

  return (
    <>
      <Box>email: {user?.email || '-'}</Box>
      <form onSubmit={handleLogIn}>
        <FormControl>
          <Input name="email" defaultValue="gifa.eriyanto@gmail.com" />
          <Input type="password" name="password" defaultValue="whatever" />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
      <br />
      <form onSubmit={handleSignUp}>
        <FormControl>
          <Input name="name" />
          <Input name="email" />
          <Input type="password" name="password" />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
      <Button onClick={logOut}>Log out</Button>
    </>
  );
};

export default Index;
