/* eslint-disable */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');
const configEnv = require('./env/config');

// production / development 환경 변수 설정
const dotEnvResult = configEnv();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const { HOST, BACKEND_API, PORT, APP_ENV, GIT_COMMIT } = process.env;
const DEFAULT_PORT = 3000;
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    HOST: HOST,
    PORT: PORT || DEFAULT_PORT,
    NEXT_PUBLIC_HOST: HOST,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_APP_ENV: APP_ENV,
    NEXT_PUBLIC_GIT_COMMIT: GIT_COMMIT,
    NEXT_PUBLIC_BACKEND_API: BACKEND_API,
  };

  return {
    env,
    generateBuildId: async () => {
      console.log('BUILD_ID', GIT_COMMIT);
      return GIT_COMMIT || '123456789';
    },
    // i18n: {
    //   locales: ['en', 'ko'],
    //   defaultLocale: 'en',
    // },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  };
};
