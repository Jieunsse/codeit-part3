import clsx from 'clsx';
//composition 스타일 패턴

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

Card.Title = function CardTitle({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

Card.Container = function CardContainer({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

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

Card.Image = function CardImage({ className, src, alt }: CardImageProps) {
  if (!src) return null;

  return <img className={clsx(className)} src={src} alt={alt || ''} />;
};

Card.Text = function CardText({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};

Card.Icon = function CardIcon({ className, children, style, onClick }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};
