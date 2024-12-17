import React, { useContext, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { modalStyle, backgroundStyle } from "./style";
import { GetAdminByUserNameAndPassword } from "@/Database/dbConnectionV3";
import LoginContext from "@/Context/login/LoginContext";

type ModalProps = {
     onClose: () => void;
};

export default function Login({ onClose }: ModalProps) {
     const { selectAdmin } = useContext(LoginContext);

     const [username, setUsername] = useState<string>("");
     const [password, setPassword] = useState<string>("");

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          if (username && password) {
               const isAdminUserValid = await GetAdminByUserNameAndPassword(
                    username,
                    password
               );

               if (isAdminUserValid) {
                    selectAdmin(username);
                    onClose();
               }
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
                              minwidth: 300,
                         }}
                         onSubmit={handleSubmit}
                         noValidate
                         autoComplete="off"
                    >
                         <Typography variant="h6">
                              Type your username and password
                         </Typography>

                         <TextField
                              label="Username"
                              variant="outlined"
                              required
                              fullWidth
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                         />

                         <TextField
                              label="Password"
                              type="password"
                              variant="outlined"
                              required
                              fullWidth
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                                   Login
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
