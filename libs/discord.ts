import { supabase } from './supabase';
import { saveNextPathAfterSignIn } from 'libs/auth';
import { definitions } from 'types/database';

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'PROD';
const API = process.env.NEXT_PUBLIC_BACKEND_API;

export const getDiscordStatus = async (userId: string) => {
  const { data } = await supabase
    .from('discordToken')
    .select('*')
    .eq('user', userId);
  if (data?.[0]) {
    return data[0];
  }
  return null;
};

interface ConnectDiscordV1Params {}

export const connectDiscord = async (props?: ConnectDiscordV1Params) => {
  const auth = supabase.auth.session();
  if (auth?.user) {
    window.location.href = `/api/oauth/discord/authorize?accessToken=${
      auth?.access_token
    }&userId=${auth?.user.id}&redirectTo=${encodeURIComponent(
      window.location.href
    )}`;
  } else {
    alert('NO USER');
  }
};
