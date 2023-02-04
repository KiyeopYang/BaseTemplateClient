import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import Image from 'components/Image';
import { Project } from 'types';
import * as StaticUrls from 'constants/staticUrls';
import { Colors } from 'constants/theme';
import { SxProps } from 'libs/sx';
import Link from 'next/link';
import SocialMetricsComponent from './SocialMetrics';

type Props = {
  item: Project;
  sx?: SxProps;
  showDescription?: boolean;
  disabled?: boolean;
};
function ProjectItem({ item, sx, showDescription, disabled }: Props) {
  const twitterFollowersChange = item.twitterFollowersChange || 0;
  const discordMembersChange = item.discordMembersChange || 0;

  const Item = () => (
    <Box
      // @ts-ignore
      sx={
        disabled
          ? { ...styles.listItem, ...sx }
          : { ...styles.listItem, ...sx, ...styles.hover }
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {twitterFollowersChange + discordMembersChange > 10000 ? (
          <Text sx={styles.hot}>🔥HOT</Text>
        ) : null}
        <Image
          width={80}
          height={80}
          css={styles.image}
          src={item.thumbnail}
          alt={item.thumbnail}
          objectFit="cover"
        />
        <Box sx={styles.textContents}>
          {item.blockchain &&
          ['eth', 'sol', 'bnb', 'klay'].includes(item.blockchain) ? (
            <Box sx={[styles.chainImg]}>
              <Image
                src={StaticUrls.Blockchains[item.blockchain] as any}
                alt={item.blockchain}
                width={10}
                height={10}
              />
            </Box>
          ) : null}
          <Text sx={styles.name}>{item.name}</Text>
          <SocialMetricsComponent
            socialMetrics={{
              twitterFollowers: item.twitterFollowers,
              discordMembers: item.discordMembers,
            }}
            socialMetricsChanges={{
              twitterFollowers: item.twitterFollowersChange,
              discordMembers: item.discordMembersChange,
            }}
          />
        </Box>
      </Box>
      {showDescription ? (
        <Text sx={styles.description}>{item.description}</Text>
      ) : null}
    </Box>
  );
  if (disabled) return <Item />;

  return (
    <Link href={`/project/${item.id}`} passHref>
      <Box
        // @ts-ignore
        sx={
          disabled
            ? { ...styles.listItem, ...sx }
            : { ...styles.listItem, ...sx, ...styles.hover }
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {twitterFollowersChange + discordMembersChange > 10000 ? (
            <Text sx={styles.hot}>🔥HOT</Text>
          ) : null}
          <Image
            width={80}
            height={80}
            css={styles.image}
            src={item.thumbnail}
            alt={item.thumbnail}
            objectFit="cover"
          />
          <Box sx={styles.textContents}>
            {item.blockchain &&
            ['eth', 'sol', 'bnb', 'klay'].includes(item.blockchain) ? (
              <Box sx={[styles.chainImg]}>
                <Image
                  src={StaticUrls.Blockchains[item.blockchain] as any}
                  alt={item.blockchain}
                  width={10}
                  height={10}
                />
              </Box>
            ) : null}
            <Text sx={styles.name}>{item.name}</Text>
            <SocialMetricsComponent
              socialMetrics={{
                twitterFollowers: item.twitterFollowers,
                discordMembers: item.discordMembers,
              }}
              socialMetricsChanges={{
                twitterFollowers: item.twitterFollowersChange,
                discordMembers: item.discordMembersChange,
              }}
            />
          </Box>
        </Box>
        {showDescription ? (
          <Text sx={styles.description}>{item.description}</Text>
        ) : null}
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
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
  },
  hover: {
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
  description: {
    mt: 1,
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

export default ProjectItem;
