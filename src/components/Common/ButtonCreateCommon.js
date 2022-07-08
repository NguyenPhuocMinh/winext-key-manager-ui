import { useTranslate } from 'story-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonCreateCommon = (props) => {
  const { label, redirect } = props;

  const { translate } = useTranslate();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirect);
  };

  return (
    <Button
      sx={{
        textTransform: 'capitalize'
      }}
      startIcon={<AddCircleIcon />}
      onClick={handleClick}
      variant="contained"
    >
      {translate(label)}
    </Button>
  );
};

export default ButtonCreateCommon;
