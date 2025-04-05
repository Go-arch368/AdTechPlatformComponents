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
    'storybook-addon-themes',
    "@storybook/addon-actions",
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    
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