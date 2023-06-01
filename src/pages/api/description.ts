import { type NextApiRequest, type NextApiResponse } from 'next';

import crypto from 'crypto';
import webpush from 'web-push';

const vapidKeys = {
  privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
  publicKey: 'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8',
};

webpush.setVapidDetails('mailto:phi.dinh2023@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

const subscriptions = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  if (method === 'GET') {
    const subscriptionId = query.id;
    if (!subscriptionId || Array.isArray(subscriptionId)) {
      res.status(500).json({ message: 'Id is required' });
      return;
    }

    const pushSubscription = subscriptions[subscriptionId];

    webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({
          title: 'New Product Available ',
          text: 'HEY! Take a look at this brand new t-shirt!',
          image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
          tag: 'new-product',
          url: '/new-product-jason-leung-HM6TMmevbZQ-unsplash.html',
        })
      )
      .catch((err) => {
        console.log(err);
      });
    res.status(202).json({});
  } else {
    const subscriptionRequest = body.data;
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201).json({ id: susbscriptionId });
  }
}

function createHash(input: any) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(Buffer.from(input));
  return md5sum.digest('hex');
}
