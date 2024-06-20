import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type ComponentProps = {
    children: ReactNode;
    user: string | null;
}

export default function LoginButton({children, user}: ComponentProps) {

    return (    
        <Box>
            
            <Typography sx={ {fontSize: '10px'} }>            
                {children}                        
            </Typography>

            <Typography sx={ {fontSize: '12px'} }>
                {user}
            </Typography>

        </Box>    
    );

}