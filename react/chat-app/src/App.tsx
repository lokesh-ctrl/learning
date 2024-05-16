// routes
import Router from "./routes";
import {createTheme, ThemeProvider} from "@mui/material";
import {green, purple} from "@mui/material/colors";

function App() {
    const theme = createTheme({
        palette: {
            primary: green,
            secondary: purple,
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    );
}

export default App;
