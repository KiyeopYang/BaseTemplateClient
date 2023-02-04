import { KeyboardEvent, MouseEvent, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { raffleEntries as raffleEntriesApi } from 'apis';
import { Raffle } from 'types';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { ScreenWidth, ScreenMargin } from 'constants/styles';
import { useLocalizationContext } from 'contexts/Localization';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBaseContext } from 'contexts/base';

type Props = {
  open: boolean;
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  onOpen: (e: KeyboardEvent | MouseEvent) => void;
  title: string;
  onSuccess: () => void;
};
const CODE = 'code9';
const RaffleInfluencerEnter = (props: Props) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { t } = useLocalizationContext();
  const { user } = useBaseContext();
  const [twitterName, setTwitterName] = useState('');
  const [discordName, setDiscordName] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const twitter = user?.twitter?.twitterUsername || null;
    if (twitter) {
      setTwitterName(twitter);
    }
  }, [user]);

  useEffect(() => {
    if (props.open) {
      const code = window.localStorage.getItem('CODE_ENTER');
      if (code === CODE) {
        props.onSuccess();
      }
    }
  }, [props.open]);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{
        sx: styles.drawer,
      }}
      sx={{ zIndex: 10000000 }}
    >
      <Box sx={styles.root} role="presentation">
        <Text sx={styles.title}>{t('common.enter_code')}</Text>
        <Text sx={{ fontSize: 14 }}>{t('common.only_code')}</Text>
        <Stack sx={styles.listItems}>
          {/* <TextField
            margin="dense"
            label={t('common.twitter_account')}
            value={twitterName}
            onChange={(e) => {
              setTwitterName(e.target.value);
            }}
            placeholder="ex) get_raffle"
            fullWidth
            variant="outlined"
            disabled={props.disabled}
          /> */}

          <TextField
            margin="dense"
            label={t('common.enter_code')}
            value={discordName}
            onChange={(e) => {
              setDiscordName(e.target.value.toLowerCase());
            }}
            fullWidth
            variant="outlined"
          />
          <a
            href={`mailto:company@getraffle.io?subject=${t(
              'common.request_code'
            )}&body=[${t('common.request_code_form')}]%0D%0A%0D%0A${t(
              'common.request_code_form_twitter'
            )} : %0D%0A`}
          >
            <Text
              sx={{
                fontSize: 14,
                // fontWeight: 'bold',
                color: Colors.primary[500],
              }}
              role="button"
            >
              {t('common.request_code')}
            </Text>
          </a>
        </Stack>
      </Box>
      <Stack sx={styles.confirmWrapper}>
        <LoadingButton
          sx={styles.confirm}
          fullWidth
          variant="contained"
          disableElevation
          disableRipple
          loading={loading}
          onClick={async () => {
            if (discordName === CODE) {
              window.localStorage.setItem('CODE_ENTER', CODE);
              props.onSuccess();
            } else {
              alert('올바른 가입 코드가 아닙니다.');
            }
          }}
        >
          확인
        </LoadingButton>
      </Stack>
    </SwipeableDrawer>
  );
};
const styles = {
  root: {
    width: 'auto',
    padding: '24px',
    zIndex: 100000000,
  },
  drawer: {
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    maxWidth: ScreenWidth,
    overflow: 'hidden',
    margin: ScreenMargin,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  listItems: {
    marginTop: '20px',
  },
  button: {
    borderRadius: '20px',
    backgroundColor: Colors.primary['100'],
    color: Colors.primary['500'],
    padding: '10px 10px',
    textTransform: 'none',
    whiteSpace: 'pre',
    ':hover': {
      backgroundColor: Colors.primary['500'],
      color: 'white',
    },
  },
  selectedButton: {
    backgroundColor: Colors.primary['500'],
    color: 'white',
  },
  confirmWrapper: {
    paddingTop: '10px',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: Colors.grey['300'],
  },
  confirm: {
    padding: '18px',
    borderRadius: '16px',
  },
};
export default RaffleInfluencerEnter;
