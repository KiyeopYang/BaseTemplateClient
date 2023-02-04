import React from 'react';
import Paper from '@mui/material/Paper';
import { ScreenWidth } from 'constants/styles';
import { Theme } from '@mui/material/styles';
import { SxProps, toArray } from 'libs/sx';

interface Props {
  sx?: SxProps | null;
  children: React.ReactNode;
}
const BottomFixedWrapper = ({ children, sx }: Props) => {
  return (
    <Paper sx={[styles.root, ...toArray(sx)]} elevation={0}>
      {children}
    </Paper>
  );
};
const styles = {
  root: {
    zIndex: 1002,
    maxWidth: ScreenWidth,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '12px',
    paddingBottom: '28px',

    borderColor: (theme: Theme) => theme.palette.grey['300'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomWidth: 0,
  },
};
export default BottomFixedWrapper;
