import { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { ButtonGroup, DialogActions, Typography } from '@mui/material';
import { Colors } from 'constants/theme';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { RaffleEntry } from 'types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Type = 'invalidated' | 'winner' | 'none';
export interface Props {
  open: boolean;
  entries: RaffleEntry[];
  onChangeType: (type: Type) => void;
  onClose: (value: string) => void;
  onlyInvalidate: boolean;
}

function ChangeRaffleEntriesStatus({
  onClose,
  onChangeType,
  entries,
  open,
  onlyInvalidate,
}: Props) {
  const [openList, setOpenList] = useState(false);
  const [, confirmActions] = useConfirmContext();
  return (
    <Dialog
      transitionDuration={0}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {entries.length}개 상태 변경
        <Button
          variant="outlined"
          onClick={() => {
            setOpenList(true);
          }}
        >
          변경할 리스트 보기
        </Button>
      </DialogTitle>

      <List sx={{ pt: 0, width: '100%' }}>
        <ListItem
          sx={{
            height: 80,
            ':hover': {
              '& .MuiListItemText-root': {
                backgroundColor: Colors.primary[400],
                color: 'white',
              },
            },
          }}
          button
          onClick={() => {
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
              .then(async (answer: any) => {
                if (answer?.button === '네') {
                  onChangeType('winner');
                }
              });
          }}
          disableRipple
          disabled={onlyInvalidate}
        >
          <ListItemText
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: Colors.primary[400],
              color: Colors.primary[400],
              ...styles.listItemText,
            }}
            primary={'당첨자로 선정'}
          />
        </ListItem>
        <ListItem
          sx={{
            height: 80,
            ':hover': {
              '& .MuiListItemText-root': {
                backgroundColor: Colors.secondary[400],
                color: 'white',
              },
            },
          }}
          button
          onClick={() => onChangeType('invalidated')}
          disableRipple
        >
          <ListItemText
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: Colors.secondary[400],
              color: Colors.secondary[400],
              ...styles.listItemText,
            }}
            primary={'추첨 리스트에서 제외'}
          />
        </ListItem>
        <ListItem
          sx={{
            height: 80,
            ':hover': {
              '& .MuiListItemText-root': {
                backgroundColor: Colors.grey[700],
                color: 'white',
              },
            },
          }}
          button
          onClick={() => onChangeType('none')}
          disableRipple
        >
          <ListItemText
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: Colors.grey[700],
              color: Colors.grey[700],
              ...styles.listItemText,
            }}
            primary="모든 상태 제거"
          />
        </ListItem>
      </List>
      <DialogActions>
        <ButtonGroup>
          {/* @ts-ignore */}
          <Button size="large" onClick={onClose}>
            닫기
          </Button>
        </ButtonGroup>
      </DialogActions>
      <Dialog
        open={openList}
        onClose={() => {
          setOpenList(false);
        }}
        scroll="paper"
        fullWidth
        maxWidth="xl"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">변경 리스트</DialogTitle>
        <DialogContent dividers>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>지갑</TableCell>
                <TableCell align="right">유저</TableCell>
                <TableCell align="right">트위터</TableCell>
                <TableCell align="right">디스코드</TableCell>
                <TableCell align="right">텔레그램</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow
                  key={entry.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {entry.walletAddress}
                  </TableCell>
                  <TableCell align="right">{entry.twitterName}</TableCell>
                  <TableCell align="right">{entry.discordName}</TableCell>
                  <TableCell align="right">{entry.telegramName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenList(false);
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
const styles = {
  listItemText: {
    padding: 2.5,
    borderRadius: '0px',
    fontWeight: 'bold',
    fontSize: 18,
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      fontSize: 18,
    },
  },
};
export default ChangeRaffleEntriesStatus;
