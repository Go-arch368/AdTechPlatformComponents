import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../**/*.mdx",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-viewport"
  ],
  core: {
    builder: 'webpack5',
  },
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  staticDirs: ['../public'],
 
  
};
export default config;