import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useQuery, useQueryClient } from 'react-query';
import { Colors } from 'constants/theme';
import { subscription as subscriptionApi } from 'apis';
import Text from '@mui/material/Typography';
import { useBaseContext } from '../contexts/base';
import { useLocalizationContext } from '../contexts/Localization';
import RaffleItem from './RaffleItem';
import { useEffect } from 'react';
import { User, Raffle } from 'types';
import { SxProps } from 'libs/sx';
import { useContext as useConfirmContext } from '../contexts/confirm';
import { useRouter } from 'next/router';

type Props = {
  item: Raffle;
  sx?: SxProps;
};

const GET_RAFFLE_NOTIFICATIONS = 'GET_RAFFLE_NOTIFICATIONS';
function RaffleItemWithSubscription({ item, sx }: Props) {
  const router = useRouter();
  const { user } = useBaseContext();
  const queryClient = useQueryClient();
  const { t } = useLocalizationContext();
  const [, confirmActions] = useConfirmContext();

  const queryKey = [GET_RAFFLE_NOTIFICATIONS, item.id];
  const { data, refetch, isLoading } = useQuery(
    queryKey,
    () =>
      user
        ? subscriptionApi.getSubscription({
            userId: user.id,
            raffleId: item.id,
          })
        : null,
    {
      enabled: Boolean(user?.id),
    }
  );

  useEffect(() => {
    refetch();
  }, [user]);

  const isSubscribed = Boolean(data?.data);

  return (
    <Box sx={{ ...styles.container, ...sx }}>
      <RaffleItem
        item={item}
        sx={styles.raffleItem}
        imageSx={styles.raffleItemImage}
      />
      <Button
        fullWidth
        variant="contained"
        disableRipple
        disableElevation
        sx={{
          ...styles.subButton,
          ...(isLoading ? styles.loading : styles.loaded),
          ...(isSubscribed ? styles.afterSub : styles.beforeSub),
        }}
        onClick={async () => {
          if (isSubscribed) {
            confirmActions
              .open(
                t('list-pre.noti_cancel_title'),
                t('list-pre.noti_cancel_body', {
                  name: item.name,
                }),
                [t('list-pre.noti_cancel_no'), t('list-pre.noti_cancel_yes')]
              )
              .then(async (answer) => {
                if (answer === t('list-pre.noti_cancel_yes')) {
                  queryClient.cancelQueries(queryKey);
                  queryClient.setQueryData(queryKey, { data: null });
                  if (user) {
                    await subscriptionApi.deleteSubscription({
                      userId: user.id,
                      raffleId: item.id,
                    });
                    queryClient.invalidateQueries(queryKey);
                  }
                }
              });
          } else {
            const subscribe = async (user: User) => {
              queryClient.cancelQueries(queryKey);
              queryClient.setQueryData(queryKey, {
                data: { item: item.id },
              });
              if (user) {
                await subscriptionApi.createSubscription({
                  userId: user?.id,
                  raffleId: item.id,
                });
              }
              queryClient.invalidateQueries(queryKey);
            };
            if (user) {
              await subscribe(user);
            } else {
              router.push('/login?next=' + router.pathname);
            }
          }
        }}
      >
        <Text style={isSubscribed ? styles.notiAfter : styles.notiBefore}>
          {isLoading
            ? ''
            : isSubscribed
            ? t('list-pre.noti_after')
            : t('list-pre.noti_before')}
        </Text>
      </Button>
    </Box>
  );
}

const styles = {
  container: {
    borderWidth: '1px',
    borderRadius: '16px',
    borderColor: Colors.grey[200],
    borderStyle: 'solid',
  },
  loading: {
    display: 'none',
  },
  loaded: {
    display: 'flex',
  },
  beforeSub: {},
  notiBefore: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  afterSub: {
    backgroundColor: Colors.primary['100'],
    color: Colors.primary['500'],
    ':hover, :focus': {
      backgroundColor: Colors.primary['200'],
    },
  },
  notiAfter: {
    color: Colors.primary[500],
    fontWeight: '600',
    fontSize: 16,
  },
  subButton: {
    flex: 1,
    textTransform: 'none',
    height: '58px',
    borderColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: '0px',
  },
  raffleItem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
  },
  raffleItemImage: {
    borderBottomLeftRadius: 0,
  },
};
export default RaffleItemWithSubscription;
