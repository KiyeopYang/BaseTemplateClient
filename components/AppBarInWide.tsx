import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps, toArray } from 'libs/sx';
import * as StaticUrls from 'constants/staticUrls';
import { useRouter } from 'next/router';
import Image from './Image';
import { Typography } from '@mui/material';

type Props = {
  sx: SxProps;
};
const ResponsiveAppBar = (props: Props) => {
  const router = useRouter();
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={[styles.root, ...toArray(props.sx)]}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ marginLeft: '-12px' }}>
            <ButtonBase
              onClick={() => {
                router.replace('/');
                window.scrollTo(0, 0);
              }}
              disableRipple
              disableTouchRipple
            >
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }}
              >
                PetGPT
              </Typography>
              {/* <Image
                height={40}
                src={StaticUrls.LogoWithTitleWhite}
                alt="logo"
              /> */}
            </ButtonBase>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const styles = {
  root: {
    background: 'transparent',
    zIndex: 0,
  },
};
export default ResponsiveAppBar;
