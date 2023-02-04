import dayjs from 'dayjs';
import { Colors } from 'constants/theme';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { useRouter } from 'next/router';

type Props = {
  isNew: boolean;
  avatar?: string | null;
  title: string;
  body: string;
  createdAt: string;
  divider?: boolean;
  link?:
    | {
        path: string;
        queryParams: any;
      }
    | string
    | null;
};
const Notification = (props: Props) => {
  const router = useRouter();
  return (
    <Stack
      direction="row"
      sx={
        props.divider ? { ...styles.layout, ...styles.divider } : styles.layout
      }
      role="button"
      onClick={async () => {
        const link =
          typeof props.link === 'string' ? JSON.parse(props.link) : props.link;

        if (link) {
          try {
            let url = link.path;
            if (link.queryParams) {
              if (url === '/raffle') {
                url = `${url}/${link.queryParams.id}`;
              }
            }

            if (url.indexOf('/') === 0) {
              router.push(url);
            } else {
              window.open(url, '_blank');
            }
          } catch (error) {
            console.error(error);
          }
        }
      }}
    >
      <Box
        sx={{
          ...styles.dot,
          backgroundColor: props.isNew ? Colors.secondary[500] : 'white',
        }}
      />
      <Stack sx={styles.right}>
        <Stack direction="row" justifyContent="flex-start">
          <Text sx={styles.title}>{props.title}</Text>
          {props.createdAt ? (
            <Text sx={styles.createdAt}>
              {dayjs(props.createdAt).fromNow()}
            </Text>
          ) : null}
        </Stack>
        <Box sx={styles.content}>
          <Text sx={styles.body}>{props.body}</Text>
        </Box>
      </Stack>
    </Stack>
  );
};

const styles = {
  layout: {
    padding: '10px 24px 0px',
    position: 'relative',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: Colors.grey[100],
    },
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 24,
    position: 'absolute',
    left: '8px',
    top: '41px',
  },
  right: {
    borderBottom: `1px solid ${Colors.grey[400]}`,
    paddingBottom: '10px',
    width: '100%',
  },
  content: {
    minHeight: '40px',
  },
  avatarWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
  },
  avatar: { width: '50px', height: '50px', borderRadius: '50px' },
  upperContent: {
    paddingTop: '8px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { flex: 1, fontSize: 16, fontWeight: '700' },
  createdAt: { fontSize: 14, color: Colors.primary['400'] },
  body: {
    fontSize: 14,
    fontWeight: '500',
    webKitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  divider: {
    borderBottomColor: Colors.grey[200],
    borderBottomWidth: 1,
  },
};
export default Notification;
