// scripts/lighthouse-severity.js

const SEVERITY_MAP = {
  high: [
    'Reduce initial server response time',
    'Eliminate render-blocking resources',
    'Reduce JavaScript execution time',
    'Avoid chaining critical requests',
  ],
  medium: [
    'Properly size images',
    'Serve images in next-gen formats',
    'Reduce unused JavaScript',
    'Reduce unused CSS',
    'Serve static assets with an efficient cache policy',
    'Avoid enormous network payloads',
  ],
  low: [
    'Minify CSS',
    'Minify JavaScript',
    'Enable text compression',
    'Preload key requests',
    'Defer offscreen images',
  ],
};

export function getSeverity(title) {
  if (SEVERITY_MAP.high.includes(title)) return '🔴 높음';
  if (SEVERITY_MAP.medium.includes(title)) return '🟠 중간';
  if (SEVERITY_MAP.low.includes(title)) return '🟢 낮음';
  return 'ℹ️ 정보';
}

export function getSeverityRank(title) {
  if (SEVERITY_MAP.high.includes(title)) return 0;
  if (SEVERITY_MAP.medium.includes(title)) return 1;
  if (SEVERITY_MAP.low.includes(title)) return 2;
  return 3;
}
