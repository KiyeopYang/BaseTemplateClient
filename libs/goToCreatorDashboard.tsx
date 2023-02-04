import { supabase } from './supabase';

const goToCreatorDashboard = ({ path }: { path: string }) => {
  const session = supabase.auth.session();
  if (session) {
    const query = [
      'access_token',
      'expires_in',
      'provider_token',
      'refresh_token',
      'token_type',
    ].reduce((acc, key, i) => {
      const v = (session as any)[key] as string;
      return (acc = `${acc}${i === 0 ? '' : '&'}${key}=${v}`);
    }, '');
    return window.open(
      `${process.env.NEXT_PUBLIC_CREATOR_TOOL_URL}${path}#${query}`,
      '_blank'
    );
  } else {
    alert('Sign-In is required.');
  }
};
export default goToCreatorDashboard;
