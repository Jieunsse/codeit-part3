import fs from 'fs';
import { translateAuditTitle } from './lighthouse-i18n.js';
import { getSeverity, getSeverityRank } from './lighthouse-severity.js';

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf-8'));

const categories = report.categories;
const audits = report.audits;

const score = (key) => Math.round(categories[key].score * 100);

const opportunities = Object.values(audits)
  .filter(
    (a) =>
      a.details?.type === 'opportunity' &&
      typeof a.numericValue === 'number' &&
      a.numericValue > 0 &&
      getSeverityRank(a.title) < 3, // ✅ Info(ℹ️) audit 제거
  )
  .sort((a, b) => getSeverityRank(a.title) - getSeverityRank(b.title))
  .slice(0, 5)
  .map((a) => {
    const severity = getSeverity(a.title);
    const translatedTitle = translateAuditTitle(a.title);
    const displayValue = a.displayValue ? ` (${a.displayValue})` : '';

    return `
- ${severity} ${translatedTitle}${displayValue}
  - 원문: ${a.title}
`.trim();
  });

const summary = `
### 📊 라이트하우스 리포트

| 카테고리 | 점수 |
|--------|------|
| 성능 | ${score('performance')} |
| SEO | ${score('seo')} |
| 접근성 | ${score('accessibility')} |

#### 🔧 성능 및 품질 개선 제안
${opportunities.join('\n') || '- 없음'}

> ℹ️ 전체 Lighthouse 리포트(JSON)는 GitHub Actions 아티팩트 또는 CI 로그에서 확인할 수 있습니다.
`;

fs.writeFileSync('./lighthouse-summary.md', summary);
