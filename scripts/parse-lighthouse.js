import fs from 'fs';

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf-8'));

const categories = report.categories;

const score = (key) => Math.round(categories[key].score * 100);

const audits = report.audits;

const opportunities = Object.values(audits)
  .filter((a) => a.details?.type === 'opportunity' && a.numericValue > 0)
  .slice(0, 5)
  .map((a) => `- ${a.title}`);

const summary = `
### 📊 Lighthouse Report

| 카테고리 | 점수 |
|--------|-------|
| 성능 | ${score('performance')} |
| SEO | ${score('seo')} |
| 접근성 | ${score('accessibility')} |

#### 🔧 Top Improvements
${opportunities.join('\n') || '- 없음'}
`;

fs.writeFileSync('./lighthouse-summary.md', summary);
