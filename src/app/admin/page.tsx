"use client";

import {
     Box,
     Button,
     Typography,
     useMediaQuery,
     useTheme,
     Paper,
     Grid,
     styled,
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useContext, useState } from "react";
import Register from "./Components/register";
import Login from "./Components/login";
import LoginContext from "@/Context/login/LoginContext";
import NewUser from "./Components/newUser";
import { User } from "@/Database/types";
import { DeleteUserById } from "@/Database/dbConnectionV3";

const CustomButton = styled(Button)(({ theme }) => ({
     "&:hover": {
          color: theme.palette.secondary.light,
          fontWeight: "bold",
     },

     border: "none",
     overflow: "hidden",
}));

export default function Home() {
     const theme = useTheme();
     const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
     const [newAdminModalOpen, setNewAdminModalOpen] = useState<boolean>(false);
     const [newUserModalOpen, setNewUserModalOpen] = useState<boolean>(false);
     const [loginAdminModalOpen, setLoginAdminModalOpen] =
          useState<boolean>(false);
     const { selectedAdmin, logoutAdmin, userList, removeUserFromList } =
          useContext(LoginContext);

     const typographyStyle = {
          fontFamily: "Chevin, sans-serif",
          m: isPhone ? "2px" : "6px",
          fontSize: isPhone ? "3.2rem" : "4.2rem",
          letterSpacing: "-.015em",
          lineHeight: isPhone ? "3.6rem" : "4.4rem",
     };

     const iconStyle = {
          fontSize: isPhone ? "2rem" : "3rem",
     };

     const iconBoxStyle = {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          m: "20px",
          gap: "2rem",
     };

     const adminButtons = () => {
          return (
               <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <Grid container spacing={2}>
                         <Grid item xs={12}>
                              <Paper
                                   elevation={3}
                                   sx={{
                                        padding: 2,
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                   }}
                              >
                                   <CustomButton
                                        onClick={() =>
                                             setNewAdminModalOpen(true)
                                        }
                                   >
                                        Add new Admin
                                   </CustomButton>
                              </Paper>
                         </Grid>

                         <Grid item xs={12}>
                              <Paper
                                   elevation={3}
                                   sx={{
                                        padding: 2,
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                   }}
                              >
                                   <CustomButton
                                        onClick={() =>
                                             setNewUserModalOpen(true)
                                        }
                                   >
                                        Add new User
                                   </CustomButton>
                              </Paper>
                         </Grid>

                         <Grid item xs={12}>
                              <Paper
                                   elevation={3}
                                   sx={{
                                        padding: 2,
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                   }}
                              >
                                   <CustomButton onClick={logoutAdmin}>
                                        Logout admin dsds sd
                                   </CustomButton>
                              </Paper>
                         </Grid>
                    </Grid>
               </Box>
          );
     };

     const adminPageLoggedIn = (
          <>
               <Typography sx={typographyStyle}>
                    This is Admin page, welcome!
               </Typography>
               {adminButtons()}
          </>
     );

     const iconRow = () => {
          return (
               <Box sx={iconBoxStyle}>
                    <AdminPanelSettingsOutlinedIcon sx={iconStyle} />
                    <AdminPanelSettingsOutlinedIcon sx={iconStyle} />
                    <AdminPanelSettingsOutlinedIcon sx={iconStyle} />
               </Box>
          );
     };

     const adminPageNotLoggedIn = (
          <>
               <Typography color={"primary"} sx={typographyStyle}>
                    Welcome
               </Typography>

               <Typography sx={typographyStyle}>to</Typography>

               <Typography color={"secondary"} sx={typographyStyle}>
                    Admin page!
               </Typography>

               <Typography paragraph>Pages are under development...</Typography>

               <Button
                    variant="outlined"
                    onClick={() => setLoginAdminModalOpen(true)}
               >
                    Login as Administrator
               </Button>
          </>
     );

     const deleteUser = async (user: User) => {
          console.log("Delete user");
          if (await DeleteUserById(user.id)) {
               removeUserFromList(user);
          }
     };

     return (
          <Box
               sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: "20px",
               }}
          >
               {iconRow()}
               {selectedAdmin != null
                    ? adminPageLoggedIn
                    : adminPageNotLoggedIn}
               {iconRow()}

               {selectedAdmin && userList.length > 0 && (
                    <Box sx={{ flexGrow: 1 }}>
                         <Grid
                              container
                              style={{
                                   justifyContent: "center",
                                   alignItems: "center",
                              }}
                         >
                              <Grid
                                   item
                                   p={2}
                                   xs={12}
                                   sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                   }}
                              >
                                   <Typography variant="h6" gutterBottom>
                                        User List
                                   </Typography>
                              </Grid>
                              <Box
                                   sx={{
                                        flexGrow: 1,
                                        padding: 2,
                                        maxWidth: "calc(100% - 100px)",
                                   }}
                              >
                                   <Grid container spacing={2}>
                                        {[...userList]
                                             .sort((a, b) =>
                                                  a.name.localeCompare(b.name)
                                             )
                                             .map((user, index) => (
                                                  <Grid
                                                       item
                                                       xs={12}
                                                       sm={6}
                                                       md={4}
                                                       key={index}
                                                  >
                                                       <Paper
                                                            elevation={3}
                                                            sx={{ padding: 2 }}
                                                       >
                                                            <Box
                                                                 display="flex"
                                                                 alignItems="center"
                                                                 flexDirection="row"
                                                                 justifyContent="space-between"
                                                            >
                                                                 <Typography
                                                                      variant="h6"
                                                                      gutterBottom
                                                                      sx={{
                                                                           whiteSpace:
                                                                                "nowrap",
                                                                           overflow:
                                                                                "hidden",
                                                                           textOverflow:
                                                                                "ellipsis",
                                                                           maxWidth:
                                                                                "calc(100% - 100px)", // Adjust based on the delete button and padding
                                                                      }}
                                                                 >
                                                                      {
                                                                           user.name
                                                                      }
                                                                 </Typography>

                                                                 <Button
                                                                      onClick={() =>
                                                                           deleteUser(
                                                                                user
                                                                           )
                                                                      }
                                                                 >
                                                                      delete
                                                                 </Button>

                                                                 {/* Add more content or buttons here */}
                                                            </Box>
                                                       </Paper>
                                                  </Grid>
                                             ))}
                                   </Grid>
                              </Box>
                         </Grid>
                    </Box>
               )}
               {selectedAdmin && iconRow()}

               {newAdminModalOpen && (
                    <Register onClose={() => setNewAdminModalOpen(false)} />
               )}
               {newUserModalOpen && (
                    <NewUser onClose={() => setNewUserModalOpen(false)} />
               )}
               {loginAdminModalOpen && (
                    <Login onClose={() => setLoginAdminModalOpen(false)} />
               )}
          </Box>
     );
}
