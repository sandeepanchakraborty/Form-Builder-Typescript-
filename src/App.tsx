// ...existing code...
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CreateFormPage from "./pages/CreateFormPage";
import PreviewFormPage from "./pages/PreviewFormPage";
import MyFormsPage from "./pages/MyFormsPage";
import FillFormPage from "./pages/FillFormPage";
import FilledFormsPage from "./pages/FilledFormsPage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Starfield from "./components/Starfield";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Starfield background */}
        <Starfield />
        <Router>
          <AppBar
            position="static"
            sx={{
              bgcolor: "#111",
              color: "#ffe600",
              boxShadow: "0 8px 32px 0 rgba(255, 255, 0, 0.25)",
              borderBottom: "2px solid #ffe600",
            }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Button
                  sx={{
                    color: "#ffe600",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#ffe600", color: "#111" },
                  }}
                  component={RouterLink}
                  to="/create"
                >
                  Create
                </Button>
                <Button
                  sx={{
                    color: "#ffe600",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#ffe600", color: "#111" },
                  }}
                  component={RouterLink}
                  to="/preview"
                >
                  Preview
                </Button>
                <Button
                  sx={{
                    color: "#ffe600",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#ffe600", color: "#111" },
                  }}
                  component={RouterLink}
                  to="/myforms"
                >
                  My Forms
                </Button>
                <Button
                  sx={{
                    color: "#ffe600",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#ffe600", color: "#111" },
                  }}
                  component={RouterLink}
                  to="/filled"
                >
                  Submitted Forms
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/preview" element={<PreviewFormPage />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/fill/:id" element={<FillFormPage />} />
            <Route path="/filled" element={<FilledFormsPage />} />
            <Route path="*" element={<Navigate to="/create" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
