import { KeyboardEvent, MouseEvent, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  raffleEntries as raffleEntriesApi,
  profile as profileApi,
  walletAddresses as walletAddressesApi,
} from 'apis';
import { Raffle, StoreKey, AdditionalForm } from 'types';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { ScreenWidth, ScreenMargin } from 'constants/styles';
import { useLocalizationContext } from 'contexts/Localization';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBaseContext } from 'contexts/base';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSnackbar } from 'notistack';

interface WalletOptionType {
  inputValue?: string;
  walletAddress: string;
}
const filter = createFilterOptions<WalletOptionType>();

type Props = {
  open: boolean;
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  onOpen: (e: KeyboardEvent | MouseEvent) => void;
  title: string;
  onSubmit: () => Promise<{ isSuccess: boolean }>;
  raffle: Raffle | null;
  disabled?: boolean;
};
const RaffleParticipationDrawer = (props: Props) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { t } = useLocalizationContext();
  const { user } = useBaseContext();
  const { data: profile } = profileApi.useGet();
  const [, confirmActions] = useConfirmContext();
  const { enqueueSnackbar } = useSnackbar();

  const [twitterName, setTwitterName] = useState('');
  const [discordName, setDiscordName] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const [additionalForms, setAdditionalForms] = useState<
    AdditionalForm[] | null
  >(null);

  useEffect(() => {
    if (props.raffle && props.raffle.additionalForms?.list) {
      setAdditionalForms(
        props.raffle.additionalForms.list.map((o) => ({ ...o, value: '' }))
      );
    }
  }, [props.raffle]);

  const { data: walletAddressesRes, refetch } = walletAddressesApi.useGetList();
  const walletAddresses =
    walletAddressesRes?.map(({ walletAddress }) => ({ walletAddress })) || [];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const twitter = user?.twitter?.twitterUsername || null;
    if (twitter) {
      setTwitterName(twitter);
    }
  }, [user]);
  const saveSocials = async () => {
    const stringData = JSON.stringify({
      twitterName,
      discordName,
      telegramName,
      walletAddress,
    });
    if (user) {
      await profileApi.updateProfile({
        twitterName,
        discordName,
        telegramName,
        walletAddress,
      });
      await walletAddressesApi.upsertWalletAddress(walletAddress);
    }
    refetch();
    window.localStorage.setItem(StoreKey.ParticipationData, stringData);
  };
  const getSocials = () => {
    const data = window.localStorage.getItem(StoreKey.ParticipationData);
    if (data) {
      return JSON.parse(data) as {
        twitterName: string;
        discordName: string;
        telegramName: string;
        walletAddress: string;
      };
    }
    return null;
  };
  useEffect(() => {
    if (user && profile) {
      let twitterName = user?.twitter?.twitterUsername || '';
      let discordName;
      let telegramName;
      let walletAddress;

      twitterName = profile?.twitterName || '';
      discordName = profile?.discordName || '';
      telegramName = profile?.telegramName || '';
      walletAddress = profile?.walletAddress || '';

      if (!twitterName && !discordName && !telegramName && !walletAddress) {
        const data = getSocials();
        if (data) {
          twitterName = data.twitterName || '';
          discordName = data.discordName || '';
          telegramName = data.telegramName || '';
          walletAddress = data.walletAddress || '';
        }
      }

      // setTwitterName(twitterName);
      setDiscordName(discordName);
      setTelegramName(telegramName);
      setWalletAddress(walletAddress);
    }
  }, [profile, user]);
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
    >
      <Box sx={styles.root} role="presentation">
        <Text sx={styles.title}>{props.title}</Text>
        <Text sx={[styles.title, { fontSize: 14 }]}>{t('detail.enter')}</Text>
        <Stack sx={styles.listItems}>
          <Autocomplete
            value={walletAddress}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setWalletAddress(newValue);
                // @ts-ignore
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                // @ts-ignore
                setWalletAddress(newValue.inputValue);
              } else {
                // @ts-ignore
                setWalletAddress(newValue?.walletAddress);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.walletAddress
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  walletAddress: `${t('detail.add_wallet')} "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={walletAddresses}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              // eslint-disable-next-line
              // @ts-ignore
              if (option.inputValue) {
                // @ts-ignore
                return option.inputValue;
              }
              // Regular option
              return option.walletAddress;
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.walletAddress}</li>
            )}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${t('common.wallet_address')}${
                  props.raffle?.walletType ? `(${props.raffle.walletType})` : ''
                }`}
                margin="dense"
                fullWidth
                variant="outlined"
                disabled={props.disabled}
              />
            )}
          />
          {props.raffle?.getTwitterName && (
            <TextField
              margin="dense"
              label={t('common.twitter_account')}
              value={twitterName}
              InputProps={{ startAdornment: <Text>@</Text> }}
              onChange={(e) => {
                setTwitterName(e.target.value);
              }}
              placeholder="  ex) @get_raffle"
              fullWidth
              variant="outlined"
              disabled={Boolean(props.disabled || user?.twitter)}
            />
          )}

          {props.raffle?.getDiscordName && (
            <TextField
              margin="dense"
              label={t('common.discord_account')}
              value={discordName}
              onChange={(e) => {
                setDiscordName(e.target.value);
              }}
              // placeholder="ex) get_raffle"
              placeholder="ex) get_raffle#2570"
              fullWidth
              variant="outlined"
              disabled={props.disabled}
            />
          )}
          {props.raffle?.getTelegramName && (
            <TextField
              margin="dense"
              label={t('common.telegram_account')}
              value={telegramName}
              onChange={(e) => {
                setTelegramName(e.target.value);
              }}
              // placeholder="ex) get_raffle"
              placeholder="ex) get_raffle"
              fullWidth
              variant="outlined"
              disabled={props.disabled}
            />
          )}
          {additionalForms
            ? additionalForms.map((form, i) => (
                <TextField
                  key={form.label}
                  margin="dense"
                  label={form.label}
                  value={form.value}
                  onChange={(e) => {
                    const newForms = additionalForms.slice();
                    newForms[i] = {
                      ...form,
                      value: e.target.value,
                    };
                    setAdditionalForms(newForms);
                  }}
                  fullWidth
                  variant="outlined"
                  disabled={props.disabled}
                />
              ))
            : null}
          <Typography fontSize={13}>{t('detail.again')}</Typography>
          {props.raffle?.submitDescription ? (
            <Text
              sx={[
                styles.title,
                { fontSize: 14, color: Colors.secondary[500] },
              ]}
            >
              {props.raffle?.submitDescription}
            </Text>
          ) : null}
        </Stack>
      </Box>
      <Box sx={styles.confirmWrapper}>
        <LoadingButton
          sx={styles.confirm}
          fullWidth
          variant="contained"
          disableElevation
          disableRipple
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              if (props.raffle?.id) {
                if (props.raffle?.getWalletAddress && !walletAddress) {
                  enqueueSnackbar(t('detail.no_wallet'), { variant: 'error' });
                  return;
                } else if (props.raffle?.showGetTwitterName && !twitterName) {
                  enqueueSnackbar(t('detail.no_twitter'), { variant: 'error' });
                  return;
                } else if (props.raffle?.getDiscordName && !discordName) {
                  enqueueSnackbar(t('detail.no_discord_account'), {
                    variant: 'error',
                  });
                  return;
                } else if (props.raffle?.getTelegramName && !telegramName) {
                  enqueueSnackbar(t('detail.no_telegram'), {
                    variant: 'error',
                  });
                  return;
                }
                const already = await raffleEntriesApi.getRaffleEntry({
                  raffleId: props.raffle.id,
                  discordName,
                  walletAddress,
                  twitterName,
                  telegramName,
                });
                if (already) {
                  enqueueSnackbar(t('detail.already_participated'), {
                    variant: 'warning',
                  });
                } else {
                  await saveSocials();
                  const { isSuccess } = await props.onSubmit();

                  if (isSuccess) {
                    await raffleEntriesApi.participateToEntry({
                      raffleId: props.raffle.id,
                      discordName,
                      telegramName,
                      twitterName,
                      walletAddress,
                      additionalForms: additionalForms
                        ? {
                            list: additionalForms,
                          }
                        : null,
                    });
                    if (!user) {
                      confirmActions
                        .open(
                          t('detail.would_again'),
                          t('detail.signup_again'),
                          [
                            t('list-pre.noti_cancel_no'),
                            t('list-pre.noti_cancel_yes'),
                          ]
                        )

                        .then(async (answer) => {
                          if (answer === t('list-pre.noti_cancel_yes')) {
                            saveSocials();
                            router.push(`/login`);
                          }
                        });
                    }
                  }
                }
              } else {
                enqueueSnackbar(t('detail.no_raffle'), { variant: 'error' });
              }
            } catch (e) {
              console.error(e);
            } finally {
              setLoading(false);
            }
          }}
        >
          {t('detail.cta')}
        </LoadingButton>
      </Box>
    </SwipeableDrawer>
  );
};
const styles = {
  root: {
    width: 'auto',
    padding: '24px',
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
    textTransform: 'none',
  },
};
export default RaffleParticipationDrawer;
