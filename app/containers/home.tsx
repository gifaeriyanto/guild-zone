import { Box, Heading, Text } from '@chakra-ui/react';

export const HomeContainer: React.FC = () => {
  return (
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
  );
};
