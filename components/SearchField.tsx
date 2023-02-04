import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Colors } from 'constants/theme';
import { Search as SearchIcon, Filter as FilterIcon } from 'components/Icons';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

type Props = {
  placeholder?: string | null;
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
};
const SearchField = (props: Props) => {
  return (
    <Stack sx={styles.root}>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Box sx={styles.form}>
          <IconButton sx={styles.search}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={styles.input}
            placeholder={props.placeholder || ''}
            value={props.value}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
          {props.value.length > 0 ? (
            <IconButton
              sx={styles.close}
              onClick={() => {
                props.onChange('');
              }}
            >
              <CloseIcon sx={styles.closeIcon} />
            </IconButton>
          ) : null}
        </Box>
        {props.onFilterClick ? (
          <Box sx={styles.filterBox}>
            <IconButton
              sx={styles.filterIcon}
              onClick={() => {
                props.onFilterClick && props.onFilterClick();
              }}
            >
              <FilterIcon size={30} />
            </IconButton>
          </Box>
        ) : null}
      </Stack>
    </Stack>
  );
};
const styles = {
  root: {
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'flex',
  },
  close: { marginRight: '4px' },
  closeIcon: {
    width: '16px',
    height: '16px',
  },
  form: {
    background: Colors.grey['50'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    borderRadius: '16px',
    height: '46px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: { ml: '6px', mr: '4', flex: 1 },
  search: {
    width: '36px',
    height: '36px',
    marginLeft: '8px',
  },
  filterBox: {
    paddingLeft: '12px',
  },
  filterIcon: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    background: Colors.primary['100'],
    ':hover, :active': {
      background: Colors.primary['100'],
    },
    width: '46px',
    height: '46px',
    borderRadius: '16px',
    display: 'flex',
  },
};

export default SearchField;
