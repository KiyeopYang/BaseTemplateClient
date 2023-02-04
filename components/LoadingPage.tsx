import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { BottomBarHeight } from 'constants/styles';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Loader from 'components/Loader';

const LoadingPage = () => (
  <Stack sx={styles.stack}>
    <Loader />
  </Stack>
);

const styles = {
  stack: {
    textAlign: 'center',
    flex: 1,
    top: 0,
    height: `100vh`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: `${BottomBarHeight}px`,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  text: {
    color: Colors.grey['500'],
    fontSize: 24,
    marginBottom: 4,
  },
};

export default LoadingPage;
