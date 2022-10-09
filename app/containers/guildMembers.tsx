import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import {
  DocumentData,
  orderBy,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from 'firebase/firestore/lite';
import { andThen, map, pipe, tap } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utils/firebase/auth';
import {
  getGuildMembers,
  getGuilds,
  GuildData,
  GuildMemberData,
} from 'utils/firebase/db/guild';

export const GuildMembersContainer: React.FC = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useBoolean();
  const [guilds, setGuilds] = useState<GuildData[]>([]);
  const [guildMembers, setGuildMembers] = useState<GuildMemberData[]>([]);
  const [selectedGuild, setSelectedGuild] = useState('');

  const pickDocs = <T extends DocumentData>(docs: QuerySnapshot<T>) =>
    docs.docs;

  const pickGuildData = <T extends DocumentData>(
    doc: QueryDocumentSnapshot<T>,
  ) => {
    return { ...doc.data(), uid: doc.id };
  };

  const fetchGuilds = pipe(
    tap(setLoading.on),
    (uid: string) =>
      getGuilds(where('creatorUid', '==', uid), orderBy('createdAt'))(),
    andThen(pickDocs),
    andThen(map(pickGuildData)),
    andThen(setGuilds),
    andThen(setLoading.off),
  );

  const fetchGuildMembers = pipe(
    tap(setLoading.on),
    getGuildMembers,
    andThen(pickDocs),
    andThen(map(pickGuildData)),
    andThen(setGuildMembers),
    andThen(setLoading.off),
  );

  useEffect(() => {
    user?.uid && fetchGuilds(user.uid);
  }, [user]);

  useEffect(() => {
    selectedGuild && fetchGuildMembers(selectedGuild);
  }, [selectedGuild]);

  const handleSelectGuild = (idx: number) => {
    const id = guilds[idx].uid;
    id && setSelectedGuild(id);
  };

  useEffect(() => {
    if (guilds.length) {
      handleSelectGuild(0);
    }
  }, [guilds]);

  if (!loading && !guilds.length) {
    return (
      <Box textAlign="center">
        <Heading>No guilds</Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={8}>Guild Members</Heading>
      <Tabs onChange={handleSelectGuild} colorScheme="brand">
        <TabList>
          {guilds.map((guild) => (
            <Tab key={guild.uid}>{guild.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {guilds.map((guild) => (
            <TabPanel key={guild.uid}>
              {!!guildMembers.length ? (
                <TableContainer
                  border="1px solid"
                  borderColor="gray.700"
                  borderRadius="md"
                >
                  <Table variant="striped">
                    <Thead>
                      <Tr bgColor="brand.500">
                        <Th>Subject</Th>
                        <Th>Email</Th>
                        <Th>Experience</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {guildMembers.map((member) => (
                        <Tr key={member.uid}>
                          <Td>{member.subject}</Td>
                          <Td>{member.email}</Td>
                          <Td>{member.message}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Box>{loading ? 'Loading...' : 'Applicants is empty'}</Box>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
