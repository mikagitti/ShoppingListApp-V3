import { alignProperty } from '@mui/material/styles/cssUtils';

export const ListStyle = {
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
};

export const IconStyle = {
  fontSize: '35px',
};

export const BoxStyle = {
  display: 'flex',
  justifyContent: 'center',
};

export const ListBoxStyle = {
  display: 'flex',
  justifyContent: 'center',
};

export const ListItemStyle = {
  width: '500px',
};

export const ButtonStyle = {
  border: 'solid 2px',
  width: '12rem',
  height: '4rem',
  borderRadius: '10px',
};

export const PrimaryButtonStyle = {
  ...ButtonStyle,
  backgroundColor: 'blue',
  color: 'white',
};

export const SecondaryButtonStyle = {
  ...ButtonStyle,
  backgroundColor: 'gray',
  color: 'black',
};

export const DangerButtonStyle = {
  ...ButtonStyle,
  backgroundColor: 'red',
  color: 'white',
};
