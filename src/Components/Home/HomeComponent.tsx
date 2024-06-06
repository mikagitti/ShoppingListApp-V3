import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Home() {
    return (
        <>
            <Box>
                <Typography color={red[300]} variant="h4">
                    NOTE!<br/>
                    This is old version of shopping list
                </Typography>                
            </Box>
            <Box sx={{ padding: 3, border: 'solid', marginTop: 5 }}> 
                <Typography variant="h5">
                    Welcome Shopping!
                </Typography>
                
                <Typography paragraph>    
                    This is shopping list app!            
                </Typography>

                <Typography>    
                    Check, edit, remove products as you wish!
                </Typography>            
            </Box>
        </>
    );
  }


  