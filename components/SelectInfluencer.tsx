import { useState } from 'react';
import { influencer as influencerApi } from 'apis';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps } from 'libs/sx';
import { Influencer } from 'types';

type Props = {
  sx?: SxProps;
  disabled?: boolean;
  value: number | null;
  onChange: (influencer: Partial<Influencer> | null) => void;
};
export default function SelectInfluencer(props: Props) {
  const { data } = influencerApi.useGet1000Influencers();
  const [inputValue, setInputValue] = useState('');

  let found: Influencer | null = null;
  if (props.value) {
    found = data?.influencers?.find(({ id }) => id === props.value) || null;
  }
  return (
    <Autocomplete
      disablePortal
      disabled={props.disabled}
      value={found?.name || ''}
      onChange={(_, v) => {
        if (v) {
          const found = data?.influencers?.find(({ name }) => name === v);
          if (found) {
            props.onChange(found);
          }
        } else {
          props.onChange(null);
        }
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={data?.influencers?.map(({ name }) => name) || []}
      sx={props.sx}
      renderInput={(params) => (
        <TextField {...params} label="인플루언서" size="small" />
      )}
    />
  );
}
