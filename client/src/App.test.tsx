import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

//obviously we would want to test more of the application, bu that is outside the scope of this project.

test("renders the logo", () => {
  render(<App />);
  const logoElement = screen.getByRole("link", {
    name: /logo watch tube/i,
  });
  expect(logoElement).toBeInTheDocument();
});
