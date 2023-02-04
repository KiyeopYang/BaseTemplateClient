import React from 'react';
import Box from '@mui/material/Box';
import { SxProps } from 'libs/sx';
import Loader from 'components/Loader';
import Observer from 'components/Observer';

type Props<T> = {
  data: T[];
  sx?: SxProps | null;
  onEndReached?: () => void;
  renderItem: ({ item }: { item: T }) => React.ReactNode;
  hasNextPage?: boolean;
  ListEmptyComponent?: React.ReactNode;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
};
const InfiniteScroll = <T,>(props: Props<T>) => {
  return (
    <Box sx={{ ...styles.root, ...props.sx }}>
      {props.ListHeaderComponent || null}
      {props.data.map((item) => props.renderItem({ item }))}
      {props.hasNextPage ? (
        <Observer
          onObserved={() => {
            if (props.onEndReached) props.onEndReached();
          }}
        >
          <Box sx={styles.loader}>
            <Loader />
          </Box>
        </Observer>
      ) : props.data.length === 0 && props.ListEmptyComponent ? (
        props.ListEmptyComponent
      ) : (
        props.ListFooterComponent || null
      )}
    </Box>
  );
};
const styles = {
  root: {
    height: '100%',
  },
  loader: {
    marginTop: '36px',
  },
};
export default InfiniteScroll;
