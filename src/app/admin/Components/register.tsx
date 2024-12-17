import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { backgroundStyle, modalStyle } from "./style";
import { AddNewAdmin } from "@/Database/dbConnectionV3";

interface ModalProps {
     onClose: () => void;
}

export default function Register({ onClose }: ModalProps) {
     const [username, setUsername] = useState<string>("");
     const [password, setPassword] = useState<string>("");

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (username && password) {
               await AddNewAdmin(username, password);
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
                         <Typography variant="h6">Register</Typography>

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
