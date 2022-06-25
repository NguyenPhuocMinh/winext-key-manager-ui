import { SHOW_POPUP } from '../customTypes';

export const showPopup = ({ open, title, content, onSubmit, options }) => ({
  type: SHOW_POPUP,
  payload: {
    open,
    title,
    content,
    onSubmit,
    options
  }
});
