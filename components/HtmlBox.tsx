import parse from 'html-react-parser';
import { Box, Typography } from '@mui/material';
import { useLocalizationContext } from 'contexts/Localization';

type Props = {
  isHtml?: boolean;
  content: string;
  content_ko?: string;
};
const HtmlBox = (props: Props) => {
  const { locale } = useLocalizationContext();
  return (
    <Box
      sx={{
        '& img': {
          width: '100%',
        },
        '& p': {
          margin: 0,
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.5,
          whiteSpace: 'pre-line',
          wordBreak: 'break-word',
        },
      }}
    >
      {props.isHtml ? (
        parse(
          locale === 'ko' && props.content_ko ? props.content_ko : props.content
        )
      ) : (
        <Typography
          sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
          component="div"
        >
          {locale === 'ko' && props.content_ko
            ? props.content_ko
            : props.content}
        </Typography>
      )}
    </Box>
  );
};
export default HtmlBox;
