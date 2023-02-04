import { twitterToken as twitterTokenApi } from 'apis';
import { TwitterApi } from 'twitter-api-v2';

interface GetClientParams {
  accessToken: string;
}

const getTwitterClient = async ({ accessToken }: GetClientParams) => {
  const twitterToken = await twitterTokenApi.get(null, accessToken);
  const client = new TwitterApi({
    // @ts-ignore
    appKey: process.env.TWITTER_CUSTOMER_KEY || '',
    appSecret: process.env.TWITTER_CUSTOMER_SECRET || '',
    accessToken: twitterToken?.token,
    accessSecret: twitterToken?.secret,
  });
  return client;
};

export default getTwitterClient;
