import React, { PropsWithChildren, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Img,
  Input,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { LogInModal } from 'components/modals/logInModal';
import { SignUpModal } from 'components/modals/signUpModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pipe } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiOutlineMenu } from 'react-icons/hi';
import { auth, logOut } from 'utils/firebase/auth';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isMobile] = useMediaQuery('(max-width: 880px)');
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
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const redirectToHome = () => {
    router.push('/');
  };

  const handleLogout = pipe(logOut, redirectToHome);

  useEffect(() => {
    router.events.on('routeChangeStart', onCloseDrawer);
    return () => {
      router.events.off('routeChangeStart', onCloseDrawer);
    };
  }, []);

  const navDrawer = () => {
    return (
      <Drawer isOpen={isOpenDrawer} placement="right" onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid" borderColor="gray.600">
            <Box>Hi {user?.displayName || 'There'}</Box>
          </DrawerHeader>

          <DrawerBody>
            {user?.displayName ? (
              <Flex direction="column" justify="space-between" h="full">
                <VStack spacing={8} mt={6}>
                  <Box w="full">
                    <Link href="/guild-members">
                      <a>
                        <Button variant="link">Guild Members</Button>
                      </a>
                    </Link>
                  </Box>
                  <Box w="full">
                    <Link href="/create-guild">
                      <a>
                        <Button w="full">Create Guild</Button>
                      </a>
                    </Link>
                  </Box>
                </VStack>
                <Box w="full" mb={4}>
                  <Button variant="link" onClick={handleLogout}>
                    Log out
                  </Button>
                </Box>
              </Flex>
            ) : (
              <VStack spacing={8} mt={6}>
                <Button
                  variant="primary"
                  colorScheme="brand"
                  onClick={onOpenSignUpModal}
                  w="full"
                >
                  Sign Up
                </Button>
                <Button variant="ghost" onClick={onOpenLogInModal} w="full">
                  Log In
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };

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
            {isMobile ? (
              <>
                <IconButton
                  icon={<HiOutlineMenu />}
                  aria-label="toggle-nav"
                  onClick={onOpenDrawer}
                />
                {navDrawer()}
              </>
            ) : (
              <>
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
              </>
            )}
          </Box>
        </Flex>

        <Box>{children}</Box>
      </Container>

      <SignUpModal isOpen={isOpenSignUpModal} onClose={onCloseSignUpModal} />
      <LogInModal isOpen={isOpenLogInModal} onClose={onCloseLogInModal} />
    </>
  );
};
