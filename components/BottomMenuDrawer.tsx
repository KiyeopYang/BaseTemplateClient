import { KeyboardEvent, MouseEvent, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { ScreenWidth, ScreenMargin } from 'constants/styles';

type Props = {
  open: boolean;
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  onOpen: (e: KeyboardEvent | MouseEvent) => void;
  title: string;
  subTitle?: string;
  items: string[];
  selectedItem: number;
  onSubmit: (idx: number) => void;
  submitText: string;
};
const BottomDrawer = (props: Props) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [selectedItem, setSelectedItem] = useState(props.selectedItem);
  useEffect(() => {
    if (props.open) {
      setSelectedItem(props.selectedItem);
    }
  }, [props.open, props.selectedItem]);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{
        sx: styles.drawer,
      }}
    >
      <Box sx={styles.root} role="presentation" onKeyDown={props.onClose}>
        <Text sx={styles.title}>{props.title}</Text>
        {props.subTitle ? (
          <Text sx={styles.subTitle}>{props.subTitle}</Text>
        ) : null}
        <Box sx={styles.listItems}>
          <Grid container rowSpacing={1.5} columnSpacing={1.5}>
            {props.items.map((item, i) => (
              <Grid item xs={6} key={i}>
                <Button
                  fullWidth
                  sx={
                    selectedItem === i
                      ? { ...styles.button, ...styles.selectedButton }
                      : styles.button
                  }
                  onClick={() => {
                    setSelectedItem(i);
                  }}
                  variant="contained"
                  disableElevation
                  disableRipple
                >
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={styles.confirmWrapper}>
        <Button
          sx={styles.confirm}
          fullWidth
          variant="contained"
          disableElevation
          disableRipple
          onClick={() => {
            props.onSubmit(selectedItem);
          }}
        >
          {props.submitText}
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};
const styles = {
  root: {
    width: 'auto',
    padding: '24px',
  },
  drawer: {
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    maxWidth: ScreenWidth,
    overflow: 'hidden',
    margin: ScreenMargin,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 14,
  },
  listItems: {
    marginTop: '20px',
  },
  button: {
    borderRadius: '20px',
    backgroundColor: Colors.primary['100'],
    color: Colors.primary['500'],
    padding: '10px 10px',
    textTransform: 'none',
    whiteSpace: 'pre',
    ':hover': {
      backgroundColor: Colors.primary['500'],
      color: 'white',
    },
  },
  selectedButton: {
    backgroundColor: Colors.primary['500'],
    color: 'white',
  },
  confirmWrapper: {
    paddingTop: '10px',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: Colors.grey['300'],
  },
  confirm: {
    padding: '18px',
    borderRadius: '16px',
  },
};
export default BottomDrawer;
