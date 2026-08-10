import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    background: #f5f7fb;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    background: #f5f7fb;
    color: #111827;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button,
  input {
    font: inherit;
  }
`;

export default GlobalStyle;
