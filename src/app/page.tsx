import { Box, Typography } from "@mui/material";
import React from "react";

export default function Home() {
     return (
          <Box
               sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60svh",
               }}
          >
               <Typography
                    sx={{ fontSize: { xs: "3rem", md: "6rem" } }}
                    component="div"
               >
                    Welcome!
               </Typography>
          </Box>
     );
}
