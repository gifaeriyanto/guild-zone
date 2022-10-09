import React from 'react';
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
import { andThen, otherwise, pipe, tap, tryCatch } from 'ramda';
import {
  formPreventDefault,
  getFieldsData,
  getFormData,
} from 'utils/events/form';
import { authErrorHandler, logIn } from 'utils/firebase/auth';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogInModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useBoolean();
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

  const handleLogIn = pipe(
    tap(setLoading.on),
    formPreventDefault,
    getFormData,
    getFieldsData(['email', 'password']),
    logIn,
    andThen(onClose),
    otherwise(errorToast('Failed to log in')),
    andThen(setLoading.off),
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleLogIn}>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isDisabled={loading}>
                  <Input name="email" placeholder="Email" />
                </FormControl>
                <FormControl isDisabled={loading}>
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
                {loading ? 'Loading...' : 'Log In'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
