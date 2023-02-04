import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from 'components/Image';
import Text from '@mui/material/Typography';
import * as StaticUrls from 'constants/staticUrls';
import { useLocalizationContext } from 'contexts/Localization';
import { Colors } from 'constants/theme';
import { ScreenWidth, ScreenMargin } from 'constants/styles';
import * as DocumentIds from 'constants/elementIds';
import BottomFixedWrapper from './BottomFixedWrapper';
import CtaButton from './CtaButton';

type Props = {
  onFinish: () => void;
};
const Onboarding = (props: Props) => {
  const { t, locale } = useLocalizationContext();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const ele = document.getElementById(
      DocumentIds.THEME_COLOR
    ) as HTMLMetaElement | null;
    document.body.style.overflowY = 'hidden';
    const position = document.body.style?.position;
    document.body.style.position = 'fixed';
    document.body.style.left = '0px';
    document.body.style.right = '0px';

    if (ele) {
      ele.content = idx > 0 ? 'white' : Colors.primary['500'];
    }

    return () => {
      if (ele) {
        ele.content = '#fff';
      }
      document.body.style.overflowY = 'scroll';
      document.body.style.position = position || 'static';
      document.body.style.left = 'auto';
      document.body.style.right = 'auto';
    };
  }, [idx]);
  return (
    <Stack
      sx={[styles.root, idx > 0 ? { background: 'white' } : null]}
      direction="column"
      alignItems="center"
    >
      {idx === 0 ? (
        <>
          <Box sx={styles.introWrapper}>
            <Text
              sx={{
                ...styles.intro1,

                fontWeight: locale === 'en' ? '400' : '700',
              }}
            >
              {t('intro.intro_1')}
            </Text>
            <Text
              sx={{
                ...styles.intro2,
                fontWeight: locale === 'en' ? '700' : '400',
              }}
            >
              {t('intro.intro_2')}
            </Text>
          </Box>
          <Box sx={styles.imgWrapper}>
            <Image
              src={StaticUrls.LogoWhite}
              width={180}
              height={180}
              alt="logo"
            />
          </Box>
        </>
      ) : (
        <>
          <Box sx={styles.introNextWrapper}>
            <Image
              src={StaticUrls.Intros[idx - 1]}
              width={320}
              height={320}
              alt={`intro${idx}`}
            />
            <Text sx={styles.textWrapper}>{t(`intro.intro${idx}` as any)}</Text>
          </Box>
        </>
      )}
      <BottomFixedWrapper sx={idx === 0 ? styles.bottomWrapper : {}}>
        <CtaButton
          onClick={() => {
            if (idx === 3) {
              props.onFinish();
            } else {
              setIdx(idx + 1);
            }
          }}
          sx={[idx === 0 && styles.ctaButton]}
        >
          {t(idx === 3 ? 'intro.start_raffle' : 'intro.next')}
        </CtaButton>
      </BottomFixedWrapper>
    </Stack>
  );
};
const styles = {
  root: {
    position: 'fixed',
    zIndex: 100000,
    background: Colors.primary['500'],
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: ScreenWidth,
    margin: ScreenMargin,
    borderLeftWidth: { xs: 0, sm: 1 },
    borderLeftStyle: 'solid',
    borderLeftColor: Colors.grey['300'],
    borderRightWidth: { xs: 0, sm: 1 },
    borderRightStyle: 'solid',
    borderRightColor: Colors.grey['300'],
  },
  bottomWrapper: {
    background: 'transparent',
    border: 'transparent',
  },
  ctaButton: {
    padding: '16px 18px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: '1px solid',
    lineHeight: 1.5,
    color: Colors.primary['500'],
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: '16px',
    ':hover, :active': {
      background: Colors.grey['200'],
    },
  },
  img: {
    marginTop: '255px',
  },
  intro1: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
  },
  intro2: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
  },
  introWrapper: {
    top: '150px',
    position: 'absolute',
    textAlign: 'center',
  },
  introNextWrapper: {
    top: 0,
    paddingTop: '50px',
    bottom: 0,
    position: 'absolute',
    textAlign: 'center',
  },
  imgWrapper: {
    bottom: '146px',
    position: 'absolute',
  },
  textWrapper: {
    marginTop: '50px',
    fontSize: 24,
    fontWeight: '700',
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
};
export default Onboarding;
