import { useState } from 'react';
import { project as projectApi } from 'apis';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps } from 'libs/sx';
import { Project } from 'types';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  sx?: SxProps;
  disabled?: boolean;
  value: number | null;
  onChange: (project: Partial<Project> | null) => void;
  byTwitter?: boolean;
};
export default function SelectProject(props: Props) {
  const { data, refetch } = projectApi.useGet1000Projects();
  const [inputValue, setInputValue] = useState('');

  let found: any = null;
  if (props.value) {
    found = data?.projects?.find(({ id }) => id === props.value) || null;
  }
  const [twitter, setTwitter] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const getProjectByTwitter = async () => {
    let twitterName = twitter.trim();
    if (twitterName.indexOf('https://twitter.com/') === 0) {
      twitterName = twitterName.slice('https://twitter.com/'.length);
    }
    if (twitterName.length === 0) {
      alert('트위터 주소를 입력해주세요.');
    } else {
      setLoading(true);
      try {
        // https://twitter.com/zenogakki
        const twitterInfo = await projectApi.getByTwitterName(twitterName);
        // if (twitterInfo) {
        //   router.push(`/admin/project/${twitterInfo.id}`);
        // } else {
        //   alert('잘못된 정보가 입력되었습니다.');
        // }
        if (twitterInfo?.id) {
          const project = await projectApi.getProject({
            id: twitterInfo.id,
            onlyPublished: false,
          });
        }
      } catch (e: any) {
        alert('잘못된 정보가 입력되었습니다.');
        alert(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Stack>
      {props.byTwitter ? (
        <>
          <TextField
            label="NFT 프로젝트의 트위터 주소"
            size="small"
            helperText="ex) https://twitter.com/get_raffle"
            value={twitter}
            onChange={(e) => {
              setTwitter(e.target.value);
            }}
          />
          <Box>
            <LoadingButton
              variant="outlined"
              loading={loading}
              onClick={getProjectByTwitter}
            >
              입력
            </LoadingButton>
          </Box>
        </>
      ) : (
        <Autocomplete
          disablePortal
          disabled={props.disabled}
          value={found?.name || ''}
          onChange={(_, v) => {
            if (v) {
              const found = data?.projects?.find(({ name }) => name === v);
              if (found) {
                props.onChange(found as any);
              }
            } else {
              props.onChange(null);
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
      )}
    </Stack>
  );
}
