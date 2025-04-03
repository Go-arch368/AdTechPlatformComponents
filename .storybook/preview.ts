import { ModeDecorator } from "./modeDecorator";
import "../app/globals.css";
export const decorators = [ModeDecorator];
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;