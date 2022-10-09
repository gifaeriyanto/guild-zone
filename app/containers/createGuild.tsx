import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
import { createGuild } from 'utils/firebase/db/guild';
import { errorHandler } from 'utils/firebase/error';

export const CreateGuildContainer: React.FC = () => {
  const [loading, setLoading] = useBoolean();
  const toast = useToast();
  const router = useRouter();

  const errorToast = (title: string) => (error: Error | undefined) => {
    const errorMessage = errorHandler('')(error);
    toast({
      title,
      description: errorMessage,
      status: 'error',
      position: 'top',
    });
  };

  const redirectToGuildMember = () => router.push('/guild-members');

  const handleSubmit = pipe(
    tap(setLoading.on),
    formPreventDefault,
    getFormData,
    getFieldsData([
      'name',
      'email',
      'twitter',
      'telegram',
      'discord',
      'message',
    ]),
    createGuild,
    otherwise(errorToast('Something wrong')),
    andThen(pipe(setLoading.off, redirectToGuildMember)),
  );

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      borderBottom="4px solid"
      borderColor="brand.400"
      clipPath={cuboid2D}
    >
      <GridItem>
        <Flex
          alignItems="center"
          justify="center"
          h="full"
          bg="url('/create-guild-cover.jpg') no-repeat center/cover"
        >
          <Heading
            fontSize="6xl"
            textAlign="center"
            textShadow="0 0 20px rgba(0,0,0,.5)"
          >
            Create Your Guild
          </Heading>
        </Flex>
      </GridItem>
      <GridItem>
        <Box bgColor="gray.700" p={12}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isDisabled={loading} isRequired>
                <FormLabel>Guild/Company Name</FormLabel>
                <Input name="name" placeholder="Your project name" />
              </FormControl>
              <FormControl isDisabled={loading} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" placeholder="Your email address" />
              </FormControl>
              <FormControl isDisabled={loading}>
                <FormLabel>Twitter</FormLabel>
                <Input name="twitter" placeholder="Your twitter page" />
              </FormControl>
              <FormControl isDisabled={loading}>
                <FormLabel>Telegram</FormLabel>
                <Input name="telegram" placeholder="Your telegram page" />
              </FormControl>
              <FormControl isDisabled={loading}>
                <FormLabel>Discord</FormLabel>
                <Input name="discord" placeholder="Your discord page" />
              </FormControl>
              <FormControl isDisabled={loading} isRequired>
                <FormLabel>Your Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Write your message here"
                />
              </FormControl>
              <Button type="submit" alignSelf="flex-end">
                Create Guild
              </Button>
            </VStack>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
};
