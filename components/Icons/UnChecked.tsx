import { Colors } from 'constants/theme';

const defaultColor = Colors.primary['500'];

const SvgComponent = (props: { color?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.3344 2.75024H7.66543C4.64443 2.75024 2.75043 4.88924 2.75043 7.91624V16.0842C2.75043 19.1112 4.63543 21.2502 7.66543 21.2502H16.3334C19.3644 21.2502 21.2504 19.1112 21.2504 16.0842V7.91624C21.2504 4.88924 19.3644 2.75024 16.3344 2.75024Z"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
