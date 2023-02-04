import { Session } from '@supabase/supabase-js';
import { definitions } from 'types/database';
import getUniqueName from './getUniqueName';
import { supabase } from './supabase';
import { getNavigatorLocale } from 'libs/locales';
import * as StaticUrls from 'constants/staticUrls';
import { StoreKey } from 'types';
import { useEffect } from 'react';
import { profile as profileApi } from 'apis';
import Router from 'next/router';
export const useProtectedPage = ({
  level,
  redirectTo,
}: {
  level: 'auth' | 'influencer' | 'admin';
  redirectTo: string;
}) => {
  useEffect(() => {
    if (level && redirectTo) {
      (async () => {
        const session = supabase.auth.session();
        if (session) {
          const profile = await profileApi.getProfile();
          switch (level) {
            case 'admin': {
              if (!profile?.isAdmin) {
                Router.push(redirectTo);
              }
              break;
            }
          }
        }
      })();
    }
  }, []);
};

export const upsertProfile = async (session: Session) => {
  const updates = {
    id: session.user?.id,
    locale: getNavigatorLocale(),
    provider: session.user?.app_metadata.provider,
    username: session.user?.user_metadata?.name || getUniqueName(),
    profileImg: StaticUrls.DefaultProfile,
    email: session.user?.user_metadata.email,
    sub: session.user?.user_metadata.sub,
  };
  const { data: profile, error } = await supabase
    .from('profiles')
    .upsert(updates)
    .limit(1)
    .single();
  if (error) {
    console.error(error);
  }
  return profile;
};
export const getSavedProfile = async (userId: string) => {
  try {
    const { data: profile } = await supabase
      .from<definitions['profiles']>('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return profile;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const saveNextPathAfterSignIn = async (path: string) => {
  if (path) {
    window.localStorage.setItem(StoreKey.NextPathAfterSignIn, path);
  } else {
    removeNextPathAfterSignIn();
  }
};

export const getNextPathAfterSignIn = () => {
  return window.localStorage.getItem(StoreKey.NextPathAfterSignIn);
};

export const removeNextPathAfterSignIn = () => {
  return window.localStorage.removeItem(StoreKey.NextPathAfterSignIn);
};
