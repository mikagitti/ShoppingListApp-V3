import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

type ComponentProps = {
  children: ReactNode;
  user: string | null;
  width?: string;
  height?: string;
};

export default function LoginButton({ children, user, width, height }: ComponentProps) {
  const boxStyle = {
    width: width ? width : '100%',
    height: height ? height : '100%',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1',
  };

  const textStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%', // Ensure this is set so the ellipsis can work
  };

  return (
    <Box sx={boxStyle}>
      <Box>{user && <Typography sx={{ ...textStyle, fontSize: '12px' }}>{user}</Typography>}</Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <AssistWalkerIcon />
        <Typography sx={{ ...textStyle, fontSize: '10px' }}>{children}</Typography>
        <EmojiPeopleIcon />
      </Box>
    </Box>
  );
}
