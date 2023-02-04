import ToggleButton from '@mui/material/ToggleButton';

type Props = {
  disabled?: boolean;
  selected: boolean;
  onToggle: () => void;
  value: string;
};
const ToggleTag = ({ disabled, selected, onToggle, value }: Props) => (
  <ToggleButton
    value="check"
    size="small"
    disableRipple
    disabled={disabled}
    sx={
      selected
        ? {
            border: (theme) =>
              `1px solid ${theme.palette.primary.main} !important`,
            textTransform: 'none',
          }
        : { backgroundColor: 'white', textTransform: 'none' }
    }
    color="primary"
    selected={selected}
    onChange={onToggle}
  >
    {value}
  </ToggleButton>
);
export default ToggleTag;
