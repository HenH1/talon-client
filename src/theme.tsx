import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
    palette: {
        text: {
            primary: "#FFFFFF",
            secondary: "#919EAB",
        },
        background: {
            default: "#000000",
            paper: "#222B36"
        },
    },
    typography: {
        "fontFamily": `Roboto`,
        "fontSize": 14,
        "fontWeightRegular": 400,
    },
});