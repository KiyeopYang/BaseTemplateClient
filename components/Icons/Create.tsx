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
    <g id="Iconly/Light/Edit Square">
      <g id="Edit Square">
        <path
          id="Stroke 1"
          d="M11.4922 2.78894H7.75324C4.67824 2.78894 2.75024 4.96594 2.75024 8.04794V16.3619C2.75024 19.4439 4.66924 21.6209 7.75324 21.6209H16.5772C19.6622 21.6209 21.5812 19.4439 21.5812 16.3619V12.3339"
          stroke={props.color || defaultColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.82763 10.9209L16.3006 3.44787C17.2316 2.51787 18.7406 2.51787 19.6716 3.44787L20.8886 4.66487C21.8196 5.59587 21.8196 7.10587 20.8886 8.03587L13.3796 15.5449C12.9726 15.9519 12.4206 16.1809 11.8446 16.1809H8.09863L8.19263 12.4009C8.20663 11.8449 8.43363 11.3149 8.82763 10.9209Z"
          stroke={props.color || defaultColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Stroke 5"
          d="M15.165 4.60242L19.731 9.16842"
          stroke={props.color || defaultColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
