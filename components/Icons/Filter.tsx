const SvgComponent = (props: { size?: number; color?: string }) => (
  <svg
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 21.125H14.25"
      stroke={props.color || '#212121'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 11.125H23"
      stroke={props.color || '#212121'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.75 16.125H20.5"
      stroke={props.color || '#212121'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
