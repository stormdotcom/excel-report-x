import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import AppRoutes from "./routes/AppRoutes";
import ProjectLayout from "./project/ProjectLayout";

import { isAuthenticated } from "./common/utils";
import { FileProvider } from "./app/FileContext";

function App() {
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
