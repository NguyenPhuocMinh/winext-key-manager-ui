import { useTranslate } from 'story-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ContactSupportCommon = ({ title = 'common.tooltip.title' }) => {
  const { translate } = useTranslate();

  return (
    <Tooltip
      sx={{ marginLeft: '1em' }}
      title={translate(title)}
      placement="right"
      arrow
    >
      <HelpOutlineIcon />
    </Tooltip>
  );
};

export default ContactSupportCommon;
