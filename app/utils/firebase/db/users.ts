import { UserCredential } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { fetchHandler } from 'utils/api';
import { db } from 'utils/firebase/db';

type UserData = Pick<UserCredential['user'], 'displayName' | 'email' | 'uid'>;

const usersCollection = collection(db, 'users');
const userDoc = (uid: string) => doc(db, 'users', uid);

export const addUser = async (data: UserData) => {
  const fetcher = setDoc(userDoc(data.uid), {
    ...data,
    authProvider: 'local',
  });
  return fetchHandler(fetcher);
};

export const getUsers = async () => {
  const fetcher = getDocs(usersCollection);
  return fetchHandler(fetcher);
};
