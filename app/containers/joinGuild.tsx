import React, { useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useBoolean,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { andThen, otherwise, pipe, tap } from 'ramda';
import { cuboid2D } from 'theme/clipPaths';
import {
  formPreventDefault,
  getFieldsData,
  getFormData,
} from 'utils/events/form';
import { joinGuild } from 'utils/firebase/db/guild';
import { errorHandler } from 'utils/firebase/error';

export const JoinGuildContainer: React.FC = () => {
  const [loading, setLoading] = useBoolean();
  const router = useRouter();
  const toast = useToast();

  const guildId = useMemo(() => router.query?.id?.toString() || '', [router]);

  const errorToast = (title: string) => (error: Error | undefined) => {
    const errorMessage = errorHandler('')(error);
    toast({
      title,
      description: errorMessage,
      status: 'error',
      position: 'top',
    });
  };

  const successToast = () => {
    toast({
      title: 'Success',
      description:
        'Thank you for applying, we will send an email when we agree with you',
      status: 'success',
      position: 'top',
    });
  };

  const redirectToGuilds = () => {
    router.push('/guilds');
  };

  const handleSubmit = pipe(
    tap(setLoading.on),
    formPreventDefault,
    getFormData,
    getFieldsData(['email', 'subject', 'message']),
    joinGuild(guildId),
    andThen(successToast),
    otherwise(errorToast('Something wrong')),
    andThen(redirectToGuilds),
    andThen(setLoading.off),
  );

  return (
    <Container maxW="md">
      <Box clipPath={cuboid2D} bgColor="gray.700" p={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Heading alignSelf="flex-start" pb={4}>
              Join Guild
            </Heading>
            <FormControl isDisabled={loading} isRequired mb={4}>
              <FormLabel>Your Email</FormLabel>
              <Input name="email" placeholder="Email" />
            </FormControl>
            <FormControl isDisabled={loading} isRequired>
              <FormLabel>Subject</FormLabel>
              <Input name="subject" placeholder="Apply to Join the Guild" />
            </FormControl>
            <FormControl isDisabled={loading} isRequired>
              <Textarea
                name="message"
                placeholder="Describe your experience here"
              />
            </FormControl>
            <Flex justify="flex-end" w="full" pt={4}>
              <Button type="submit" isDisabled={loading}>
                Apply
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};
