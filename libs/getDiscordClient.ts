import { discordToken as discordTokenApi } from 'apis';
import DiscordOauth2 from 'discord-oauth2';

interface GetClientParams {
  accessToken: string;
}

const getDiscordClient = async ({ accessToken }: GetClientParams) => {
  const discordToken = await discordTokenApi.get(null, accessToken);
  if (discordToken) {
    const client = new DiscordOauth2();
    const user = await client.getUser(discordToken?.access_token as string);
    return { client, user };
  }
  return null;
};

export default getDiscordClient;
