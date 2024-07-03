import React, { useContext, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { AddNewUser } from "@/Database/dbConnectionV3";
import LoginContext from "@/Context/login/LoginContext";
import { backgroundStyle, modalStyle } from "./style";

interface ModalProps {
     onClose: () => void;
}

export default function NewUser({ onClose }: ModalProps) {
     const { addNewUser } = useContext(LoginContext);
     const [username, setUsername] = useState<string>("");

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (username) {
               const newUser = await AddNewUser(username);
               if (newUser) addNewUser(newUser);
               onClose();
          } else {
               console.log("Submit error: username or password missing");
          }
     };

     const handleClose = () => {
          onClose();
     };

     return (
          <div style={modalStyle}>
               <Box sx={backgroundStyle}>
                    <Box
                         component="form"
                         sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              width: 300,
                         }}
                         onSubmit={handleSubmit}
                         noValidate
                         autoComplete="off"
                    >
                         <Typography variant="h6">Add new user</Typography>

                         <TextField
                              label="Username"
                              variant="outlined"
                              required
                              fullWidth
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                         />

                         <Box
                              sx={{
                                   display: "flex",
                                   justifyContent: "space-between",
                              }}
                         >
                              <Button
                                   type="submit"
                                   variant="contained"
                                   color="primary"
                              >
                                   Save
                              </Button>

                              <Button
                                   onClick={() => handleClose()}
                                   variant="outlined"
                                   color="secondary"
                              >
                                   Close
                              </Button>
                         </Box>
                    </Box>
               </Box>
          </div>
     );
}
