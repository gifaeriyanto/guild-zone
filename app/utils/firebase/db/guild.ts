import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
} from 'firebase/firestore/lite';
import { fetchHandler } from 'utils/api';
import { auth } from 'utils/firebase/auth';
import { db } from 'utils/firebase/db';

export interface GuildData {
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

const guildsCollection = collection(
  db,
  'guilds',
) as CollectionReference<GuildData>;
const guildMembersCollection = collection(db, 'guild-members');

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

export const getGuildMembers = async () => {
  const fetcher = getDocs(guildMembersCollection);
  return fetchHandler(fetcher);
};
