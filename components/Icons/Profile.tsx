import { Colors } from 'constants/theme';

const defaultColor = Colors.primary['500'];

const SvgComponent = (props: { fill?: string; color?: string }) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={props.fill || 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2348 15.3462C8.36716 15.3462 5.0643 15.931 5.0643 18.2729C5.0643 20.6148 8.3462 21.2205 12.2348 21.2205C16.1024 21.2205 19.4043 20.6348 19.4043 18.2938C19.4043 15.9529 16.1233 15.3462 12.2348 15.3462Z"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2348 12.0059C14.7729 12.0059 16.83 9.94779 16.83 7.40969C16.83 4.8716 14.7729 2.81445 12.2348 2.81445C9.69667 2.81445 7.63858 4.8716 7.63858 7.40969C7.63001 9.93922 9.67382 11.9973 12.2024 12.0059H12.2348Z"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
