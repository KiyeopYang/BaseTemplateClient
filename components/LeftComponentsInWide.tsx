import { useMemo, useState, useEffect } from 'react';
import Text from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import Button from '@mui/material/Button';
import Image from './Image';
import * as StaticUrls from 'constants/staticUrls';
import { SxProps, toArray } from 'libs/sx';
import { useLocalizationContext } from 'contexts/Localization';
import { Colors } from 'constants/theme';
import { RepresentativeEmail, TermUrl, PrivacyUrl } from 'constants/cs';
import Link from 'next/link';
import ReactTextTransition, { presets } from 'react-text-transition';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const methodsKo = ['진행', '참여'];

type Props = {
  sx: SxProps;
};
const LeftComponentsInWide = ({ sx }: Props) => {
  const [methodIdx, setMethodIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMethodIdx((v) => (v + 1) % methodsKo.length);
    }, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { t, locale } = useLocalizationContext();

  return (
    <Box sx={[styles.root, ...toArray(sx)]}>
      <NoSsr>
        {locale === 'ko' ? (
          <Text sx={styles.title}>
            <Text sx={styles.strong}>
              가장 쉽게
              <br />
              NFT 래플 이벤트
            </Text>
            를<br />
            <section className="inline">
              <ReactTextTransition springConfig={presets.gentle} inline>
                {methodsKo[methodIdx]}
              </ReactTextTransition>
              해보세요.
            </section>
          </Text>
        ) : (
          <Text sx={styles.title}>
            <Text sx={styles.strong}>365 / 24</Text>
            <br />
            Always on
          </Text>
        )}
      </NoSsr>
      <Box sx={styles.raffles}>
        <a>
          <Chip
            color="secondary"
            sx={[styles.raffleButton, { visibility: 'hidden' }]}
            avatar={<Avatar src={'/images/pet-1.png'} />}
            label={''}
          />
        </a>
      </Box>
      {/* <Box sx={styles.metrics}>
        <Stack direction="row" justifyContent="flex-start">
          <Stack sx={{ flex: 1 }} spacing={2}>
            <Stack>
              <Text sx={styles.introPageLabel}>래플 신청 수</Text>
              <Box sx={styles.introPageValue}>
                <CountUp end={metrics?.raffleParticipations || 0} />+
              </Box>
            </Stack>
            <Stack>
              <Text sx={styles.introPageLabel}>가입자 수</Text>
              <Box sx={styles.introPageValue}>
                <CountUp end={metrics?.members || 0} />+
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ flex: 1 }} spacing={2}>
            <Stack>
              <Text sx={styles.introPageLabel}>래플 수</Text>
              <Box sx={styles.introPageValue}>
                <CountUp end={metrics?.raffles || 0} />+
              </Box>
            </Stack>
            <Stack>
              <Text sx={styles.introPageLabel}>프로젝트 수</Text>
              <Box sx={styles.introPageValue}>
                <CountUp end={metrics?.raffles || 0} />+
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box> */}
      <Box>
        {/* <Button
          sx={styles.storeButton}
          variant="contained"
          disableRipple
          disableElevation
          onClick={() => {
            alert('Not available at this time.');
          }}
          startIcon={
            <Image
              width={24}
              height={24}
              src={StaticUrls.Icons.Apple}
              alt="appstore"
              css={styles.storeButtonImg}
            />
          }
        >
          App Store
        </Button>
        <Button
          sx={styles.storeButton}
          variant="contained"
          disableRipple
          disableElevation
          onClick={() => {
            alert('Not available at this time.');
          }}
          startIcon={
            <Image
              width={20}
              height={22}
              src={StaticUrls.Icons.PlayStore}
              alt="playstore"
              css={styles.storeButtonImg}
            />
          }
        >
          Google Play
        </Button> */}
      </Box>
      <Box sx={styles.bottomBtns}>
        <a href={`mailto:${RepresentativeEmail}`}>
          <Button sx={styles.bottomBtn} disableRipple disableElevation>
            Contact
          </Button>
        </a>
        <Box sx={styles.divider} />
        <Button
          sx={styles.bottomBtn}
          disableRipple
          disableElevation
          onClick={() => {
            window.open(TermUrl, '_blank');
          }}
        >
          Rule
        </Button>
        <Box sx={styles.divider} />
        <Button
          sx={styles.bottomBtn}
          disableRipple
          disableElevation
          onClick={() => {
            window.open(PrivacyUrl, '_blank');
          }}
        >
          Privacy
        </Button>
      </Box>
    </Box>
  );
};
const styles = {
  root: {},
  strong: {
    color: 'white',
    fontSize: 48,
    fontWeight: '600',
    display: 'inline-block',
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: '400',
  },
  raffles: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '400px',
    marginTop: 2,
    marginBottom: 12,
  },
  raffleButton: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: '100px',
    marginRight: 2,
    marginBottom: 1.5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.9,
    },
  },
  storeButton: {
    cursor: 'not-allowed',
    marginRight: '15px',
    padding: '8px 20px',
    textTransform: 'none',
    borderRadius: '4px',
    background: Colors.grey['200'],
    color: Colors.grey['500'],
    fontSize: 14,
    '&:hover, &:active': { background: Colors.grey['200'] },
  },
  storeButtonImg: {
    opacity: 0.5,
  },
  bottomBtns: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    textTransform: 'none',
    color: 'white',
  },
  divider: {
    height: '11px',
    width: '3px',
    background: Colors.primary['500'],
    marginLeft: 0.5,
    marginRight: 0.5,
  },
  metrics: {},
  introPageLabel: {
    fontWeight: '700',
    color: 'white',
    fontSize: 26,
  },
  introPageValue: {
    color: 'white',
    fontSize: 24,
  },
};
export default LeftComponentsInWide;
