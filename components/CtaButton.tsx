import { forwardRef, ForwardedRef } from 'react';
import { styled, darken } from '@mui/material/styles';
import { Colors } from 'constants/theme';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

const StyledButton = styled(LoadingButton)({
  padding: '16px 18px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: Colors.primary['500'],
  borderColor: Colors.primary['500'],
  borderRadius: '16px',
  ':active': {
    background: darken(Colors.primary['500'], 0.1),
  },
  '&.MuiLoadingButton-loading': {
    backgroundColor: 'white !important',
  },
  '&.Mui-disabled': {
    backgroundColor: 'white !important',
    borderColor: Colors.grey['400'],
  },
});
const CtaButton = (
  { children, loading, ...rest }: LoadingButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <StyledButton
      fullWidth
      variant="contained"
      disableRipple
      disableElevation
      loading={loading}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledButton>
  );
};
export default forwardRef(CtaButton);
