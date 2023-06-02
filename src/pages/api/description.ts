import { app, db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  if (method === 'POST') {
    // get all tokens from database
    const docRef = collection(db, 'tokens');
    const tokenSnap = await getDocs(docRef);
    const regisTokens: any[] = [];
    const TOPIC = process.env.NEXT_PUBLIC_TOPIC || 'topic1';

    tokenSnap.forEach((item) => {
      const _t = item.data();
      console.log('tokens.indexOf(_t.value)', regisTokens.indexOf(_t.value));
      if (regisTokens.indexOf(_t.value) === -1) {
        regisTokens.push(_t.value);
      }
    });

    getMessaging()
      .subscribeToTopic(regisTokens, TOPIC)
      .then((response: any) => {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log('Successfully subscribed to topic:', response);
      })
      .catch((error: any) => {
        console.log('Error subscribing to topic:', error);
      });

    res.status(201).json({ status: true, code: 200, msg: 'Return message', data: regisTokens });
  } else {
    res.status(500).json({ status: false, code: 500, msg: 'Method is not allowed', data: [] });
  }
}
