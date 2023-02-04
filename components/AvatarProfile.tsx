import { Avatar, Typography as Text, Stack } from '@mui/material';
import { EmptyImg } from 'constants/empty';

type Props = {
  avatar?: string | null;
  name: string;
};
const AvatarProfile = (props: Props) => (
  <Stack direction="row" alignItems="center" spacing={0.5}>
    {props.avatar ? (
      <Avatar
        alt={props.name}
        src={props.avatar || EmptyImg}
        sx={styles.influencerAvatar}
      />
    ) : null}
    <Text noWrap textOverflow="ellipsis" sx={styles.influencerName}>
      {props.name}
    </Text>
  </Stack>
);
const styles = {
  influencerAvatar: {
    width: '18px',
    height: '18px',
    border: '1px solid #dddddd',
  },
  influencerName: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default AvatarProfile;
