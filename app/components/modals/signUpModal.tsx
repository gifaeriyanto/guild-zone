import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { andThen, otherwise, pipe, tap } from 'ramda';
import {
  formPreventDefault,
  getFieldsData,
  getFormData,
} from 'utils/events/form';
import { authErrorHandler, signUp } from 'utils/firebase/auth';
import { addUser } from 'utils/firebase/db/users';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useBoolean();
  const router = useRouter();
  const toast = useToast();

  const errorToast = (title: string) => (error: Error | undefined) => {
    const errorMessage = authErrorHandler(error);
    toast({
      title,
      description: errorMessage,
      status: 'error',
      position: 'top',
    });
  };

  const saveUser = async ({
    email,
    name,
    password,
  }: Record<string, string>) => {
    const res = await signUp({ email, password });
    const uid = res?.user.uid;
    if (uid) {
      Promise.all([
        addUser({
          displayName: name,
          email,
          uid,
        }),
        updateProfile(res.user, {
          displayName: name,
        }),
      ]);
    }
  };

  const redirectToEmailVerificationPage = () => {
    router.push('/email-verification');
  };

  const handleSignUp = pipe(
    tap(setLoading.on),
    formPreventDefault,
    getFormData,
    getFieldsData(['name', 'email', 'password']),
    saveUser,
    andThen(pipe(onClose, redirectToEmailVerificationPage)),
    otherwise(errorToast('Failed to sign up')),
    andThen(setLoading.off),
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSignUp}>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isDisabled={loading} isRequired>
                  <Input name="name" placeholder="Full name" />
                </FormControl>
                <FormControl isDisabled={loading} isRequired>
                  <Input name="email" placeholder="Email" />
                </FormControl>
                <FormControl isDisabled={loading} isRequired>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="brand" isDisabled={loading}>
                {loading ? 'Loading...' : 'Sign Up'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
