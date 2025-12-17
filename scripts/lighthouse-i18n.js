// scripts/lighthouse-i18n.js

const LIGHTHOUSE_TRANSLATIONS = {
  // 🚀 Performance
  'Reduce initial server response time': '초기 서버 응답 시간을 줄이세요',
  'Eliminate render-blocking resources': '렌더링을 차단하는 리소스를 제거하세요',
  'Properly size images': '이미지 크기를 적절히 조정하세요',
  'Serve images in next-gen formats': '최신 이미지 포맷(WebP/AVIF)으로 제공하세요',
  'Defer offscreen images': '화면 밖 이미지의 로딩을 지연하세요',
  'Enable text compression': '텍스트 압축(Gzip/Brotli)을 활성화하세요',
  'Minify CSS': 'CSS 파일을 최소화하세요',
  'Minify JavaScript': 'JavaScript 파일을 최소화하세요',
  'Reduce unused CSS': '사용하지 않는 CSS를 제거하세요',
  'Reduce unused JavaScript': '사용하지 않는 JavaScript를 제거하세요',
  'Avoid enormous network payloads': '네트워크 전송 크기를 줄이세요',
  'Serve static assets with an efficient cache policy': '정적 리소스에 캐시 정책을 적용하세요',
  'Preload key requests': '핵심 리소스를 preload 하세요',
  'Reduce JavaScript execution time': 'JavaScript 실행 시간을 줄이세요',
  'Avoid chaining critical requests': '중요 요청의 연쇄 호출을 피하세요',

  // ♿ Accessibility
  'Image elements do not have [alt] attributes': '이미지에 alt 속성이 없습니다',
  'Buttons do not have an accessible name': '버튼에 접근 가능한 이름이 없습니다',
  'Links do not have a discernible name': '링크에 명확한 텍스트가 없습니다',
  'Background and foreground colors do not have a sufficient contrast ratio':
    '텍스트 대비가 충분하지 않습니다',
  'Heading elements are not in a sequentially-descending order':
    '헤딩 태그의 순서가 올바르지 않습니다',
  'Form elements do not have associated labels': '폼 요소에 label이 연결되어 있지 않습니다',

  // 🔍 SEO
  'Document does not have a meta description': 'meta description이 없습니다',
  'Links do not have descriptive text': '링크 텍스트가 설명적이지 않습니다',
  'Page has no canonical tag': 'canonical 태그가 없습니다',
  'Robots.txt is not valid': 'robots.txt 설정이 올바르지 않습니다',
};

function translateAuditTitle(title) {
  return LIGHTHOUSE_TRANSLATIONS[title] || title;
}

module.exports = {
  translateAuditTitle,
};
