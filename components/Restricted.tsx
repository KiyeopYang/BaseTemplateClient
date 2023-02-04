import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { BottomBarHeight } from 'constants/styles';
import Button from '@mui/material/Button';
import Link from 'next/link';

type Props = {
  title?: string;
  button?: {
    title: string;
    onClick: VoidFunction;
  } | null;
};
const Restricted = (
  props: Props = { title: '제한된 페이지', button: null }
) => (
  <Stack sx={styles.stack}>
    <Text sx={styles.text}>{props.title}</Text>
    {props.button ? (
      <Button size="large" onClick={props.button.onClick}>
        {props.button.title}
      </Button>
    ) : (
      <Link href="/">
        <Button size="large">메인으로 가기</Button>
      </Link>
    )}
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

export default Restricted;
