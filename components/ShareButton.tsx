import { ShareRounded, IosShare } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { isIOS } from 'react-device-detect';

type Props = {
  iconSize?: number | null;
};
const ShareButton = (props: Props) => {
  const isios = isIOS;
  return (
    <IconButton
      sx={{ ml: 1 }}
      color="primary"
      size="large"
      onClick={() => {
        navigator.share({
          title: document.title,
          url: window.location.href,
        });
      }}
    >
      {isios ? (
        <IosShare sx={{ fontSize: props.iconSize || 30 }} />
      ) : (
        <ShareRounded sx={{ fontSize: props.iconSize || 30 }} />
      )}
    </IconButton>
  );
};

export default ShareButton;
