import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link as CLink,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore/lite';
import { andThen, map, pipe, tap } from 'ramda';
import { SiDiscord, SiTelegram, SiTwitter } from 'react-icons/si';
import { cuboid2D } from 'theme/clipPaths';
import { getGuilds, GuildData } from 'utils/firebase/db/guild';

export const GuildListContainer: React.FC = () => {
  const [loading, setLoading] = useBoolean();
  const [guilds, setGuilds] = useState<GuildData[]>([]);

  const pickDocs = (docs: QuerySnapshot<GuildData>) => docs.docs;

  const pickGuildData = (doc: QueryDocumentSnapshot<GuildData>) => doc.data();

  const _getGuilds = pipe(
    tap(setLoading.on),
    getGuilds,
    andThen(pickDocs),
    andThen(map(pickGuildData)),
    andThen(setGuilds),
  );

  useEffect(() => {
    _getGuilds(undefined);
  }, []);

  return (
    <>
      <Heading textAlign="center" mb={10}>
        Featured Guilds
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {guilds.map((guild, index) => (
          <GridItem key={index}>
            <Box clipPath={cuboid2D} p={4} bgColor="gray.700" h="100%">
              <Flex
                w="calc(100% + 2rem)"
                align="center"
                h="60px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                m={-4}
                mb={12}
              >
                <Box
                  bgColor="brand.200"
                  w="60px"
                  h="60px"
                  mt="60px"
                  ml={4}
                  borderRadius="full"
                />
              </Flex>
              <Heading as="h3" fontSize="2xl" mb={2}>
                {guild.name}
              </Heading>
              <Text fontSize="sm">
                {Boolean(guild.slots)
                  ? `Slots: ${guild.slots || 0}`
                  : 'No slots are available'}
              </Text>
              <HStack mt={4} spacing={4}>
                {Boolean(guild.discord) && (
                  <CLink href={guild.discord} target="_blank">
                    <Icon as={SiDiscord} />
                  </CLink>
                )}
                {Boolean(guild.telegram) && (
                  <CLink href={guild.telegram} target="_blank">
                    <Icon as={SiTelegram} />
                  </CLink>
                )}
                {Boolean(guild.twitter) && (
                  <CLink href={guild.twitter} target="_blank">
                    <Icon as={SiTwitter} />
                  </CLink>
                )}
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
