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
      d="M9.90722 20.7714V17.7047C9.9072 16.9246 10.5431 16.2908 11.331 16.2856H14.2171C15.0087 16.2856 15.6505 16.9209 15.6505 17.7047V17.7047V20.7809C15.6503 21.4432 16.1843 21.9845 16.853 22H18.7771C20.6951 22 22.25 20.4607 22.25 18.5618V18.5618V9.83784C22.2398 9.09083 21.8855 8.38935 21.288 7.93303L14.7077 2.6853C13.5549 1.77157 11.9162 1.77157 10.7634 2.6853L4.21203 7.94256C3.61226 8.39702 3.25739 9.09967 3.25 9.84736V18.5618C3.25 20.4607 4.80488 22 6.72291 22H8.64696C9.33235 22 9.88797 21.4499 9.88797 20.7714V20.7714"
      stroke={props.color || defaultColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
