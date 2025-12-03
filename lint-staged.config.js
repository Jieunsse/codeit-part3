export default {
  '*.{js,jsx,ts,tsx}': ['pnpm exec eslint --fix', 'pnpm exec prettier --write'],
  '*.{md,json}': ['pnpm exec prettier --write'],
};
