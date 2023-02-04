import { Colors } from 'constants/theme';
import comma from 'libs/comma';
import dayjs from 'dayjs';
import { useLocalizationContext } from 'contexts/Localization';
import { Raffle, Reward, SocialMetrics, BlockChain, Project } from 'types';
import Link from 'next/link';
import Image from 'components/Image';
import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import SocialMetricsComponent from './SocialMetrics';
import * as StaticUrls from 'constants/staticUrls';
import { SxProps, toArray } from 'libs/sx';
import { raffleParticipations as raffleParticipationsApi } from 'apis';
import CheckIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AvatarProfile from 'components/AvatarProfile';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
type Props = {
  item: Raffle;
  sx?: SxProps;
  href?: string;
  imageSx?: SxProps;
};
function RaffleItem({ item, href, sx, imageSx }: Props) {
  const { t } = useLocalizationContext();

  const { data: raffleParticipation } =
    raffleParticipationsApi.useRaffleParticipation({
      raffleId: item.id,
    });
  const blockchain =
    typeof item.project === 'object' && item.project?.blockchain;
  const getRewardText = (reward: Reward) => {
    const text = t(('common.reward_' + reward.type) as any);
    const value =
      typeof reward.value === 'number' ? comma(reward.value) : reward.value;
    return `${text}${value ? ` ${value}` : ''}`;
  };
  const rewards = item.rewards?.values;
  const project: Project = typeof item.project !== 'number' && item.project;
  return (
    <Link href={href || `/raffle/${item.id}`} passHref>
      <Box
        sx={
          project.partner
            ? {
                // background: 'red',
              }
            : {}
        }
      >
        {project.partner ? (
          <Box>
            <Text sx={{ color: Colors.primary['500'] }}>
              😊Official Partner
            </Text>
            {/* <Chip avatar={<Box>😊</Box>} label="Featured" variant="outlined" /> */}
          </Box>
        ) : null}
        <Box
          sx={[
            styles.listItem,
            project.partner
              ? {
                  border: `2px solid ${Colors.primary['400']}`,
                }
              : null,
            ...toArray(sx),
          ]}
        >
          <Box sx={[styles.itemImageArea, ...toArray(imageSx)]}>
            {blockchain &&
            ['eth', 'sol', 'bnb', 'klay'].includes(blockchain) ? (
              <Box sx={[styles.chainImg]}>
                <Image
                  src={StaticUrls.Blockchains[blockchain as BlockChain]}
                  alt={blockchain}
                  width={14}
                  height={14}
                />
              </Box>
            ) : null}

            <Image
              src={item.thumbnail}
              layout="fill"
              objectFit="cover"
              alt={item.thumbnail}
            />
          </Box>
          <Box sx={styles.itemDescArea}>
            <Box sx={styles.topContent}>
              {typeof item.project !== 'number' && item.project ? (
                <Box sx={styles.projectNameBox}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ overflow: 'hidden', width: '100%' }}
                  >
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                      sx={{ overflow: 'hidden', width: '100%' }}
                    >
                      <AvatarProfile name={item.project.name || ''} />
                      {/* {item.influencer ? (
                        <>
                          <ClearRoundedIcon
                            sx={{ width: '10px', height: '10px' }}
                          />
                          <AvatarProfile name={item.influencer.name || ''} />
                        </>
                      ) : null} */}
                    </Stack>
                    {raffleParticipation ? (
                      <CheckIcon sx={styles.checkIcon} />
                    ) : null}
                  </Stack>
                </Box>
              ) : null}

              <Text sx={styles.descName}>{item.name?.trim()}</Text>

              <Box sx={{ mt: 0.5, mb: 0.5 }}>
                {item.influencer && item.influencer.id !== 1 ? (
                  <AvatarProfile
                    avatar={item.influencer.thumbnail}
                    name={item.influencer.name || ''}
                  />
                ) : null}
              </Box>

              {typeof item?.project === 'object' ? (
                <SocialMetricsComponent
                  sx={styles.socialMetrics}
                  socialMetrics={{
                    twitterFollowers: item.project?.twitterFollowers,
                    discordMembers: item.project?.discordMembers,
                  }}
                  socialMetricsChanges={{
                    twitterFollowers: item.project?.twitterFollowersChange,
                    discordMembers: item.project?.discordMembersChange,
                  }}
                />
              ) : null}
              <Text sx={styles.descTime}>
                {dayjs(item.openDatetime).format('MM-DD HH:mm')}
                {` ~ `}
                {item.closeDatetime
                  ? dayjs(item.closeDatetime).format('MM-DD HH:mm')
                  : ''}
              </Text>
            </Box>
            {/* <Text style={styles.descTimeAlert}>48분 남았습니다.</Text> */}
            <Box sx={styles.bottomContent}>
              {rewards && rewards.length > 0 ? (
                <>
                  <Box sx={styles.descRewardArea}>
                    {rewards.slice(0, 1).map((reward, index) => (
                      <Box sx={styles.rewardArea} key={index}>
                        <Text sx={styles.rewardText}>
                          {getRewardText(reward)}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                  {rewards.length > 1 ? (
                    <Box sx={styles.moreReward}>+{rewards.length - 1}</Box>
                  ) : null}
                </>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

const styles = {
  listItem: {
    height: '160px',
    minWidth: '300px',
    width: '100%',
    borderWidth: '1px',
    borderRadius: '16px',
    borderColor: Colors.grey[200],
    overflow: 'hidden',
    flexDirection: 'row',
    display: 'flex',
    borderStyle: 'solid',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey['100'],
    },
  },
  itemImageArea: {
    borderRightWidth: '1px',
    borderRightColor: Colors.grey[200],
    borderRightStyle: 'solid',
    overflow: 'hidden',
    borderRadius: '14px 0px 0px 14px',

    width: '160px',
    height: '160px',
    minWidth: '160px',
    position: 'relative',
  },
  itemDescArea: {
    flex: 1,
    minWidth: '160px',
    padding: '10px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  original: {
    display: 'flex',
  },
  topContent: {},
  bottomContent: {
    display: 'flex',
  },
  descBlockchain: {
    flex: 1,
    color: '#666666',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'right',
  },
  projectNameBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mb: 0.4,
  },
  projectName: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    width: 20,
    marginLeft: '4px',
    color: Colors.primary[500],
  },
  descName: {
    fontWeight: '700',
    maxWidth: 200,
    width: '100%',
    fontSize: '18px',
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  descTime: {
    marginTop: 0.2,
    fontWeight: '400',
    fontSize: 11,
    color: Colors.primary['500'],
  },
  descTimeAlert: {
    fontWeight: '400',
    fontSize: 11,
    color: '#FF0064',
  },
  descReward: {
    fontWeight: '700',
    fontSize: 11,
    color: Colors.grey['900'],
    border: `1px solid ${Colors.grey['700']}`,
    padding: '4px 6px 4px 8px',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderRightWidth: '0px',
    whiteSpace: 'nowrap',
  },
  descRewardArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  socialMetrics: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  rewardArea: {
    background: Colors.grey['700'],
    border: `1px solid ${Colors.grey['700']}`,
    borderLeftWidth: '0px',
    padding: '3px 5px',
    borderRadius: '4px',
  },
  rewardText: {
    fontWeight: '500',
    fontSize: 11,
    color: 'white',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  raffleOriginal: {
    fontSize: 12,
    color: Colors.primary[500],
    fontWeight: '700',
  },
  moreReward: {
    color: Colors.grey['700'],
    fontSize: 10,
    padding: '5px',
    backgroundColor: Colors.grey['200'],
    borderRadius: '8px',
    marginLeft: '8px',
  },
  chainImg: {
    width: '24px',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '24px',
    position: 'absolute',
    background: '#fff',
    left: '8px',
    top: '8px',
  },
  featured: {
    // width: '24px',
    // height: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '24px',
    position: 'absolute',
    background: '#fff',
    left: '8px',
    bottom: '8px',
  },
};

export default RaffleItem;
