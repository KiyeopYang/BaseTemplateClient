/* global XLSX */

import { useState, useMemo, useCallback, useEffect } from 'react';

import { RaffleEntry, RaffleEntryStatus } from 'types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChangeRaffleEntriesStatus from './ChangeRaffleEntriesStatus';
import { useContext as useConfirmContext } from '../contexts/confirm';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import RaffleEntryDialog from './RaffleEntryDialog';
import { AddRounded } from '@mui/icons-material';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridFooterContainer,
  GridInitialState,
  GridSelectionModel,
  GridFilterModel,
} from '@mui/x-data-grid';
import Table from './RaffleEntriesTable';
import { isMobile } from 'react-device-detect';

import {
  Box,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { raffleEntries } from 'apis/index';
import { Colors } from 'constants/theme';

const getRowClassName = (params: any) => `raffle-entries--${params.row.status}`;
const gridStyles = {
  width: '100%',
  cursor: 'pointer',
  borderRadius: 0,
  border: `1px solid ${Colors.grey[200]}`,
  padding: 0,
  '& .MuiDataGrid-cell': {
    borderBottomWidth: `1px !important`,
    '&.Mui-selected': {
      borderBottomWidth: `1px !important`,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-checkboxInput': {
    color: Colors.grey[900],
  },
  '& .raffle-entries--invalidated': {
    bgcolor: Colors.secondary[400],
    color: 'white',
    '&:hover': {
      bgcolor: Colors.secondary[400],
    },
    '&.Mui-selected': {
      bgcolor: Colors.secondary[400],
      '&:hover': {
        bgcolor: Colors.secondary[400],
      },
      '& .MuiDataGrid-checkboxInput': {
        color: 'white',
      },
    },
    '& .MuiDataGrid-checkboxInput': {
      color: 'white',
    },
  },
  '& .raffle-entries--winner': {
    bgcolor: Colors.primary[500],
    color: 'white',
    borderBottomWidth: `1px !important`,
    '&:hover': {
      bgcolor: Colors.primary[500],
    },
    '&.Mui-selected': {
      bgcolor: Colors.primary[500],
      borderBottomWidth: `1px !important`,
      '&:hover': {
        bgcolor: Colors.primary[500],
      },
      '& .MuiDataGrid-checkboxInput': {
        color: 'white',
      },
    },
    '& .MuiDataGrid-checkboxInput': {
      color: 'white',
    },
  },
  '& .Mui-selected': {
    bgcolor: Colors.primary[500],
  },
};

type Props = {
  entries: RaffleEntry[];
  loading?: boolean;
  refetch?: () => void;
  getTwitterName: boolean;
  getDiscordName: boolean;
  getTelegramName: boolean;
  getWalletAddress?: boolean;
};
const RaffleEntries = (props: Props) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [, confirmActions] = useConfirmContext();

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const { mutateAsync: changeStatus, isLoading: isLoadingSetStatus } =
    raffleEntries.useSetStatus();

  const rows: GridRowsProp = useMemo(() => {
    return props.entries.map((entry) => ({
      ...entry,
      username:
        typeof entry.user === 'object' && entry.user ? entry.user.username : '',
    }));
  }, [props.entries]);
  const [dialogOn, setDialogOn] = useState(false);
  const [columns, zoomColumns]: [GridColDef[], GridColDef[]] = useMemo(() => {
    const cols: GridColDef[] = [];
    const colsZoom: GridColDef[] = [];

    const datetime = {
      field: 'datetime',
      headerName: '시각',
      width: 150,
      valueGetter: (params: any) =>
        dayjs(params.row.created_at).format('YYYY.MM.DD HH:mm'),
    };
    cols.push(datetime);
    colsZoom.push({ ...datetime, width: 150 });

    const status = {
      field: 'status',
      headerName: '상태',
      // valueGetter: (params: any) => {
      //   const status = params.row.status;
      //   return status === 'invalidated'
      //     ? '제외'
      //     : status === 'winner'
      //     ? '당첨'
      //     : '';
      // },
      width: 100,
    };
    cols.push(status);
    colsZoom.push({ ...status, width: 100 });

    const username = {
      field: 'username',
      headerName: '유저',
    };
    cols.push(username);
    colsZoom.push({ ...username, width: 200 });
    if (props.getTwitterName) {
      const obj = {
        field: 'twitterName',
        headerName: '트위터',
      };
      cols.push(obj);
      colsZoom.push({ ...obj, width: 200 });
    }
    if (props.getTelegramName) {
      const obj = {
        field: 'discordName',
        headerName: '디스코드',
      };
      cols.push(obj);
      colsZoom.push({ ...obj, width: 200 });
    }
    if (props.getDiscordName) {
      const obj = {
        field: 'telegramName',
        headerName: '텔레그램',
      };
      cols.push(obj);
      colsZoom.push({ ...obj, width: 200 });
    }
    if (props.getWalletAddress) {
      const obj = {
        field: 'walletAddress',
        headerName: '지갑',
      };
      cols.push(obj);
      colsZoom.push({ ...obj, width: 500 });
    }
    // const obj = {
    //   field: '_detail',
    //   headerName: '상세',
    //   renderCell: (params: any) => (
    //     <Button
    //       fullWidth
    //       disableRipple
    //       sx={{ color: params.row.status === 'none' ? 'black' : 'white' }}
    //       onClick={() => {
    //         setRaffleEntryDialog({
    //           open: true,
    //           entry: params.row,
    //         });
    //       }}
    //     >
    //       상세
    //     </Button>
    //   ),
    // };
    // cols.push(obj);
    // colsZoom.push({ ...obj, width: 100 });
    return [cols, colsZoom];
  }, [
    props.getTwitterName,
    props.getDiscordName,
    props.getTelegramName,
    props.getWalletAddress,
  ]);

  const [selectOn, setSelectOn] = useState(false);

  const [changeRaffleEntriesStatusOn, setChangeRaffleEntriesStatusOn] =
    useState(false);

  const [raffleEntryDialog, setRaffleEntryDialog] = useState<{
    open: boolean;
    entry: RaffleEntry | null;
  }>({
    open: false,
    entry: null,
  });
  const loading = props.loading || isLoadingSetStatus;

  const numbers: {
    winner: number;
    invalidated: number;
    none: number;
  } = useMemo(() => {
    return rows.reduce(
      (acc, val) => {
        acc[val.status] += 1;
        return acc;
      },
      { winner: 0, invalidated: 0, none: 0 }
    );
  }, [rows]);
  const duplicatedWalletRows = useMemo(() => {
    const sets = rows.reduce((acc, val) => {
      if (val?.walletAddress) {
        if (val.status !== 'invalidated') {
          if (acc[val.walletAddress]) {
            acc[val.walletAddress].push(val);
          } else {
            acc[val.walletAddress] = [val];
          }
        }
      }
      return acc;
    }, {});
    let results: any = [];
    for (const key in sets) {
      if (sets[key].length < 2) {
        delete sets[key];
      } else {
        results = results.concat(...sets[key]);
      }
    }
    return results;
  }, [rows]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const statusFilter =
    filterModel.items.find((item) => item.columnField === 'status')?.value ||
    '';
  const [isDuplicatedFilter, setIsDuplicatedFilter] = useState(false);

  useEffect(() => {
    setSelectionModel([]);
  }, [statusFilter, isDuplicatedFilter]);

  const setDuplicateFilterAndModel = () => {
    setIsDuplicatedFilter(true);

    setFilterModel({
      items: [
        {
          columnField: 'walletAddress',
          operatorValue: 'isAnyOf',
          value: (duplicatedWalletRows as any).map(
            ({ walletAddress }: any) => walletAddress
          ),
        },
      ],
    });
  };
  const StatusFilterButtons = () => (
    <Stack
      sx={{
        width: '100%',
      }}
    >
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={isDuplicatedFilter ? 'duplicated' : statusFilter}
        exclusive
        onChange={(_, next) => {
          const filterItems = [];
          if (next === 'duplicated') {
            setDuplicateFilterAndModel();
          } else {
            if (isDuplicatedFilter) {
              setIsDuplicatedFilter(false);
            }

            filterItems.push({
              columnField: 'status',
              operatorValue: 'equals',
              value: next,
            });
            setFilterModel({
              items: filterItems,
            });
          }
        }}
      >
        <ToggleButton value="" sx={styles.withoutBorderRadius}>
          전체({numbers.winner + numbers.invalidated + numbers.none})
        </ToggleButton>
        <ToggleButton value="winner" sx={styles.withoutBorderRadius}>
          당첨({numbers.winner})
        </ToggleButton>
        <ToggleButton value="invalidated" sx={styles.withoutBorderRadius}>
          제외({numbers.invalidated})
        </ToggleButton>
        <ToggleButton value="none" sx={styles.withoutBorderRadius}>
          추첨 대기 중({numbers.none})
        </ToggleButton>
        <ToggleButton
          value="duplicated"
          sx={[
            styles.withoutBorderRadius,
            duplicatedWalletRows.length > 0 ? { color: 'red' } : null,
          ]}
          color={duplicatedWalletRows.length > 0 ? 'secondary' : 'standard'}
          disabled={duplicatedWalletRows.length === 0}
        >
          중복({duplicatedWalletRows.length})
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
  useEffect(() => {
    if (window.innerWidth < 600) {
      alert('이 페이지는 PC에 최적화 되어 있습니다.');
    } else {
      setDialogOn(true);
    }
  }, []);
  const Footer = () => (
    <Stack direction="column" sx={{ width: '100%' }} spacing={1}>
      <ButtonGroup
        variant="outlined"
        sx={[styles.withoutBorderRadius, styles.footer]}
        disableRipple
        disableElevation
      >
        <Button
          onClick={() => {
            const next = !dialogOn;
            setDialogOn(next);
          }}
          startIcon={dialogOn ? <ZoomOut /> : <ZoomIn />}
          sx={[styles.buttonText, styles.withoutBorderRadius]}
          variant="contained"
        >
          {dialogOn ? '축소' : '확대'}
        </Button>
        <Button
          onClick={() => {
            const data = rows.map((row) => ({
              datetime: dayjs(row.created_at).format('YYYY.MM.DD HH:mm:ss'),
              wallet: row.walletAddress,
              status: row.status,
              user: row.username || '',
              twitter: row.twitterName,
              discord: row.discordName,
              telegram: row.telegramName,
            }));
            // /* generate worksheet and workbook */
            // @ts-ignore
            const worksheet = XLSX.utils.json_to_sheet(data);
            // @ts-ignore
            const workbook = XLSX.utils.book_new();
            // @ts-ignore
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Entries');

            // @ts-ignore
            XLSX.writeFile(
              workbook,
              `Entries_${dayjs().format('YYYY_MM_DD_HH_mm')}.xlsx`
            );
          }}
          sx={[styles.buttonText, styles.withoutBorderRadius]}
        >
          엑셀(전체)
        </Button>
        <Button
          // onClick={() => {
          //   setDialogOn(true);
          // }}
          // sx={[styles.buttonText, styles.withoutBorderRadius]}
          disabled
          sx={[styles.buttonText, styles.withoutBorderRadius]}
          startIcon={<AddRounded />}
        >
          추가
        </Button>
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        sx={[styles.withoutBorderRadius, styles.footer]}
        disableRipple
        disableElevation
      >
        <Button
          sx={[styles.buttonText, styles.withoutBorderRadius]}
          variant={'contained'}
          color="secondary"
          size="large"
          disableRipple
          disableElevation
          disabled={!selectOn}
          onClick={() => {
            if (selectionModel.length > 0) setChangeRaffleEntriesStatusOn(true);
            else {
              alert('데이터를 선택해주세요.');
            }
          }}
        >
          {!selectOn ? '상태 변경' : `${selectionModel.length}개 상태 변경`}
        </Button>
        <Button
          sx={[
            styles.buttonText,
            styles.withoutBorderRadius,
            { width: '130px' },
          ]}
          color="primary"
          variant={'outlined'}
          size="large"
          onClick={() => {
            setSelectionModel([]);
            setSelectOn((p) => !p);
          }}
          disableRipple
          disableElevation
        >
          {selectOn ? '선택하기 취소' : '선택하기'}
        </Button>
        {statusFilter === 'none' ? (
          <Button
            sx={[styles.buttonText, styles.withoutBorderRadius]}
            variant={'outlined'}
            color="primary"
            size="large"
            disableRipple
            disableElevation
            disabled={!selectOn}
            onClick={() => {
              confirmActions
                .open(
                  '무작위 선택',
                  '무작위로 선택할 참여자 수를 입력해주세요.',
                  ['취소', '확인'],
                  {
                    label: '선택 수',
                    type: 'number',
                    value: '1',
                  }
                )
                .then(async ({ button, value }: any) => {
                  if (button === '확인' && value) {
                    const no = Number(value);
                    if (no && no <= rows.length) {
                      const ids = rows
                        .filter((row) => row.status === 'none')
                        .slice()
                        .map(({ id }) => id);
                      const selectedIds: number[] = [];
                      for (let i = 0; i < no; i += 1) {
                        const idx = Math.floor(Math.random() * ids.length);
                        const id = ids[idx];
                        if (id) {
                          selectedIds.push(id);
                          ids.splice(idx, 1);
                        }
                      }
                      setSelectionModel(selectedIds);
                    }
                  }
                });

              // const remained: { id: number; walletAddress: string }[] = [];
              // const toInvalidate: number[] = [];
              // duplicatedWalletRows.forEach((row: any) => {
              //   const found = remained.find(
              //     (selected) => selected.walletAddress === row.walletAddress
              //   );
              //   if (found) {
              //     toInvalidate.push(row.id);
              //   } else {
              //     remained.push({
              //       id: row.id,
              //       walletAddress: row.walletAddress,
              //     });
              //   }
              // });
              // setSelectOn(true);
              // setSelectionModel(toInvalidate);
            }}
          >
            무작위 선택
          </Button>
        ) : null}
        {isDuplicatedFilter ? (
          <Button
            sx={[styles.buttonText, styles.withoutBorderRadius]}
            variant={'outlined'}
            color="primary"
            size="large"
            disableRipple
            disableElevation
            onClick={() => {
              const remained: { id: number; walletAddress: string }[] = [];
              const toInvalidate: number[] = [];
              duplicatedWalletRows.forEach((row: any) => {
                const found = remained.find(
                  (selected) => selected.walletAddress === row.walletAddress
                );
                if (found) {
                  toInvalidate.push(row.id);
                } else {
                  remained.push({
                    id: row.id,
                    walletAddress: row.walletAddress,
                  });
                }
              });
              setSelectOn(true);
              setSelectionModel(toInvalidate);
            }}
          >
            제거할 중복 자동 선택
          </Button>
        ) : (
          <></>
        )}
      </ButtonGroup>
    </Stack>
  );
  return (
    <>
      {dialogOn ? null : (
        <>
          <StatusFilterButtons />
          <DataGrid
            pageSize={100}
            sx={gridStyles}
            rows={rows}
            onRowClick={(params) => {
              if (!selectOn)
                setRaffleEntryDialog({
                  open: true,
                  entry: params.row,
                });
            }}
            disableSelectionOnClick={!selectOn}
            loading={loading}
            columns={columns}
            checkboxSelection={selectOn}
            density="compact"
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            getRowClassName={getRowClassName}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
          />
          <Footer />
        </>
      )}
      <Dialog
        fullWidth
        // fullScreen
        maxWidth="xl"
        open={dialogOn}
        onClose={() => {
          setDialogOn(false);
        }}
        transitionDuration={0}
      >
        {dialogOn ? (
          <>
            <AppBar elevation={0} sx={{ position: 'relative' }}>
              <Toolbar>
                <Typography sx={{ flex: 1 }} variant="h6" component="div">
                  참여자 {rows.length}명
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setDialogOn(false);
                  }}
                  aria-label="close"
                >
                  <CloseOutlined />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <StatusFilterButtons />
              <Box sx={{ overflow: 'hidden' }}>
                <DataGrid
                  // autoHeight
                  sx={{
                    ...gridStyles,
                    '& .MuiDataGrid-main': {
                      height: '500px',
                      overflowY: 'scroll',
                    },
                  }}
                  pageSize={100}
                  loading={loading}
                  rows={rows}
                  columns={zoomColumns}
                  getRowClassName={getRowClassName}
                  disableSelectionOnClick={!selectOn}
                  checkboxSelection={selectOn}
                  density="compact"
                  onRowClick={(params) => {
                    if (!selectOn)
                      setRaffleEntryDialog({
                        open: true,
                        entry: params.row,
                      });
                  }}
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) =>
                    setFilterModel(newFilterModel)
                  }
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Footer />
            </DialogActions>
          </>
        ) : null}
      </Dialog>
      {changeRaffleEntriesStatusOn ? (
        <ChangeRaffleEntriesStatus
          open={changeRaffleEntriesStatusOn}
          onClose={() => {
            setChangeRaffleEntriesStatusOn(false);
          }}
          entries={selectionModel.map((id) => rows.find((r) => r.id == id))}
          onChangeType={async (type) => {
            setSelectionModel([]);
            setChangeRaffleEntriesStatusOn(false);
            const ids = selectionModel;
            if (type === 'invalidated') {
              await changeStatus({
                ids: ids.map(Number),
                status: 'invalidated',
              });
            } else if (type === 'winner') {
              await changeStatus({
                ids: ids.map(Number),
                status: 'winner',
              });
            } else {
              await changeStatus({
                ids: ids.map(Number),
                status: 'none',
              });
            }

            if (props.refetch) props.refetch();
          }}
          onlyInvalidate={isDuplicatedFilter}
        />
      ) : null}
      <RaffleEntryDialog
        open={raffleEntryDialog.open}
        entry={raffleEntryDialog.entry}
        onlyInvalidate={isDuplicatedFilter}
        onUpdateEntryStatus={async (status) => {
          const { data }: any = await changeStatus({
            ids: raffleEntryDialog.entry?.id
              ? [raffleEntryDialog.entry?.id]
              : [],
            status,
          });
          if (data && data[0]) {
            const user = raffleEntryDialog.entry?.user;

            setRaffleEntryDialog({
              open: true,
              entry: user ? { ...data[0], user } : data[0],
            });
            if (props.refetch) props.refetch();
          }
        }}
        onClose={() => {
          setRaffleEntryDialog((v) => ({ ...v, open: false }));
        }}
      />
    </>
  );
};
const styles = {
  buttonText: {
    textTransform: 'none',
    fontSize: 14,
  },
  buttonTextSmall: {
    textTransform: 'none',
    fontSize: 11,
  },
  actionButton: {
    // width: 160,
  },
  footer: {
    // borderBottom: `1px solid ${Colors.primary[300]}`,
    // borderLeft: `1px solid ${Colors.primary[300]}`,
    // borderRight: `1px solid ${Colors.primary[300]}`,
  },
  filterButton: {},
  withoutBorderRadius: { borderRadius: 0 },
};
export default RaffleEntries;
