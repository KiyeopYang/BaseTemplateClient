import { forwardRef, ForwardedRef } from 'react';
import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { SxProps, toArray } from 'libs/sx';

type ListProps = {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  value?: string | null;
  sx?: SxProps;
  titleSx?: SxProps;
  subTitleSx?: SxProps;
  valueSx?: SxProps;
};
export const List = ({
  children,
  title,
  subTitle,
  sx,
  titleSx,
  value,
  valueSx,
  subTitleSx,
}: ListProps) => {
  return (
    <Box sx={[styles.list, ...toArray(sx)]}>
      <Box sx={styles.listTitleWrapper}>
        {title || value ? (
          <Box sx={styles.listItem}>
            {title ? (
              <Text sx={{ ...styles.listTitle, ...titleSx }}>{title}</Text>
            ) : null}
            {typeof value === 'undefined' ? null : (
              <Text sx={{ ...styles.listItemValue, ...valueSx }}>{value}</Text>
            )}
          </Box>
        ) : null}
        {subTitle ? (
          <Text sx={[styles.listSubtitle, ...toArray(subTitleSx)]}>
            {subTitle}
          </Text>
        ) : null}
      </Box>
      {children}
    </Box>
  );
};

interface ListItemProps extends Omit<ButtonBaseProps, 'value'> {
  title?: string;
  value?: string | number | null | React.ReactNode;
  subValue?: string;

  sx?: SxProps;
  titleSx?: SxProps;
  valueSx?: SxProps;
}

export const ListItem = forwardRef(
  (
    {
      title,
      value,
      disabled,
      onClick,
      children,
      sx,
      titleSx,
      valueSx,
      ...rest
    }: ListItemProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ButtonBase
        disabled={disabled || !onClick}
        onClick={onClick || undefined}
        sx={{ ...styles.listItem, ...sx }}
        {...rest}
        ref={ref}
      >
        {title || typeof value !== 'undefined' ? (
          <>
            {title ? (
              <Text sx={{ ...styles.listItemLabel, ...titleSx }}>{title}</Text>
            ) : null}
            {typeof value === 'undefined' ? null : (
              <Box sx={{ ...styles.listItemValue, ...valueSx }}>{value}</Box>
            )}
          </>
        ) : null}
        {children ? children : null}
      </ButtonBase>
    );
  }
);
const styles = {
  list: {
    padding: '20px 24px 20px',
  },
  listTitleWrapper: {
    marginBottom: '12px',
  },
  listTitle: {
    fontSize: '20px',
    fontWeight: '700',
    flex: 1,
  },
  listSubtitle: {
    fontSize: '12px',
  },
  listItem: {
    width: '100%',
    display: 'flex',
    padding: '8px 0px',
    alignItems: 'center',
  },
  listItemLabel: {
    fontSize: '16px',
    flex: 1,
    textAlign: 'left',
  },
  listItemValue: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: 'primary.main',
    fontWeight: '500',
  },
} as const;
