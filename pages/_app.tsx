import { useEffect, useMemo, useState, useRef } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Iconify from 'components/Iconify';
import Script from 'next/script';
import { User, StoreKey } from 'types';
import { useBaseContext } from 'contexts/base';
import { SnackbarProvider } from 'notistack';
import { useScrollRestoration } from 'libs/useScrollRestoration';
import { Provider as LoaderProvider } from '../contexts/loader';
import { BaseContext as BaseContext } from '../contexts/base';
import { ProviderWithUI as ConfirmProviderWithUI } from '../contexts/confirm';
import { ProviderWithUI as MoreConfirmProviderWithUI } from '../contexts/moreConfirm';
import { IconButton } from '@mui/material';
import { apis } from 'apis';
import {
  getSavedProfile,
  upsertProfile,
  getNextPathAfterSignIn,
  removeNextPathAfterSignIn,
} from 'libs/auth';
import { DefaultSeo } from 'next-seo';
import * as locales from 'libs/locales';
import { Provider as ConfirmProvider } from '../contexts/confirm';
import { LocaleWords } from 'types/localeWords';
import BottomBar from '../components/BottomBar';
import Loader from '../components/Loader';
import ConfirmDialog from 'components/ConfirmDialog';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import * as StaticUrls from 'constants/staticUrls';
import { useRouter } from 'next/router';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ScreenWidth, ScreenMargin } from 'constants/styles';
import '../styles/globals.css';
import 'dayjs/locale/ko';
import LeftComponentsInWide from 'components/LeftComponentsInWide';
import AppBarInWide from 'components/AppBarInWide';
import theme from 'constants/theme';
import createEmotionCache from '../src/createEmotionCache';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.locale('ko');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient();

// useUser 하는 일
// 1. 유저 프로필 초기화
// 2. 인증 상태 변경에 따라 유저 프로필 변경
// 3. 서버에 푸시 토큰 갱신
interface UserCtx {
  user: User | null;
  loading: boolean;
}
const useUser = () => {
  const [userCtx, setUserCtx] = useState<UserCtx>({
    user: null,
    loading: true,
  });
  const router = useRouter();

  const setUserFromJwtOrClear = async () => {
    const jwtFromStorage = window.localStorage.getItem(StoreKey.Jwt);
    const jwtFromQuery = router.query.jwt as string;

    const jwt = jwtFromQuery || jwtFromStorage;

    if (jwt) {
      try {
        window.localStorage.setItem(StoreKey.Jwt, jwt);
        const { data: me } = await apis.user.getMe();
        setUserCtx({
          user: me,
          loading: false,
        });
      } catch (e) {
        window.localStorage.removeItem(StoreKey.Jwt);
        setUserCtx({
          loading: false,
          user: null,
        });
      }
    } else {
      window.localStorage.removeItem(StoreKey.Jwt);
      setUserCtx({
        loading: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        setUserFromJwtOrClear();
      }
    })();
  }, [router.isReady, router.query.jwt]);

  const logout = async () => {
    try {
      window.localStorage.removeItem(StoreKey.Jwt);
      setUserFromJwtOrClear();
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (userCtx.user && !userCtx.user.signedUp && router.pathname !== 'join') {
      router.replace('/join');
    }
  }, [userCtx, router.pathname]);
  return {
    loading: userCtx.loading,
    user: userCtx.user,
    logout,
    setUserFromJwtOrClear,
  };
};
export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { ...pageProps },
  } = props;

  // 유저 프로필 초기화
  const {
    loading: userLoading,
    user,
    logout,
    setUserFromJwtOrClear,
  } = useUser();
  // 언어 초기화

  // 스크롤 유지
  useScrollRestoration();

  const notistackRef = useRef<any>(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (router.query.err) {
        const err = decodeURIComponent(router.query.err);
        alert(err);
      }
    }
  }, [router.isReady, router.query]);

  const title = 'PetGPT - Always On';
  const description = '24/365 Pet Care Service';
  return (
    <CacheProvider value={emotionCache}>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          type: 'website',
          locale: 'en_IE',
          url: process.env.NEXT_PUBLIC_HOST,
          site_name: 'title',
          images: [
            {
              url: StaticUrls.Logo.Cover,
              width: 1041,
              height: 512,
              alt: 'title',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>

      <BaseContext.Provider
        value={{
          user,
          loading: userLoading,
          logout,
          setUserFromJwtOrClear,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
              ref={notistackRef}
              maxSnack={3}
              dense
              preventDuplicate
              autoHideDuration={3000}
              variant="success"
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              action={(key) => (
                <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
                  <Iconify icon={'eva:close-fill'} />
                </IconButton>
              )}
            >
              <LoaderProvider>
                <ConfirmProviderWithUI>
                  <MoreConfirmProviderWithUI>
                    <Box sx={styles.background} />
                    <LeftComponentsInWide sx={styles.leftComponents} />
                    <AppBarInWide sx={styles.appBar} />
                    <Box sx={styles.component}>
                      <Component {...pageProps} />
                      <BottomBar />
                    </Box>
                    <ConfirmDialog />
                    {userLoading.loading && (
                      <Box sx={styles.loader}>
                        <Loader />
                      </Box>
                    )}
                  </MoreConfirmProviderWithUI>
                </ConfirmProviderWithUI>
              </LoaderProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BaseContext.Provider>
    </CacheProvider>
  );
}

const styles = {
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: {
      xs: 'none',
      sm: `url(${StaticUrls.Background})`,
    },
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftComponents: {
    display: {
      sm: 'none',
      md: 'none',
      lg: 'block',
    },
    position: 'fixed',
    top: '260px',
    marginLeft: 'calc(50vw - 590px)',
  },
  appBar: {
    display: {
      sm: 'none',
      md: 'none',
      lg: 'block',
    },
  },
  component: {
    maxWidth: ScreenWidth,
    width: '100%',
    height: '100%',
    bottom: 0,
    margin: ScreenMargin,
    position: { xs: 'static', sm: 'relative' },
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
