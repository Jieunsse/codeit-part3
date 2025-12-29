import clsx from 'clsx';
// Composition 패턴을 사용한 카드 컴포넌트

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

interface CardSubComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Composition 패턴을 사용한 베이스 카드 컴포넌트
 *
 * Card.Title, Card.Body, Card.Image, Card.Text, Card.Icon, Card.Footer, Card.Container 서브 컴포넌트와 함께 사용
 *
 * @param {CardProps} props - 컴포넌트 props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {React.ReactNode} [props.children] - 카드 내부 콘텐츠
 *
 * @example
 * // 기본 사용
 * <Card>
 *   <Card.Title>제목</Card.Title>
 *   <Card.Text>내용</Card.Text>
 * </Card>
 *
 * @example
 * // 복잡한 레이아웃
 * <Card className="w-full">
 *   <Card.Container className="flex flex-row">
 *     <Card.Image src="/wine.jpg" alt="Wine" />
 *     <Card.Body>
 *       <Card.Title>샤또 마고</Card.Title>
 *       <Card.Text>보르도 와인</Card.Text>
 *     </Card.Body>
 *   </Card.Container>
 *   <Card.Footer>
 *     <Card.Icon>❤️</Card.Icon>
 *   </Card.Footer>
 * </Card>
 */
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        // 기본 스타일만
        'mt-4 md:mt-[42px]',
        'rounded-2xl border opacity-100',
        className,
      )}
      style={{
        backgroundColor: 'var(--color-white)',
        borderColor: 'var(--color-gray-300)',
        borderWidth: '1px',
      }}
    >
      {children}
    </div>
  );
}

/**
 * 카드 제목 컴포넌트
 * @param {CardSubComponentProps} props
 */
Card.Title = function CardTitle({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

/**
 * 카드 컨테이너 컴포넌트 (레이아웃 구성용)
 * @param {CardSubComponentProps} props
 */
Card.Container = function CardContainer({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

/**
 * 카드 본문 컴포넌트
 * @param {CardSubComponentProps} props
 */
Card.Body = function CardBody({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

interface CardImageProps extends CardSubComponentProps {
  src?: string;
  alt?: string;
}

/**
 * 카드 이미지 컴포넌트
 * @param {CardImageProps} props
 * @param {string} [props.src] - 이미지 소스 URL
 * @param {string} [props.alt] - 이미지 alt 텍스트
 */
Card.Image = function CardImage({ className, src, alt }: CardImageProps) {
  if (!src) return null;

  return <img className={clsx(className)} src={src} alt={alt || ''} />;
};

/**
 * 카드 텍스트 컴포넌트 (자동으로 truncate 적용)
 * @param {CardSubComponentProps} props
 */
Card.Text = function CardText({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

/**
 * 카드 아이콘 컴포넌트
 * @param {CardSubComponentProps} props
 * @param {function} [props.onClick] - 클릭 이벤트 핸들러
 */
Card.Icon = function CardIcon({ className, children, style, onClick }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

/**
 * 카드 푸터 컴포넌트
 * @param {CardSubComponentProps} props
 */
Card.Footer = function CardFooter({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};
