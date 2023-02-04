import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { ScreenWidth } from 'constants/styles';
import theme from 'constants/theme';
import Chip from '@mui/material/Chip';
import { SxProps, toArray } from 'libs/sx';

type Props = {
  onPress?: () => void;
  isBeta?: boolean;
  onBetaClick?: () => void;
  leftComponent?: React.ReactNode | null;
  rightComponent?: React.ReactNode | null;
  title?: React.ReactNode | null;
  children?: React.ReactNode | null;
  withGoBack?: boolean;
  goBackLink?: string;
  sx?: SxProps;
  titleSx?: SxProps;
  topWrapperSx?: SxProps;
};
const ScreenTitle = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Box sx={[styles.topArea, ...toArray(props.sx)]}>
        <Box sx={{ ...styles.topWrapper, ...props.topWrapperSx } as any}>
          {props.leftComponent}
          {props.withGoBack ? (
            <IconButton
              sx={styles.leftIcon}
              onClick={() => {
                if (props.goBackLink) {
                  router.replace(props.goBackLink);
                } else if (window.history.length < 2) {
                  router.replace('/');
                } else {
                  router.back();
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          <Box style={styles.titleWrapper}>
            {typeof props.title === 'string' ? (
              <Typography sx={[styles.topTitle, ...toArray(props.titleSx)]}>
                {props.title}
              </Typography>
            ) : (
              props.title
            )}
            {props.isBeta ? (
              <Box sx={styles.beta} role="button" onClick={props.onBetaClick}>
                <Chip label="Beta" size="small" color="secondary" />
              </Box>
            ) : null}
          </Box>
          {props.rightComponent}
        </Box>
        {props.children}
      </Box>
      <Box sx={styles.topWrapperDummy} />
    </>
  );
};

const styles = {
  topWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
    height: '48px',
  },
  topWrapperDummy: {
    height: '47px',
  },
  titleWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
  },
  leftIcon: { mr: 1 },
  topTitle: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: '48px',
    color: '#212121',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  topArea: {
    maxWidth: ScreenWidth,
    width: '100%',
    top: 0,
    position: 'fixed',
    zIndex: 100,
    background: 'white',
    borderLeftWidth: { xs: 0, sm: 1 },
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.grey['300'],
    borderRightWidth: { xs: 0, sm: 1 },
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey['300'],
  },
  beta: {
    flex: 1,
    marginLeft: '6px',
  },
};

export default ScreenTitle;
