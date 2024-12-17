import { useContext, useState } from "react";
import Link from "next/link";

import {
     Box,
     Button,
     IconButton,
     TextField,
     Typography,
     styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from '@mui/icons-material/Login';

import { UpdateUserName } from "@/Database/dbConnectionV3";
import LoginContext from "@/Context/login/LoginContext";
import { UserType } from "@/Database/types";

type loginProp = {
     user: UserType;
};

const frameStyle = {
     border: "solid 4px gray",
     borderRadius: "25px",
     m: "1px 10px",
     p: "10px",
};

const boxStyle = {
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
};

const leftSection = {
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     gap: 2,
};

const CustomLink = styled(Link)(({ theme }) => ({
     color: theme.palette.primary.contrastText,
     textDecoration: "none",
     "&:hover": {
          color: theme.palette.primary.light,
     },
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     border: "solid 1px",
     borderRadius: "5px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
     color: theme.palette.primary.contrastText,
     textDecoration: "none",
     "&:hover": {
          color: theme.palette.secondary.dark,
     },
     display: "flex",
     gap: 2,
     flexDirection: "row",
     alignItems: "center",
}));

export default function LoginCard({ user }: loginProp) {
     const { selectUser } = useContext(LoginContext);

     const [openUpdate, setOpenUpdate] = useState(false);
     const [newName, setNewName] = useState(user.name);

     const clickSelect = (user: UserType) => {
          selectUser(user.id);
     };

     const saveUserName = async () => {
          await UpdateUserName({ id: user.id, name: newName });
          user.name = newName;
          setOpenUpdate(false);
     };

     const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {

          const name = event.target.value;

          if (name.length > 49) {
               return;
          }

          setNewName(event.target.value);
     };

     return (
          <Box sx={frameStyle}>
               {openUpdate ? (
                    <Box sx={boxStyle}>
                         <TextField
                              label="Enter your name"
                              variant="outlined"
                              value={newName}
                              onChange={handleNameChange}
                              sx={{
                                   width: "100%",
                                   m: 1,
                              }}
                         />
                         <CustomButton onClick={() => saveUserName()}>
                              Save
                         </CustomButton>
                    </Box>
               ) : (
                    <Box sx={boxStyle}>
                         <Box sx={leftSection}>
                              <Box>
                                   <IconButton sx={{ border: 'solid 1px' }} onClick={() => setOpenUpdate(!openUpdate)}>
                                        <EditIcon />
                                   </IconButton>
                              </Box>

                              <Box>
                                   <Typography sx={{ textTransform: "uppercase" }}>
                                        {newName}
                                   </Typography>
                              </Box>
                         </Box>

                         <Box>
                              <CustomLink href="/shoppinglist_v2">
                                   <IconButton onClick={() => clickSelect(user)}>
                                        <Typography>Login</Typography>
                                        <LoginIcon />
                                   </IconButton>
                              </CustomLink>
                         </Box>
                    </Box>
               )}
          </Box>
     );
}
