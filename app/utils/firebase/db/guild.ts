import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from 'firebase/firestore/lite';
import { fetchHandler } from 'utils/api';
import { auth } from 'utils/firebase/auth';
import { db } from 'utils/firebase/db';

export interface GuildData {
  uid?: string;
  name: string;
  email: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  message: string;
  slots?: number;
  creatorUid?: string;
  createdAt?: Date;
}

export interface GuildMemberData {
  uid?: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  guildUid?: string;
}

const guildsCollection = collection(
  db,
  'guilds',
) as CollectionReference<GuildData>;
const guildMembersCollection = collection(
  db,
  'guild-members',
) as CollectionReference<GuildMemberData>;
const guildDetailCollection = (uid: string) =>
  doc(db, 'guilds', uid) as DocumentReference<GuildData>;

export const createGuild = async (data: GuildData) => {
  const fetcher = addDoc(guildsCollection, {
    ...data,
    creatorUid: auth.currentUser?.uid,
    createdAt: new Date(),
  });
  return fetchHandler(fetcher);
};

export const getGuilds =
  (...queries: QueryConstraint[]) =>
  async () => {
    const fetcher = getDocs(query(guildsCollection, ...queries));
    return fetchHandler(fetcher);
  };

export const getGuildMembers = async (guildUid: string) => {
  const fetcher = getDocs(
    query(guildMembersCollection, where('guildUid', '==', guildUid)),
  );
  return fetchHandler(fetcher);
};

export const getGuildDetail = async (uid: string) => {
  const fetcher = getDoc(guildDetailCollection(uid));
  return fetchHandler(fetcher);
};

export const joinGuild =
  (guildUid: string) => async (data: GuildMemberData) => {
    const fetcher = addDoc(guildMembersCollection, {
      ...data,
      guildUid,
      createdAt: new Date(),
    });
    return fetchHandler(fetcher);
  };
