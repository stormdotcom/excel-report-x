import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import AppRoutes from "./routes/AppRoutes";
import ProjectLayout from "./project/ProjectLayout";
import { useEffect } from "react";
import { isAuthenticated } from "./common/utils";
import { FileProvider } from "./app/FileContext";

function App() {
  useEffect(() => {
    if (!isAuthenticated()) {
      // window.location.reload("/login");
    }
  }, []);
  return (
    <div className="App">
      <FileProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ProjectLayout>
            <AppRoutes />
          </ProjectLayout>
        </ThemeProvider>
      </FileProvider>
    </div>
  );
}

export default App;
