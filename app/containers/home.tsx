import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FiMail } from 'react-icons/fi';
import { cuboid2D } from 'theme/clipPaths';
import { auth } from 'utils/firebase/auth';

export const HomeContainer: React.FC = () => {
  const [user] = useAuthState(auth);

  const emailVerificationAlert = () => {
    if (!user || user?.emailVerified) {
      return null;
    }

    return (
      <Box
        p={4}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        clipPath={cuboid2D}
        mb={8}
      >
        <Flex w="full" justify="space-between" align="center">
          <Flex fontWeight="bold" align="center" mr="6rem">
            <Icon as={FiMail} mr={4} fontSize="2xl" />
            Please verify your email address
          </Flex>
          <Link href="/email-verification">
            <a>
              <Button bgColor="white" color="brand.500">
                Verify
              </Button>
            </a>
          </Link>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      {emailVerificationAlert()}
      <Box textAlign="center" pt="8rem">
        <Heading>
          Welcome to <br />
          <Text as="span" fontSize="9xl" fontWeight="900">
            Guild{' '}
            <Text as="span" color="brand.500">
              Zone
            </Text>
          </Text>
        </Heading>
        <Text>Powered by Blockchain Space</Text>
      </Box>
    </>
  );
};
