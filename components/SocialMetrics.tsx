import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import comma from 'libs/comma';
import { SocialMetrics } from 'types';
import { Colors } from 'constants/theme';
import * as StaticUrls from 'constants/staticUrls';
import { SxProps, toArray } from 'libs/sx';

const Twitter = StaticUrls.Icons.Twitter;
const Discord = StaticUrls.Icons.Discord;
type Props = {
  sx?: SxProps;
  socialMetrics: SocialMetrics | null;
  socialMetricsChanges: SocialMetrics | null;
};
const changeLimit = 2000;
function SocialMetricsComponent({
  sx,
  socialMetrics,
  socialMetricsChanges,
}: Props) {
  const twitterFollowersChange = socialMetricsChanges?.twitterFollowers || 0;
  const discordMembersChange = socialMetricsChanges?.discordMembers || 0;

  return (
    <Box sx={[styles.socialMetrics, ...toArray(sx)]}>
      {socialMetrics?.twitterFollowers ? (
        <Box sx={styles.socialItem}>
          <img width={14} height={14} src={Twitter} alt={Twitter} />
          <Text
            sx={[
              styles.socialText,
              // twitterFollowersChange > changeLimit
              //   ? {
              //       color: Colors.primary[500],
              //     }
              //   : twitterFollowersChange < -changeLimit
              //   ? {
              //       color: Colors.error,
              //     }
              //   : {},
            ]}
          >
            {comma(socialMetrics.twitterFollowers)}
          </Text>
        </Box>
      ) : null}
      {socialMetrics?.discordMembers ? (
        <Box sx={styles.socialItem}>
          <img src={Discord} width={14} height={14} alt={Discord} />
          <Text
            sx={[
              styles.socialText,
              // discordMembersChange > changeLimit
              //   ? {
              //       color: Colors.primary['500'],
              //     }
              //   : discordMembersChange < -changeLimit
              //   ? {
              //       color: Colors.error,
              //     }
              //   : {},
            ]}
          >
            {comma(socialMetrics.discordMembers)}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

const styles = {
  listItem: {
    borderRadius: '16px',
    borderStyle: 'solid',
    borderColor: Colors.grey['300'],
    borderWidth: '1px',
    padding: '10px',
    flexDirection: 'row',
    display: 'flex',
    position: 'relative',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey['100'],
    },
  },
  hot: {
    color: Colors.secondary[500],
    fontWeight: '700',
    fontSize: 10,
    padding: '2px 4px',
    borderRadius: '2px',
    backgroundColor: Colors.secondary['100'],
    position: 'absolute',
    right: 10,
    top: 10,
  },
  content: {},
  image: {
    borderRadius: '16px',
  },
  textContents: {
    marginLeft: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  socialMetrics: {
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
  },
  socialItem: {
    width: '76px',
    height: '24px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {},
  socialText: {
    marginLeft: '6px',
    fontSize: 12,
    fontWeight: '500',
  },
};

export default SocialMetricsComponent;
