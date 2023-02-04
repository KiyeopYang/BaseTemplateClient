import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ScreenTitle from '../components/ScreenTitle';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Colors } from 'constants/theme';
import Text from '@mui/material/Typography';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Loader from 'components/Loader';
import ScreenBox from 'components/ScreenBox';
import Empty from 'components/Empty';
import { useLocalizationContext } from '../contexts/Localization';
import Link from 'next/link';
import RaffleItem from 'components/RaffleItem';
import { useRouter } from 'next/router';
import { StoreKey } from 'types';
import Image from 'components/Image';
import InfiniteScroll from 'components/InfiniteScroll';
import * as StaticUrls from 'constants/staticUrls';
import Onboarding from 'components/Onboarding';
import BottomDrawer from 'components/BottomMenuDrawer';
import { Filter as FilterIcon } from 'components/Icons';
import { useBaseContext } from 'contexts/base';
import { AlertTitle, ButtonBase } from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  [`& .${tabsClasses.scrollButtons}`]: {
    '&.Mui-disabled': { opacity: 0.3 },
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)({
  textTransform: 'none',
  color: Colors.primary['500'],
  padding: 0,
  minWidth: 'auto',
}) as typeof Tab;

const initialSort = 'twitterHighToLow';
export default function TodayRaffles(props: any) {
  const { t, locale } = useLocalizationContext();
  const isFetching = false;
  const [, confirmActions] = useConfirmContext();
  const { user } = useBaseContext();

  const [onboardingOn, setOnboardingOn] = useState(false);
  useEffect(() => {
    const alreadyOnboardingShown = window.localStorage.getItem(
      StoreKey.OnboardingShown
    );
    if (!alreadyOnboardingShown) {
      setOnboardingOn(true);
      window.localStorage.setItem(StoreKey.OnboardingShown, 'true');
    }
  }, []);

  const [currentBlockChainType, setCurrentBlockChainType] =
    useState<any>('all');
  const types: readonly any[] = ['all', 'eth', 'sol', 'bnb', 'klay'] as const;
  const router = useRouter();

  useEffect(() => {
    const { filter } = router.query;
    if (filter) setCurrentBlockChainType(filter as any);
    else setCurrentBlockChainType('all');
  }, [router]);

  const [sortOn, setSortOn] = useState(false);
  const toggleSort =
    (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setSortOn(open);
    };

  const currentSort: any | undefined = router.query.sort as any;

  return (
    <ScreenBox sx={styles.root}>
      <ScreenTitle
        sx={styles.topArea}
        isBeta
        onBetaClick={() => {
          setOnboardingOn(true);
        }}
        title={
          <ButtonBase
            onClick={() => {
              router.replace('/');
              window.scrollTo(0, 0);
            }}
            disableRipple
            disableTouchRipple
          >
            <Image
              width={'auto'}
              height={16}
              src={StaticUrls.LogoOnlyTitle}
              alt="logo"
            />
          </ButtonBase>
        }
        // title={t('list.title')}
        rightComponent={
          <Stack direction="row">
            <Link href={'/creator/onboarding'} passHref>
              <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: 12, textTransform: 'none' }}
              >
                {t('common.for_influencers')}
              </Button>
            </Link>

            {user ? (
              <Link href="/notifications">
                <IconButton sx={{ py: 0 }}>
                  <Badge badgeContent={0} color="secondary">
                    <NotificationsIcon
                      sx={{ fontSize: 24, color: Colors.primary['500'] }}
                    />
                  </Badge>
                </IconButton>
              </Link>
            ) : null}
          </Stack>
        }
      >
        <Box sx={styles.tabBar}>
          <StyledTabs
            sx={styles.topScroll}
            scrollButtons="auto"
            variant="scrollable"
            aria-label="scrollable auto tabs example"
            value={types.findIndex((type) => type === currentBlockChainType)}
            onChange={(e, i) => {
              if (i === 0) {
                const { filter, ...query } = router.query || {};
                router.replace({ pathname: '/', query });
              } else
                router.replace({
                  pathname: '/',
                  query: { ...router.query, filter: types[i] },
                });
            }}
          >
            {types.map((type, i) => (
              <StyledTab
                key={i}
                sx={i === 0 ? styles.firstTab : null}
                label={
                  <>
                    <Box
                      sx={{
                        ...(type === currentBlockChainType
                          ? {
                              ...styles.topButton,
                              ...styles.selectedTopButton,
                            }
                          : styles.topButton),
                        ...(i === 0 ? styles.topButtonFirst : null),
                        ...(type === 'original' ? styles.originalButton : null),
                        ...(['eth', 'sol', 'bnb', 'klay'].includes(type)
                          ? styles.blockChainButton
                          : null),
                      }}
                    >
                      {type === 'all' ? (
                        <Text sx={styles.allText}>
                          {t(('common.blockchain_' + type) as any)}
                        </Text>
                      ) : type === 'original' ? (
                        <Box sx={styles.originalIconWrapper}>
                          <Image
                            alt="icon"
                            src={StaticUrls.Logo}
                            width={20}
                            height={20}
                            style={styles.originalIcon}
                          />
                        </Box>
                      ) : (
                        <Image
                          src={StaticUrls.Blockchains[type]}
                          alt={type}
                          width={14}
                          height={14}
                        />
                      )}
                    </Box>
                  </>
                }
              />
            ))}
          </StyledTabs>
          <IconButton
            sx={styles.filterIcon}
            onClick={() => {
              setSortOn(true);
            }}
          >
            <FilterIcon size={30} />
          </IconButton>
        </Box>
      </ScreenTitle>

      <InfiniteScroll
        data={[]}
        sx={styles.listArea}
        renderItem={({ item }) => (
          <RaffleItem key={item.id} sx={styles.itemStyle} item={item} />
        )}
        ListHeaderComponent={
          locale === 'ko' ? (
            <Alert severity="error" variant="filled" sx={styles.notice}>
              <AlertTitle>Service is no longer available.</AlertTitle>
              If you are interested in the service, please contact us via email.
              <br />
              kiyeopyang@gmail.com
            </Alert>
          ) : (
            <Alert
              severity="info"
              variant="outlined"
              sx={styles.notice}
              icon={
                <Image
                  src={StaticUrls.Icons.Twitter}
                  width={24}
                  alt="twitter"
                />
              }
              role="button"
              onClick={() => {
                window.open(StaticUrls.SocialLinks.twitter, '_blank');
              }}
            >
              {t('common.notice')}
            </Alert>
          )
        }
        ListEmptyComponent={
          isFetching ? (
            <Loader height={100} />
          ) : (
            <Empty text={t('list.empty_message')} />
          )
        }
        // ListFooterComponent={
        //   currentBlockChainType === 'all' && !hasNextPage ? (
        //     <Box sx={styles.endTextContainer}>
        //       <Link href="/expired-raffles">
        //         <Text sx={styles.endText}>{t('list.link_expired')}</Text>
        //       </Link>
        //     </Box>
        //   ) : null
        // }
        // onEndReached={fetchNextPage}
        // hasNextPage={!isFetching && hasNextPage}
      />
      {onboardingOn ? (
        <Onboarding
          onFinish={() => {
            setOnboardingOn(false);
          }}
        />
      ) : null}

      <BottomDrawer
        open={sortOn}
        onClose={toggleSort(false)}
        onOpen={toggleSort(true)}
        title={t('projects.sort')}
        subTitle="인플루언서의 래플은 정렬과 관계없이 우선적으로 표시됩니다."
        items={[]}
        onSubmit={async (idx) => {}}
        submitText={t('common.apply')}
      />
    </ScreenBox>
  );
}

const styles = {
  root: { paddingTop: '50px' },
  topArea: {},
  topScroll: {
    flex: 1,
  },
  leftIcon: {
    width: '32px',
    height: '32px',
    marginRight: '16px',
  },
  topButton: {
    marginLeft: '5px',
    marginRight: '5px',
    borderRadius: '30px',
    borderWidth: '1px',
    borderColor: Colors.primary[500],
    borderStyle: 'solid',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '28px',
  },
  blockChainButton: {
    width: '28px',
  },
  originalButton: {
    paddingLeft: '6px',
  },
  allText: {
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: '14px',
    paddingRight: '14px',
  },
  topButtonFirst: {
    marginLeft: { sm: 0, xs: '24px' },
  },
  selectedTopButton: {
    color: '#ffffff',
    backgroundColor: Colors.primary[500],
  },
  topButtonSelected: {
    backgroundColor: Colors.primary[500],
  },
  topButtonText: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.primary[500],
  },
  topButtonTextSelected: {
    color: '#ffffff',
  },
  endTextContainer: {
    marginTop: '16px',
    textAlign: 'center',
  },
  listArea: {
    width: '100%',
    height: '100%',
    padding: '6px 24px 48px',
  },
  endText: {
    color: Colors.primary['500'],
    cursor: 'pointer',
  },
  loader: { marginTop: 48 },
  footer: {
    marginTop: 24,
  },
  itemStyle: {
    marginBottom: '8px',
  },
  originalIconWrapper: {
    alignItems: 'center',
    display: 'flex',
    marginRight: '2px',
  },
  originalIcon: {
    borderRadius: 20,
  },
  listHeader: {
    marginBottom: '8px',
  },
  filterButton: {
    borderRadius: '12px',
    textTransform: 'none',
  },
  filterIcon: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    background: Colors.primary['100'],
    ':hover, :active': {
      background: Colors.primary['100'],
    },
    width: '40px',
    height: '40px',
    borderRadius: '16px',
    display: 'flex',
    marginLeft: '8px',
    marginRight: '24px',
    marginBottom: '2px',
  },
  tabBar: {
    display: 'flex',
    alignItems: 'center',
  },
  firstTab: {
    marginLeft: { xs: '0px', sm: '24px' },
  },
  notice: {
    marginBottom: 1,
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px',
    // background: Colors.primary['100'],
    // borderColor: Colors.primary['500'],
  },
  socialIconsInNotice: {
    paddingTop: 1,
  },
};
