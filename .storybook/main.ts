import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    "../**/*.mdx",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-viewport",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
    '@storybook/addon-a11y',
    'storybook-addon-themes'
  ], 
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: "tag"
  },
  core: {
    builder: 'webpack5'
  },
  babel: async (options) => ({
    ...options,
    presets: [...(options.presets || []), "@babel/preset-react"], 
  }),
};

export default config;