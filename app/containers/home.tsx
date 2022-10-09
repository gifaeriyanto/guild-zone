import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utils/firebase/auth';

export const HomeContainer: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Box textAlign="center" pt="10rem">
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
  );
};
