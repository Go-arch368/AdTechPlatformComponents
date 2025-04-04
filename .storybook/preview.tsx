import "../app/globals.css";
import React from "react";
import ThemeWrapper from "./ThemeToggle";

export const decorators = [
  (Story) => (
    <ThemeWrapper>
      <Story />
    </ThemeWrapper>
  ),
];

export const parameters = {
  layout: "fullscreen",
};
