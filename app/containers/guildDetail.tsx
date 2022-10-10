import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link as CLink,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { andThen, pipe, tap } from 'ramda';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SiDiscord, SiTelegram, SiTwitter } from 'react-icons/si';
import { cuboid2D } from 'theme/clipPaths';
import { auth } from 'utils/firebase/auth';
import { getGuildDetail, GuildData } from 'utils/firebase/db/guild';

export const GuildDetailContainer: React.FC = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useBoolean();
  const [detail, setDetail] = useState<GuildData>();
  const router = useRouter();

  const guildId = useMemo(() => router.query?.id?.toString() || '', [router]);

  const redirectTo404 = (data: GuildData | undefined) => {
    if (!data) {
      router.push('/404');
    }
  };

  const fetchGuildDetail = pipe(
    tap(setLoading.on),
    getGuildDetail,
    andThen((res) => res.data()),
    andThen(tap(redirectTo404)),
    andThen(setDetail),
    andThen(setLoading.off),
  );

  useEffect(() => {
    guildId && fetchGuildDetail(guildId);
  }, [guildId]);

  return (
    <>
      {loading ? (
        <Box textAlign="center">Loading...</Box>
      ) : (
        <Box clipPath={cuboid2D} bgColor="gray.700" p={8}>
          <Grid templateColumns={{ sm: '1fr 3fr' }} gap={8}>
            <GridItem>
              <Box
                clipPath={cuboid2D}
                w="full"
                h={{ sm: 'full', base: '200px' }}
                bg="url(/guild-logo.jpeg) no-repeat center/cover"
                bgColor="brand.200"
              />
            </GridItem>
            <GridItem>
              <Heading mb={10}>{detail?.name}</Heading>
              <Text fontSize="sm">{detail?.message}</Text>
              <HStack mt={4} spacing={4}>
                {Boolean(detail?.discord) && (
                  <CLink href={detail?.discord} target="_blank">
                    <Icon as={SiDiscord} />
                  </CLink>
                )}
                {Boolean(detail?.telegram) && (
                  <CLink href={detail?.telegram} target="_blank">
                    <Icon as={SiTelegram} />
                  </CLink>
                )}
                {Boolean(detail?.twitter) && (
                  <CLink href={detail?.twitter} target="_blank">
                    <Icon as={SiTwitter} />
                  </CLink>
                )}
              </HStack>
              <Link href={`/guilds/${guildId}/join`}>
                <a>
                  <Button mt={10}>Join Guild</Button>
                </a>
              </Link>
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};
