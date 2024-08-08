import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("saytv-chat");
const shadowContainer = container.attachShadow({ mode: "open" });
const shadowRootElement = document.createElement("div");
shadowContainer.appendChild(shadowRootElement);

const cache = createCache({
  key: "css",
  prepend: true,
  container: shadowContainer,
});

const shadowTheme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement,
      },
    },
  },
});

createRoot(shadowRootElement).render(
  <StrictMode>
    <CacheProvider value={cache}>
      {/* <ThemeProvider theme={shadowTheme}> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      {/* </ThemeProvider> */}
    </CacheProvider>
  </StrictMode>
);
