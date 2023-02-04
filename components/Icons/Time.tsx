import { Colors } from 'constants/theme';

const defaultColor = Colors.primary['500'];

const SvgComponent = (props: { color?: string }) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.4998 12.0005C21.4998 17.1095 17.3588 21.2505 12.2498 21.2505C7.14079 21.2505 2.99979 17.1095 2.99979 12.0005C2.99979 6.89149 7.14079 2.75049 12.2498 2.75049C17.3588 2.75049 21.4998 6.89149 21.4998 12.0005Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      css={{
        stroke: props.color || defaultColor,
      }}
    />
    <path
      d="M15.6814 14.9429L11.9114 12.6939V7.84692"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      css={{
        stroke: props.color || defaultColor,
      }}
    />
  </svg>
);

export default SvgComponent;
