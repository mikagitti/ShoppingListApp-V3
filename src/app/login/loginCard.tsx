import {
     Box,
     Button,
     IconButton,
     TextField,
     Typography,
     styled,
} from "@mui/material";
import { UpdateUserName } from "@/Database/dbConnectionV3";
import { useContext, useState } from "react";
import LoginContext from "@/Context/login/LoginContext";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { UserType } from "@/Database/types";

type loginProp = {
     user: UserType;
};

const frameStyle = {
     border: "solid 5px gray",
     borderRadius: "25px",
     p: "10px",
};

const boxStyle = {
     display: "flex",
     flexDirection: "row",
     alignItems: "center",
     gap: 2,
     p: "10px",
};

const CustomLink = styled(Link)(({ theme }) => ({
     color: theme.palette.primary.contrastText,
     textDecoration: "none",
     "&:hover": {
          color: theme.palette.primary.light,
     },
     display: "flex",
     gap: 2,
     flexDirection: "row",
     alignItems: "center",
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
     border: "0px",
}));

export default function LoginCard({ user }: loginProp) {
     const { selectUser } = useContext(LoginContext);

     const [openUpdate, setOpenUpdate] = useState(false);
     const [newName, setNewName] = useState(user.name);

     const clickSelect = (user: UserType) => {
          selectUser(user.id);
     };

     const saveUserName = async () => {
          console.log(newName);
          await UpdateUserName({ id: user.id, name: newName });
          user.name = newName;
          setOpenUpdate(false);
     };

     const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                                   width: 300, // Custom width
                                   bgcolor: "background.paper", // Custom background color
                              }}
                         />
                         <CustomButton onClick={() => saveUserName()}>
                              Save
                         </CustomButton>
                    </Box>
               ) : (
                    <Box sx={boxStyle}>
                         <Box>
                              <IconButton
                                   onClick={() => setOpenUpdate(!openUpdate)}
                                   color="primary"
                              >
                                   <EditIcon />
                              </IconButton>
                         </Box>

                         <Box>
                              <Typography
                                   variant="h5"
                                   sx={{ textTransform: "uppercase" }}
                              >
                                   {newName}
                              </Typography>
                         </Box>

                         <Box>
                              <CustomLink href="/shoppinglist_v2">
                                   <CustomButton
                                        onClick={() => clickSelect(user)}
                                   >
                                        Log me in
                                   </CustomButton>
                              </CustomLink>
                         </Box>
                    </Box>
               )}
          </Box>
     );
}
