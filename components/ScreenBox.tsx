import Box from '@mui/material/Box';
import { BottomBarHeight } from 'constants/styles';
import theme from 'constants/theme';
import { SxProps, toArray } from 'libs/sx';
import { NoSsr } from '@mui/material';

type Props = {
  sx?: SxProps;
  children?: React.ReactNode;
  noSsr?: boolean;
};
const ScreenBox = (props: Props) => {
  if (props.noSsr)
    return (
      <NoSsr>
        <Box sx={[styles.root, ...toArray(props.sx)]}>{props.children}</Box>
      </NoSsr>
    );
  return <Box sx={[styles.root, ...toArray(props.sx)]}>{props.children}</Box>;
};

const styles = {
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: `${BottomBarHeight}px`,
    borderWidth: { xs: 0, sm: 1 },
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    background: 'white',
  },
};

export default ScreenBox;
