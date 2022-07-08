import { Box } from '@mui/material';

const BoxItemCommon = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx
      }}
      {...other}
    />
  );
};

export default BoxItemCommon;
