import { Box, Skeleton, Stack } from '@mui/material';

const ProductSkeleton = () => {
  return (
    <Box component={'div'} sx={{width: '250px'}}>
      <Skeleton
        animation='wave'
        variant='rectangular'
        width={250}
        height={150}
      />
      <Skeleton animation='wave' variant='text' />
      <Stack direction={'row'} spacing={1}>
        <Skeleton animation='wave' variant='circular' width={50} height={50} />
        <Skeleton animation='wave' variant='text' width='78%' />
      </Stack>
      <Skeleton animation='wave' variant='text' width='100px' />
      <Skeleton animation='wave' variant='rectangular' height={30} />
    </Box>
  );
};

export default ProductSkeleton;
