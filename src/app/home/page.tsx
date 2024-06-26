"use client";
import { Box, Typography, styled } from "@mui/material";

const mainBox = {
     display: "flex",
     alignItems: "left",
     flexDirection: "column",
     py: 2,
     px: 5,
     m: 5,
     bgcolor: "#4e8399",
     borderRadius: "1.5rem",
};

const HeadText = styled(Typography)(({ theme }) => ({
     color: theme.palette.primary.contrastText,
     fontSize: "2rem",
}));

const MainText = styled(Typography)(({ theme }) => ({
     color: theme.palette.primary.contrastText,
     fontSize: "1rem",
}));

export default function Home() {
     return (
          <Box sx={mainBox}>
               <HeadText>Welcome to my pages</HeadText>
               <MainText>Pages are under development.</MainText>
          </Box>
     );
}
