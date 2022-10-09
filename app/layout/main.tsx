import React, { PropsWithChildren, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Img,
  useDisclosure,
} from '@chakra-ui/react';
import { LogInModal } from 'components/modals/logInModal';
import { SignUpModal } from 'components/modals/signUpModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pipe } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logOut } from 'utils/firebase/auth';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {
    isOpen: isOpenSignUpModal,
    onOpen: onOpenSignUpModal,
    onClose: onCloseSignUpModal,
  } = useDisclosure();
  const {
    isOpen: isOpenLogInModal,
    onOpen: onOpenLogInModal,
    onClose: onCloseLogInModal,
  } = useDisclosure();

  const redirectToHome = () => {
    router.push('/');
  };

  const handleLogout = pipe(logOut, redirectToHome);

  return (
    <>
      <Container maxW="container.lg" mb="8rem">
        <Flex py={8} justify="space-between" mb={8}>
          <Box>
            <Link href="/">
              <a>
                <Img
                  src="https://assets.website-files.com/62d867fa7c6c5d5faaf26ad3/62dc01ef48e9488670b72569_logo2.svg"
                  alt="Blockchain Space Logo"
                />
              </a>
            </Link>
          </Box>
          <Box>
            {user?.displayName ? (
              <HStack spacing={8}>
                <Link href="/guild-members">
                  <a>
                    <Button variant="ghost">Guild Members</Button>
                  </a>
                </Link>
                <Link href="/create-guild">
                  <a>
                    <Button variant="solid" colorScheme="gray">
                      Create Guild
                    </Button>
                  </a>
                </Link>
                <Box>
                  Hi {user.displayName},{' '}
                  <Button variant="ghost" onClick={handleLogout}>
                    Log out
                  </Button>
                </Box>
              </HStack>
            ) : (
              <HStack spacing={4}>
                <Button variant="ghost" onClick={onOpenLogInModal}>
                  Log In
                </Button>
                <Button
                  variant="primary"
                  colorScheme="brand"
                  onClick={onOpenSignUpModal}
                >
                  Sign Up
                </Button>
              </HStack>
            )}
          </Box>
        </Flex>
        {children}
      </Container>

      <SignUpModal isOpen={isOpenSignUpModal} onClose={onCloseSignUpModal} />
      <LogInModal isOpen={isOpenLogInModal} onClose={onCloseLogInModal} />
    </>
  );
};
