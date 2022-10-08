import { getFirestore } from 'firebase/firestore/lite';
import { firebaseApp } from 'utils/firebase';

export const db = getFirestore(firebaseApp);
