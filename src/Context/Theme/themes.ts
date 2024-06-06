import { green, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
     palette: {
          mode: "light",
          primary: {
               main: "#90caf9",
               light: "#a6d4fa",
               dark: "#648dae",
               contrastText: "#050606",
          },
          secondary: {
               main: "#ff3d00",
               light: "#ff6333",
               dark: "#b22a00",
               contrastText: "#050606",
          },
     },
     components: {
          MuiTextField: {
               defaultProps: {
                    // You can set default props here
               },
               styleOverrides: {
                    root: {
                         color: "red",
                    },
               },
          },
          MuiOutlinedInput: {
               styleOverrides: {
                    root: {
                         "& fieldset": {
                              borderColor: "green", // Default border color
                         },
                         "&:hover fieldset": {
                              borderColor: "blue", // Border color on hover
                         },
                         "&.Mui-focused fieldset": {
                              borderColor: "purple", // Border color when focused
                         },
                    },
               },
          },
          MuiInputLabel: {
               styleOverrides: {
                    root: {
                         // Default label color
                         color: "black",
                         // Label color when the input is focused
                         "&.Mui-focused": {
                              color: "red",
                         },
                    },
               },
          },
          MuiInput: {
               styleOverrides: {
                    root: {
                         "&:before": {
                              // Underline color
                              borderBottomColor: "cyan",
                         },
                         "&:hover:not(.Mui-disabled):before": {
                              // Underline color on hover
                              borderBottomColor: "darkcyan",
                         },
                         "&.Mui-focused:before": {
                              // Underline color when focused
                              borderBottomColor: "magenta",
                         },
                         fontSize: "20px",
                    },
               },
          },
          MuiButton: {
               styleOverrides: {
                    root: {
                         fontSize: "1rem",
                         color: "rgba(0,0,0,0.87)",
                         border: "solid 1px",
                    },
                    text: {
                         primary: "rgba(0,0,0,0.87)",
                    },
               },
          },
          MuiLink: {
               styleOverrides: {
                    root: {
                         fontSize: "1rem",
                         color: "black",
                    },
               },
          },
          MuiSwitch: {
               styleOverrides: {
                    root: {
                         // Customize the root style here if needed
                    },
                    switchBase: {
                         color: "#ff5722",
                         "&.Mui-checked": {
                              color: "#4caf50", // checked color
                         },
                         "&.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#4caf50", // track color when checked
                         },
                    },
                    track: {
                         backgroundColor: "#ffccbc", // default track color
                    },
                    thumb: {
                         // Customize the thumb color here if needed
                    },
               },
          },
     },
});

export const darkTheme = createTheme({
     palette: {
          mode: "dark",
          primary: {
               main: "#1a237e",
               light: "#474f97",
               dark: "#121858",
               contrastText: "#ffffff",
          },
          secondary: {
               main: "#880e4f",
               light: "#9f3e72",
               dark: "#5f0937",
               contrastText: "#ffffff",
          },
     },
     components: {
          MuiButton: {
               styleOverrides: {
                    root: {
                         fontSize: "1rem",
                         color: "#fff",
                         border: "solid 1px",
                    },
                    text: {
                         primary: "rgba(0,0,0,0.87)",
                    },
               },
          },
     },
});
