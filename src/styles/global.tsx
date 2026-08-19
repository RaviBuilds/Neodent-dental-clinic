import { createGlobalStyle } from "@mantine/core";

const globalStyles = createGlobalStyle({
  body: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    lineHeight: "1.5",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  h1: {
    fontSize: "32px",
    lineHeight: "1.2",
    marginBottom: "1rem",
  },
  h2: {
    fontSize: "24px",
    lineHeight: "1.3",
    marginBottom: "0.5rem",
  },
  h3: {
    fontSize: "20px",
    lineHeight: "1.4",
    marginBottom: "0.5rem",
  },
});

export default globalStyles;
