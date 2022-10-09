import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
} from 'firebase/firestore/lite';
import { fetchHandler } from 'utils/api';
import { db } from 'utils/firebase/db';

export interface GuildData {
  name: string;
  email: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  message: string;
  slots?: number;
}

const guildsCollection = collection(
  db,
  'guilds',
) as CollectionReference<GuildData>;
const guildMembersCollection = collection(db, 'guild-members');

export const createGuild = async (data: GuildData) => {
  const fetcher = addDoc(guildsCollection, {
    ...data,
  });
  return fetchHandler(fetcher);
};

export const getGuilds = async () => {
  const fetcher = getDocs(guildsCollection);
  return fetchHandler(fetcher);
};

export const getGuildMembers = async () => {
  const fetcher = getDocs(guildMembersCollection);
  return fetchHandler(fetcher);
};
