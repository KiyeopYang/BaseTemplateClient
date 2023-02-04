import * as React from 'react';
import { useRouter } from 'next/router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { ScreenWidth } from 'constants/styles';
import {
  Home as HomeIcon,
  Time as TimeIcon,
  Search as SearchIcon,
  Profile as ProfileIcon,
  Create as CreateIcon,
  Activity as ActivityIcon,
} from './Icons';
import Link from 'next/link';
import theme, { Colors } from 'constants/theme';

const PathData = [
  {
    pathname: '/',
    label: 'Feed',
    Icon: HomeIcon,
  },
  // {
  //   pathname: '/scheduled-raffles',
  //   label: 'Schedule',
  //   Icon: TimeIcon,
  // },
  {
    pathname: '/leaderboard',
    label: 'Leaderboard',
    Icon: ActivityIcon,
  },
  {
    pathname: '/my-page',
    label: 'MyInfo',
    Icon: ProfileIcon,
  },
];
const CreatorPathData = [
  {
    pathname: '/creator',
    label: '크리에이터',
    Icon: CreateIcon,
  },
  {
    pathname: '/',
    label: '메인',
    Icon: HomeIcon,
  },
];
const PathsToHide = ['/login', '/admin'];
const BottomBar = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const isCreator = router.pathname.indexOf('/creator') === 0;

  const paths = isCreator ? CreatorPathData : PathData;

  React.useEffect(() => {
    if (paths === PathData) {
      const idx = paths.findIndex(
        ({ pathname }) =>
          pathname !== '/' && router.pathname.indexOf(pathname) === 0
      );
      if (idx > -1) setValue(idx);
      else if (router.pathname === '/') setValue(0);
    } else {
      setValue(0);
    }
  }, [router.pathname, paths]);

  const isMain = router.pathname === '/';
  const isInfluencer = router.pathname === '/u/[influencer]';
  const isFromWebsite = Boolean(router.query.isFromWebsite);
  const isHidden =
    PathsToHide.some((path) => router.pathname.indexOf(path) === 0) ||
    (isInfluencer && !isFromWebsite);

  if (isHidden) return null;
  return (
    <Paper sx={styles.root} elevation={0}>
      <BottomNavigation showLabels={isCreator} value={value}>
        {paths.map(({ label, Icon, pathname }, i) => (
          <Link key={label} href={pathname} passHref>
            <BottomNavigationAction
              disableRipple
              disableTouchRipple
              label={label}
              showLabel={isCreator}
              icon={
                <Icon
                  // @ts-ignore
                  color={
                    i === value
                      ? theme.palette.primary.main
                      : theme.palette.grey['500']
                  }
                />
              }
              css={{
                ':hover, :active': {
                  '& path, & circle': {
                    stroke: `${Colors.primary['500']} !important`,
                  },
                  color: `${Colors.primary['500']} !important`,
                },
                ...(i === value
                  ? {
                      color: `${Colors.primary['500']} !important`,
                    }
                  : {}),
              }}
            />
          </Link>
        ))}
      </BottomNavigation>
    </Paper>
  );
};
const styles = {
  root: {
    maxWidth: ScreenWidth,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: 'white',
    borderColor: Colors.grey['300'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomWidth: 0,
    zIndex: 1,
  },
};
export default BottomBar;
