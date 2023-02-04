import { useState } from 'react';
import { project as projectApi } from 'apis';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps } from 'libs/sx';
import { Project } from 'types';

type Props = {
  type?: '';
  sx?: SxProps;
  disabled?: boolean;
  value: number | null;
  onChange: (project: Partial<Project>) => void;
};
export default function SelectProject(props: Props) {
  const { data } = projectApi.useGet1000Projects();
  const [inputValue, setInputValue] = useState('');

  let found: any = null;
  if (props.value) {
    found = data?.projects?.find(({ id }) => id === props.value) || null;
  }
  return (
    <Autocomplete
      disablePortal
      disabled={props.disabled}
      value={found?.name || ''}
      onChange={(_, v) => {
        const found = data?.projects?.find(({ name }) => name === v);
        if (found) {
          props.onChange(found as any);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={data?.projects?.map(({ name }) => name) || []}
      sx={props.sx}
      renderInput={(params) => (
        <TextField {...params} label="프로젝트" size="small" />
      )}
    />
  );
}
