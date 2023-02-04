//FIXME : 정적 호스팅 서버 확인해서 변경 필요
const StaticHost = '';
const ResourceHost = `${StaticHost}`;

export const Empty = `${ResourceHost}/images/empty.png`;

export const Logo = {
  MainLogo: '/logo.png',
  LogoWithTitle: '/logo_with_title.png',
  Cover: '/cover.png',
};

export const Menu = {
  IconHome: '/images/icons/menu/iconMenuHome.png',
  IconGallery: '/images/icons/menu/iconMenuGallery.png',
  IconMessage: '/images/icons/menu/iconMenuMessage.png',
  IconProfile: '/images/icons/menu/iconMenuProfile.png',
  IconHomeActive: '/images/icons/menu/iconMenuHomeActive.png',
  IconGalleryActive: '/images/icons/menu/iconMenuGalleryActive.png',
  IconMessageActive: '/images/icons/menu/iconMenuMessageActive.png',
  IconProfileActive: '/images/icons/menu/iconMenuProfileActive.png',
};

// https://static.getraffle.io/terms/index.html
export const TERM_URL = `${StaticHost}/terms/index.html`;
// https://static.getraffle.io/privacy/index.html
export const PRIVACY_URL = `${StaticHost}/privacy/index.html`;

export const Icons = {
  Apple: `${ResourceHost}/icons/icon-apple.png`,
  PlayStore: `${ResourceHost}/icons/icon-playstore.png`,
  Discord: `${ResourceHost}/icons/icon-discord.png`,
  Google: `${ResourceHost}/icons/icon-google.png`,
  Twitter: `${ResourceHost}/icons/icon-twitter.png`,
  Telegram: `${ResourceHost}/icons/icon-telegram.png`,
  Instagram: `${ResourceHost}/icons/icon-instagram.png`,
  Youtube: `${ResourceHost}/icons/icon-youtube.png`,
  Opensea: `${ResourceHost}/icons/icon-opensea.png`,
  Magiceden: `${ResourceHost}/icons/icon-magiceden.png`,
  Kakao: `${ResourceHost}/icons/icon-kakao.png`,
  Facebook: `${ResourceHost}/icons/icon-facebook.png`,
  Blog: `${ResourceHost}/icons/icon-blog.png`,
  Link: `${ResourceHost}/icons/icon-link.png`,
};
export const Intro1 = `${ResourceHost}/i1.png`;
export const Intro2 = `${ResourceHost}/i2.png`;
export const Intro3 = `${ResourceHost}/i3.png`;

export const Intros = [Intro1, Intro2, Intro3];

export const LogoWhite = `${ResourceHost}/logoWhite.png`;
export const LogoWithTitle = `${ResourceHost}/logoWithTitle.png`;
export const LogoWithTitleWhite = `${ResourceHost}/logoWithTitleWhite.png`;
export const LogoOnlyTitle = `${ResourceHost}/logoOnlyTitle.png`;
export const LogoWithTitle100To191 = `${ResourceHost}/logoWithTitle100to191.png`;
export const Favicon = `${ResourceHost}/favicon.ico`;
export const DefaultProfile = `${ResourceHost}/images/defaultProfile.png`;

export const Blockchains = {
  eth: `${ResourceHost}/icons/chains/blockchain_eth.png`,
  sol: `${ResourceHost}/icons/chains/blockchain_sol.png`,
  klay: `${ResourceHost}/icons/chains/blockchain_klay.png`,
  bnb: `${ResourceHost}/icons/chains/blockchain_bnb.png`,
};
export const Background = `${ResourceHost}/images/background.png`;

export const SocialLinks = {
  twitter: 'https://twitter.com/get_raffle',
  telegram: `https://t.me/raffle_io`,
};
