import { SxProps, toArray } from 'libs/sx';
import Button from '@mui/material/Button';
import { Colors } from 'constants/theme';
import * as StaticUrls from 'constants/staticUrls';

const Twitter = StaticUrls.Icons.Twitter;
const Discord = StaticUrls.Icons.Discord;
const Opensea = StaticUrls.Icons.Opensea;
const Magiceden = StaticUrls.Icons.Magiceden;
const Telegram = StaticUrls.Icons.Telegram;
const Instagram = StaticUrls.Icons.Instagram;
const Youtube = StaticUrls.Icons.Youtube;
const Kakao = StaticUrls.Icons.Kakao;
const Facebook = StaticUrls.Icons.Facebook;
const Blog = StaticUrls.Icons.Blog;
const Link = StaticUrls.Icons.Link;
type Props = {
  label: string;
  value?: string | null;
  sx?: SxProps;
};
const SocialLink = (props: Props) => {
  const label = props.label.toLowerCase();
  return (
    <Button
      onClick={async () => {
        if (typeof props.value === 'string') {
          window.open(props.value);
        }
      }}
      sx={[styles.button, ...toArray(props.sx)]}
      disableElevation
      disableRipple
    >
      {label === 'twitter' ? (
        <img css={styles.icon} src={Twitter} alt={Twitter} />
      ) : label === 'discord' ? (
        <img css={styles.icon} src={Discord} alt={Discord} />
      ) : label === 'opensea' ? (
        <img css={styles.icon} src={Opensea} alt={Opensea} />
      ) : label === 'magiceden' ? (
        <img css={styles.icon} src={Magiceden} alt={Magiceden} />
      ) : label === 'telegram' ? (
        <img css={styles.icon} src={Telegram} alt={Telegram} />
      ) : label === 'instagram' ? (
        <img css={styles.icon} src={Instagram} alt={Instagram} />
      ) : label === 'youtube' ? (
        <img css={styles.icon} src={Youtube} alt={Youtube} />
      ) : label === 'kakao' ? (
        <img css={styles.icon} src={Kakao} alt={Kakao} />
      ) : label === 'facebook' ? (
        <img css={styles.icon} src={Facebook} alt={Facebook} />
      ) : label === 'blog' ? (
        <img css={styles.icon} src={Blog} alt={Blog} />
      ) : null}
      {props.label}
    </Button>
  );
};
const styles = {
  button: {
    textTransform: 'capitalize',
    fontSize: 11,
    padding: '4px 10px',
    backgroundColor: Colors.primary['100'],
    borderRadius: '6px',
    borderColor: Colors.primary['500'],
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.primary['500'],
  },
  blogButton: {
    padding: '4px 6px',
  },
  icon: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
};
export default SocialLink;
