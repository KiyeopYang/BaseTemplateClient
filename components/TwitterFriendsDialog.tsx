import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useContext as useConfirmContext } from 'contexts/confirm';
import AddIcon from '@mui/icons-material/Add';
import { useLocalizationContext } from 'contexts/Localization';
import { twitterFriends as twitterFriendsApi } from 'apis';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Text from '@mui/material/Typography';
import CheckIcon from 'components/CheckIcon';
import Image from 'components/Image';
import * as StaticUrls from 'constants/staticUrls';

export interface SimpleDialogProps {
  title?: string;
  open: boolean;
  numberToSelect: number;
  onClose: () => void;
  tweetUrl?: string;
  onSubmit: (friends: string[]) => void;
  onClickCheck?: () => void;
}

function TwitterFriendsDialog({
  onClose,
  onSubmit,
  open,
  title,
  numberToSelect,
  onClickCheck,
}: SimpleDialogProps) {
  const [selectedAccountIdxs, setSelectedAccountIdxs] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedAccountIdxs(
        Array.from({ length: numberToSelect }).map((_, i) => i)
      );
    }
  }, [open, numberToSelect]);
  const { t } = useLocalizationContext();
  const { data: twitterFriends, refetch } = twitterFriendsApi.useGetList();
  const { mutateAsync: addTwitterFriend } = twitterFriendsApi.useCreate();
  const { mutateAsync: deleteTwitterFriend } = twitterFriendsApi.useDelete();
  const [, confirmActions] = useConfirmContext();

  const handleClose = () => {
    onClose();
  };

  const [inputV, setInputV] = useState('');
  let selectedTwitterAccountNames: string[] = [];
  if (twitterFriends) {
    const accounts = selectedAccountIdxs
      .map((idx) => twitterFriends[idx])
      .filter((account) => account && account.twitterFriendName);
    selectedTwitterAccountNames = accounts.map(
      (account) => account.twitterFriendName as string
    );
  }

  const [okToCheck, setOkToCheck] = useState(false);
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>
        {title || t('common.twitter_accounts_to_tag')}
        <Text sx={styles.subTitle}>{t('detail.use_many_friends')}</Text>
      </DialogTitle>

      <List sx={{ pt: 0 }}>
        {twitterFriends?.map((friend, i) => {
          const selected = selectedAccountIdxs.includes(i);
          return (
            <ListItem
              disableRipple
              button
              onClick={() => {
                if (selected) {
                  setSelectedAccountIdxs(
                    selectedAccountIdxs.filter((idx) => idx !== i)
                  );
                } else {
                  setSelectedAccountIdxs([...selectedAccountIdxs, i]);
                }
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmActions
                      .open(t('common.confirm_delete'), '', [
                        t('common.no'),
                        t('common.yes'),
                      ])
                      .then(async (answer) => {
                        if (answer === t('common.yes')) {
                          await deleteTwitterFriend({
                            id: friend.id,
                          });
                          refetch();
                        }
                      });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={friend.id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'transparent' }}>
                  <CheckIcon isDone={selected} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`@${friend.twitterFriendName || ''}`} />
            </ListItem>
          );
        })}
        <ListItem
          autoFocus
          button
          onClick={() => {
            confirmActions
              .open(
                t('common.add_account'),
                '',
                [t('common.cancel'), t('common.submit')],
                {
                  label: t('common.twitter_id'),
                  value: '',
                  placeholder: '@username or username',
                }
              )
              .then(async ({ button, value }: any) => {
                if (button === t('common.submit') && value) {
                  const twitterFriendName = (
                    value.indexOf('@') === 0 ? value.slice(1) : value
                  ).trim();
                  if (twitterFriendName) {
                    await addTwitterFriend({
                      twitterFriendName,
                    });
                    refetch();
                  }
                }
              });
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={t('common.add_account')} />
        </ListItem>
        {/* <ListItem>
          <TextField
            fullWidth
            label="태그할 내용"
            value={inputV}
            onChange={(e) => {
              setInputV(e.target.value);
            }}
          />
        </ListItem> */}
      </List>

      <DialogActions>
        <Button sx={styles.button} onClick={handleClose}>
          {t('common.close')}
        </Button>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => {
            onSubmit(selectedTwitterAccountNames);
            setOkToCheck(true);
          }}
          autoFocus
          disabled={selectedTwitterAccountNames.length < numberToSelect}
        >
          태그하기
        </Button>
        {/* <Button
          sx={styles.button}
          variant="contained"
          onClick={async () => {
            await onClickCheck();
          }}
          disabled={
            !okToCheck || selectedTwitterAccountNames.length < numberToSelect
          }
        >
          태그 확인하기
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
const styles = {
  button: {
    textTransform: 'none',
  },
  twitter: {
    width: '100%',
  },
  subTitle: {
    fontSize: 12,
  },
};
export default TwitterFriendsDialog;
