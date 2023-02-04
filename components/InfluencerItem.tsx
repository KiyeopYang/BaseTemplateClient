import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import Image from 'components/Image';
import { Influencer } from 'types';
import * as StaticUrls from 'constants/staticUrls';
import { Colors } from 'constants/theme';
import { SxProps } from 'libs/sx';
import Link from 'next/link';
import SocialMetricsComponent from './SocialMetrics';

type Props = {
  item: Influencer;
  sx?: SxProps;
};
function InfluencerItem({ item, sx }: Props) {
  return (
    <Link href={`/u/${item.urlName}?isFromWebsite=true`} passHref>
      <Box sx={{ ...styles.listItem, ...sx }}>
        <Image
          width={80}
          height={80}
          css={styles.image}
          src={item.thumbnail}
          alt={item.thumbnail}
          objectFit="cover"
        />
        <Box sx={styles.textContents}>
          <Text sx={styles.name}>{item.name}</Text>
          <SocialMetricsComponent
            socialMetrics={{
              twitterFollowers: item.twitterFollowers,
              discordMembers: item.discordMembers,
            }}
            socialMetricsChanges={{
              twitterFollowers: 0,
              discordMembers: 0,
            }}
          />
        </Box>
      </Box>
    </Link>
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
  chainImg: {
    width: '16px',
    height: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    border: '1px solid #dddddd',
    borderRadius: '16px',
    position: 'absolute',
    background: '#fff',
    left: '16px',
    top: '16px',
  },
};

export default InfluencerItem;
