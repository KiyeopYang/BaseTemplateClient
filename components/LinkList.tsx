import { Stack, Box, Divider } from '@mui/material';
import Link from 'next/link';
import { ListItem } from 'components/List';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Colors } from 'constants/theme';
import { SxProps } from 'libs/sx';

interface Item {
  label: string;
  valueLabel?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  sx?: SxProps;
}
type Props = {
  sx?: SxProps;
  listItemSx?: SxProps;
  items: Item[];
};
const LinkList = (props: Props) => (
  <Stack sx={props.sx} direction="column" alignItems="center">
    {props.items.map(({ label, valueLabel, disabled, href, onClick, sx }) => {
      const listItemSx = {
        ...styles.listItem,
        ...props.listItemSx,
        ...sx,
      } as SxProps;
      return onClick ? (
        <ListItem
          sx={listItemSx}
          title={label}
          value={
            <Stack direction="row" alignItems="center">
              <Box sx={styles.valueLabel}>{valueLabel}</Box>
              <KeyboardArrowRight />
            </Stack>
          }
          role="button"
          onClick={onClick}
          disableRipple
        />
      ) : href ? (
        <Link key={label} href={href}>
          <ListItem
            sx={listItemSx}
            title={label}
            disabled={Boolean(disabled)}
            value={
              <Stack direction="row" alignItems="center">
                <Box sx={styles.valueLabel}>{valueLabel}</Box>
                <KeyboardArrowRight />
              </Stack>
            }
            disableRipple
          />
        </Link>
      ) : (
        <ListItem
          sx={listItemSx}
          title={label}
          disabled={Boolean(disabled)}
          value={
            <Stack direction="row" alignItems="center">
              <Box sx={styles.valueLabel}>{valueLabel}</Box>
              <KeyboardArrowRight />
            </Stack>
          }
          disableRipple
        />
      );
    })}
  </Stack>
);

const styles = {
  listItem: {
    padding: '18px 24px',
    ':active, :hover': {
      backgroundColor: Colors.grey['100'],
    },
    borderBottom: '1px solid #efefef',
  },
  valueLabel: {
    fontSize: 16,
    marginRight: '8px',
  },
};

export default LinkList;
