import { useState, useEffect } from 'react';
import {
  influencer as influencerApi,
  profile as profileApi,
  raffle as raffleApi,
  twitter as twitterApi,
} from 'apis';
import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Image from 'components/Image';
import { useLocalizationContext } from 'contexts/Localization';
import { SocialAccount } from 'types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext as useConfirmContext } from 'contexts/confirm';
import LoadingButton from '@mui/lab/LoadingButton';
import { useProtectedPage } from 'libs/auth';
import { uploadImage } from 'libs/files';
import IconButton from '@mui/material/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import Add from '@mui/icons-material/Add';
import Link from 'next/link';
import RaffleItem from 'components/RaffleItem';
import * as Url from 'libs/url';

type Props = {
  id?: number | null;
};
const Influencer = (props: Props) => {
  const isCreate = !props.id;
  const { t } = useLocalizationContext();

  const influencerId = isCreate ? null : Number(props.id);
  const { data: profile } = profileApi.useGet();
  const { data: influencer, isLoading } = influencerApi.useInfluencer(
    influencerId,
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: raffles } = raffleApi.useGetRafflesByInfluencer({
    influencerId: influencer?.id,
  });

  const { mutateAsync: updateInfluencer, isLoading: isUpdating } =
    influencerApi.useUpdate();
  const { mutateAsync: createInfluencer } = influencerApi.useCreate();
  const { mutateAsync: deleteInfluencer } = influencerApi.useDelete();
  const [, confirmActions] = useConfirmContext();

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const thumbnail = await uploadImage(file);
      setThumbnail(thumbnail);
    }
  };

  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>('');
  const [urlName, setUrlName] = useState<string>('');
  const [twitterFollowers, setTwitterFollowers] = useState<number>(0);
  const [shortDescription, setShortDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>();
  const [url, setUrl] = useState<string>('');
  const [opensea, setOpensea] = useState<string>('');
  const [magiceden, setMagiceden] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [discord, setDiscord] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [kakao, setKakao] = useState<string>('');
  const [otherSocialAccounts, setOtherSocialAccounts] = useState<
    SocialAccount[]
  >([]);

  const [loadingTwitter, setLoadingTwitter] = useState(false);

  useEffect(() => {
    if (isCreate) {
      // setProject()
    } else if (influencer && !isCreate) {
      setId(influencer.id);
      setThumbnail(influencer.thumbnail);
      setName(influencer.name || '');
      setTwitterFollowers(influencer.twitterFollowers || 0);
      setUrlName(influencer.urlName || '');
      setShortDescription(influencer.shortDescription || '');
      setDescription(influencer.description || '');
      setUrl(influencer.url || '');
      setTwitter(influencer.twitter || '');
      setDiscord(influencer.discord || '');
      setTelegram(influencer.telegram || '');
      setKakao(influencer.kakao || '');
      setBlog(influencer.blog || '');
      setFacebook(influencer.facebook || '');
      setInstagram(influencer.instagram || '');
      setMagiceden(influencer.magiceden || '');
      setOpensea(influencer.opensea || '');
      setYoutube(influencer.youtube || '');
      setOtherSocialAccounts(influencer.otherSocialAccounts.values || '');
    }
  }, [influencer, isCreate]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        sx={{ ...styles.fields, background: 'white', p: 2, borderRadius: 4 }}
        alignItems="flex-start"
        spacing={2}
      >
        {isCreate ? null : (
          <TextField label="id" size="small" disabled fullWidth value={id} />
        )}
        <Typography>트위터</Typography>
        <TextField
          size="small"
          label="주소"
          fullWidth
          placeholder="https://twitter.com/get_raffle"
          value={twitter}
          helperText={`Twitter Followers : ${twitterFollowers}`}
          onChange={(e: any) => {
            setTwitter(e.target.value);
          }}
        />
        <LoadingButton
          loading={loadingTwitter}
          variant="outlined"
          disabled={twitter.indexOf('https://twitter.com/') !== 0}
          onClick={async () => {
            try {
              setLoadingTwitter(true);
              const username = Url.getLastPath(twitter);
              if (username) {
                const { data } = await twitterApi.getUserByUsername(username);
                if (data.public_metrics.followers_count) {
                  setTwitterFollowers(data.public_metrics.followers_count);
                }
                setName(data.name);
                setThumbnail(data.profileImg);
                setUrl(twitter);
                if (data.description) {
                  setDescription(data.description);
                }
              }
            } catch (e) {
              console.error(e);
              alert('오류가 있습니다.');
            } finally {
              setLoadingTwitter(false);
            }
          }}
        >
          트위터로 이름/썸네일/소개 불러오기
        </LoadingButton>
        <Typography>정보</Typography>

        <TextField
          size="small"
          label="이름"
          fullWidth
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="고유 id"
          fullWidth
          value={urlName}
          onChange={(e: any) => {
            setUrlName(e.target.value.trim());
          }}
          helperText={`https://getraffle.io/u/${urlName}`}
        />
        <ButtonBase component="label" disableRipple sx={styles.thumbnailButton}>
          <Typography>썸네일</Typography>
          <input hidden accept="image/*" type="file" onChange={handleUpload} />
          {thumbnail ? (
            <Image
              src={thumbnail}
              width={120}
              height={120}
              alt={'avatar'}
              css={styles.thumbnailImg}
            />
          ) : (
            <Box sx={styles.thumbnailImgButton}>
              <Typography>추가</Typography>
            </Box>
          )}
        </ButtonBase>
        <TextField
          size="small"
          label="한 줄 소개"
          fullWidth
          multiline
          value={shortDescription}
          onChange={(e: any) => {
            setShortDescription(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="소개"
          fullWidth
          multiline
          value={description}
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="메인 링크"
          fullWidth
          value={url}
          onChange={(e: any) => {
            setUrl(e.target.value);
          }}
        />
        <Typography>링크</Typography>
        <TextField
          size="small"
          label="오픈씨"
          fullWidth
          value={opensea}
          onChange={(e: any) => {
            setOpensea(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="매직에덴"
          fullWidth
          value={magiceden}
          onChange={(e: any) => {
            setMagiceden(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="디스코드"
          fullWidth
          value={discord}
          onChange={(e: any) => {
            setDiscord(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="텔레그램"
          fullWidth
          value={telegram}
          onChange={(e: any) => {
            setTelegram(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="블로그"
          fullWidth
          value={blog}
          onChange={(e: any) => {
            setBlog(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="인스타그램"
          fullWidth
          value={instagram}
          onChange={(e: any) => {
            setInstagram(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="페이스북"
          fullWidth
          value={facebook}
          onChange={(e: any) => {
            setFacebook(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="유튜브"
          fullWidth
          value={youtube}
          onChange={(e: any) => {
            setYoutube(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="카카오"
          fullWidth
          value={kakao}
          onChange={(e: any) => {
            setKakao(e.target.value);
          }}
        />
        <Stack alignItems="center" direction="row" sx={styles.fulLWidth}>
          <Typography sx={styles.linkTitle}>기타 링크</Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setOtherSocialAccounts([
                ...otherSocialAccounts,
                {
                  name: '',
                  url: '',
                },
              ]);
            }}
            startIcon={<Add />}
          >
            추가하기
          </Button>
        </Stack>
        {otherSocialAccounts.map((item, i) => (
          <Stack key={i} direction="row" spacing={2}>
            <TextField
              size="small"
              label="링크 이름"
              fullWidth
              value={item.name}
              onChange={(e: any) => {
                const newItem = {
                  ...item,
                  name: e.target.value,
                };
                const newArr = otherSocialAccounts.slice();
                newArr[i] = newItem;
                setOtherSocialAccounts(newArr);
              }}
            />
            <TextField
              size="small"
              label="링크 주소"
              fullWidth
              value={item.url}
              onChange={(e: any) => {
                const newItem = {
                  ...item,
                  url: e.target.value,
                };
                const newArr = otherSocialAccounts.slice();
                newArr[i] = newItem;
                setOtherSocialAccounts(newArr);
              }}
            />
            <IconButton
              onClick={() => {
                const newArr = otherSocialAccounts.slice();
                newArr.splice(i, 1);
                setOtherSocialAccounts(newArr);
              }}
            >
              <CloseRounded />
            </IconButton>
          </Stack>
        ))}

        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            onClick={() => {
              if (urlName.length < 3) {
                alert('url이름은 최소 3자 이상으로 입력해주세요.');
              } else {
                confirmActions
                  .open(
                    `크리에이터 ${isCreate ? '생성' : '수정'}`,
                    `${isCreate ? '생성' : '수정'}하시겠습니까?`,
                    [
                      t('list-pre.noti_cancel_no'),
                      t('list-pre.noti_cancel_yes'),
                    ]
                  )
                  .then(async (answer) => {
                    if (answer === t('list-pre.noti_cancel_yes')) {
                      const body = {
                        name,
                        urlName,
                        shortDescription,
                        description,
                        thumbnail,
                        url,
                        twitter,
                        discord,
                        telegram,
                        kakao,
                        blog,
                        facebook,
                        instagram,
                        magiceden,
                        opensea,
                        youtube,
                        twitterFollowers,
                        otherSocialAccounts: {
                          values: otherSocialAccounts,
                        },
                      };
                      try {
                        if (isCreate) {
                          const result = await createInfluencer(body);
                        } else if (influencer) {
                          await updateInfluencer({
                            id: influencer.id,
                            ...body,
                          });
                          confirmActions.open('수정', '수정 완료 되었습니다.');
                        } else {
                          alert('오류가 있습니다.');
                        }
                      } catch (e) {
                        alert(
                          '오류가 있거나 같은 값을 가진 데이터가 이미 있습니다.'
                        );
                      }
                    }
                  });
              }
            }}
            loading={isUpdating}
          >
            인플루언서 {isCreate ? '생성' : '수정'}
          </LoadingButton>
        </Stack>
      </Stack>
      {influencer ? (
        <Stack sx={styles.raffles}>
          <Stack
            direction="row"
            alignItems="center"
            sx={styles.raffleTitleWrapper}
          >
            <Typography sx={styles.raffleTitle}>
              래플 {raffles?.count || 0}개
            </Typography>
            <Link href={`/admin/raffle/create?influencer=${influencer.id}`}>
              <Button variant="outlined">생성하기</Button>
            </Link>
          </Stack>
          {raffles?.data?.map((raffle) => (
            <RaffleItem
              href={`/admin/raffle/${raffle.id}`}
              item={raffle}
              key={raffle.id}
              sx={styles.raffleItem}
            />
          ))}
        </Stack>
      ) : null}
    </LocalizationProvider>
  );
};
const styles = {
  fields: { width: '100%', mt: 2 },
  thumbnailButton: {
    border: '1px solid #dddddd',
    flexDirection: 'column',
    alignItems: 'flex-start',
    p: 1,
    borderRadius: '4px',
  },
  thumbnailImg: { border: '1px solid #dddddd' },
  thumbnailImgButton: {
    width: 120,
    height: 120,
    border: '1px solid #dddddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTitle: {
    flex: 1,
  },
  fulLWidth: {
    width: '100%',
  },
  raffles: {
    width: '100%',
    px: 2,
    mt: 4,
    borderTop: '1px solid #dddddd',
    pt: 2,
    mb: 4,
  },
  raffleTitleWrapper: { marginBottom: 2 },
  raffleTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  raffleItem: { mb: 1 },
};
export default Influencer;
