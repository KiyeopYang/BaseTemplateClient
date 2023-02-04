import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import { RaffleEntry, RaffleEntryStatus } from 'types';
import {
  DialogActions,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';

type Props = {
  entry?: RaffleEntry | null;
  onUpdateEntryStatus?: (status: RaffleEntryStatus) => void;
  open: boolean;
  onClose: () => void;
};
export default function RaffleEntryDuplicateDialog({
  entry,
  open,
  onClose,
  onUpdateEntryStatus,
}: Props) {
  const [, confirmActions] = useConfirmContext();
  return (
    <Dialog
      onClose={onClose}
      open={open}
      transitionDuration={0}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>참여자</DialogTitle>
      <DialogContent>
        {entry ? (
          <List sx={{ pt: 0, px: 0 }}>
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="시각"
                secondary={dayjs(entry.created_at).format(
                  'YYYY년 MM월 DD일 HH:mm'
                )}
              />
            </ListItem>
            {typeof entry.user === 'object' && entry?.user ? (
              <ListItem sx={styles.listItemWrapper}>
                <ListItemText
                  sx={styles.listItem}
                  primary="가입 유저"
                  secondary={entry.user.username}
                />
              </ListItem>
            ) : (
              <ListItem sx={styles.listItemWrapper}>
                <ListItemText
                  sx={styles.listItem}
                  primary="가입 유저"
                  secondary={'없음'}
                />
              </ListItem>
            )}
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="지갑 주소"
                secondary={entry.walletAddress}
              />
            </ListItem>
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="트위터"
                secondary={entry.twitterName || '없음'}
              />
            </ListItem>
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="텔레그램"
                secondary={entry.telegramName || '없음'}
              />
            </ListItem>
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="디스코드"
                secondary={entry.discordName || '없음'}
              />
            </ListItem>
            <ListItem sx={styles.listItemWrapper}>
              <ListItemText
                sx={styles.listItem}
                primary="상태"
                secondary={
                  <ToggleButtonGroup
                    color="primary"
                    value={entry.status}
                    onChange={(_, next) => {
                      if (next && onUpdateEntryStatus) {
                        if (next === 'winner') {
                          confirmActions
                            .open(
                              `당첨자로 선정`,
                              `당첨자로 선정 하시겠습니까?`,
                              ['아니요', '네'],
                              {
                                label: '당첨 메일 보내기 (기능 준비 중)',
                                value: '',
                                multiline: true,
                                variant: 'outlined',
                                disabled: true,
                              }
                            )
                            .then((answer: any) => {
                              if (answer?.button === '네') {
                                onUpdateEntryStatus(next);
                              }
                            });
                        } else {
                          onUpdateEntryStatus(next);
                        }
                      }
                    }}
                    exclusive
                    sx={styles.buttonGroup}
                  >
                    <ToggleButton
                      value="none"
                      color="standard"
                      sx={styles.button}
                    >
                      없음
                    </ToggleButton>
                    <ToggleButton
                      value="invalidated"
                      color="secondary"
                      sx={[styles.button]}
                    >
                      제외
                    </ToggleButton>
                    <ToggleButton
                      value="winner"
                      color="primary"
                      sx={styles.button}
                    >
                      당첨
                    </ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </ListItem>
            {/* <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem> */}
          </List>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={() => onClose()}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const styles = {
  listItemWrapper: { p: 0 },
  listItem: {
    maxWidth: '100%',

    '& .MuiListItemText-primary': {
      color: 'black',
      fontWeight: 'bold',
    },
    '& .MuiListItemText-secondary': {
      color: 'black',
      overflowX: 'auto',
    },
  },
  buttonGroup: {
    width: '100%',
    '& 	.Mui-selected': {},
  },
  button: {
    width: '100%',
  },
};
