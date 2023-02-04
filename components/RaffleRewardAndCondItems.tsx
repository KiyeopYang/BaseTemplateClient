import {
  Stack,
  List,
  ListItem,
  IconButton,
  TextField,
  InputAdornment,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpIcon from '@mui/icons-material/ArrowUpward';
import DownIcon from '@mui/icons-material/ArrowDownward';
import { Reward, Condition } from 'types';
import { useLocalizationContext } from 'contexts/Localization';
import * as Url from 'libs/url';

type RewardOrCondition = 'reward' | 'condition';

type Props = {
  type: RewardOrCondition;
  items: Condition[] | Reward[];
  onChange: (nextItems: any[]) => void;
};
const RaffleDragItems = (props: Props) => {
  const { t } = useLocalizationContext();
  return (
    <List sx={{ width: '100%' }}>
      {props.items.map((item: any, i) => {
        let helperText = item.account
          ? `user : @${item.account}`
          : ['tr', 'tl'].includes(item.type) &&
            item.value.indexOf('https://twitter.com/') === 0
          ? `tweet Id: ${item.value.split('/').pop()}`
          : item.type === 'etc'
          ? '기타 보상은 직접 입력할 수 있도록 기능 추가 예정입니다.'
          : '';
        if (!item.value) {
          if (item.type === 'tf') {
            helperText = 'ex) https://twitter.com/get_raffle';
          }

          if (['tr', 'tl', 'tt', 'tt_unlimit'].includes(item.type)) {
            helperText = 'ex) https://twitter.com/get_raffle/status/123456';
          }
        }
        return (
          <ListItem key={`${i}`} sx={{ p: 0, mb: 2, width: '100%' }}>
            <Stack>
              <TextField
                label={
                  props.type === 'reward'
                    ? t(`common.reward_${item.type}` as any)
                    : t(`common.cond_${item.type}` as any, { count: 'n' })
                }
                InputLabelProps={{
                  sx: {
                    color: 'black',
                  },
                }}
                type={props.type === 'reward' ? 'number' : 'text'}
                sx={{
                  flex: 1,
                }}
                value={item.value}
                onChange={(e: any) => {
                  const { target } = e;
                  let value = target.value;

                  if (['tf', 'tl', 'tt', 'tr'].includes(item.type)) {
                    // 쿼리 없애주어야 한다.
                    value = Url.removeQueries(value);
                  }

                  const newItems: any = props.items.slice();
                  newItems[i].value = value;
                  if (
                    item.type === 'tf' &&
                    value.indexOf('https://twitter.com/') === 0
                  ) {
                    newItems[i].account = Url.getLastPath(value);
                  }

                  props.onChange(newItems);
                }}
                helperText={helperText}
                FormHelperTextProps={{
                  sx: {
                    whiteSpace: 'pre-line',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Stack direction="row" alignItems="center">
                        <IconButton
                          disabled={i === 0}
                          onClick={() => {
                            const newItems = props.items.slice();
                            const prev = newItems[i - 1];
                            newItems[i - 1] = item;
                            newItems[i] = prev;
                            props.onChange(newItems);
                          }}
                        >
                          <UpIcon />
                        </IconButton>
                        <IconButton
                          disabled={i === props.items.length - 1}
                          onClick={() => {
                            const newItems = props.items.slice();
                            const prev = newItems[i + 1];
                            newItems[i + 1] = item;
                            newItems[i] = prev;
                            props.onChange(newItems);
                          }}
                        >
                          <DownIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => {
                            props.onChange(
                              (props.items as any).filter(
                                (_: any, idx: number) => idx !== i
                              )
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                placeholder={
                  ['tt', 'tl', 'tr', 'tt_unlimit'].includes(item.type)
                    ? '트윗 주소'
                    : item.type === 'tf'
                    ? '트윗 유저 주소'
                    : ''
                }
              />
              {item.type === 'tt' ? (
                <TextField
                  label="태그할 인원 수"
                  variant="filled"
                  value={item.count}
                  onChange={(e: any) => {
                    const newArr: any = props.items.slice();
                    newArr[i].count = e.target.value;
                    props.onChange(newArr);
                  }}
                  type="number"
                  helperText={
                    ['tt'].includes(item.type) &&
                    item.value.indexOf('https://twitter.com/') === 0
                      ? `tweet Id: ${item.value.split('/').pop()}`
                      : ''
                  }
                />
              ) : null}
            </Stack>
          </ListItem>
        );
      })}
    </List>
  );
};
export default RaffleDragItems;
