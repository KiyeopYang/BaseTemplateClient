import { supabase } from './supabase';
import { saveNextPathAfterSignIn } from 'libs/auth';
import { definitions } from 'types/database';

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'PROD';
const API = process.env.NEXT_PUBLIC_BACKEND_API;

export const getTwitterStatus = async (userId: string) => {
  const { data } = await supabase
    .from('twitterToken')
    .select('*')
    .eq('user', userId);
  if (data?.[0]) {
    return data[0];
  }
  return null;
};

export const connectTwitter = async (userId: string) => {
  const login_url = `${API}/r/twitter_login`;
  saveNextPathAfterSignIn(window.location.pathname);
  const params = {
    linkingUrl: window.location.origin,
    prod: isProd ? 'prod' : 'dev',
    user: userId,
  };
  const paramsString = new URLSearchParams(params).toString();
  const url = login_url + '?' + paramsString;
  window.location.href = url;
};
export const disconnectTwitter = async (userId: string) => {
  await supabase.from('twitterToken').delete().match({
    user: userId,
  });
};

interface ConnectTwitterV1Params {}

export const connectTwitterV1 = async (props?: ConnectTwitterV1Params) => {
  const auth = supabase.auth.session();
  if (auth?.user) {
    window.location.href = `/api/oauth/twitter/request_token?redirectTo=${encodeURIComponent(
      `${process.env.HOST}/api/oauth/twitter/callback?accessToken=${
        auth?.access_token
      }&userId=${auth?.user.id}&redirectTo=${encodeURIComponent(
        window.location.href
      )}`
    )}`;
  } else {
    alert('NO USER');
  }
};
