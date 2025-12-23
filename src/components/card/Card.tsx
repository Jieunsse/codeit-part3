import clsx from 'clsx';

//composition 스타일 패턴

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'small' | 'large' | 'responsive';
}

interface CardSubComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ className, children, size = 'responsive' }: CardProps) {
  const sizeClasses = {
    small: 'w-[193px] h-[160px] px-[25px] py-[24px] pb-[0px]',
    large: 'w-[232px] h-[185px] px-[30px] py-[24px] pb-[0px]',
    responsive:
      'w-full max-w-[320px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1140px] h-auto min-h-[200px] md:min-h-[260px]',
  };

  return (
    <div
      className={clsx(
        // 사이즈
        sizeClasses[size],
        'mt-4 md:mt-[42px]',
        // 스타일
        'rounded-2xl border opacity-100',
        'flex flex-row',
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

Card.Body = function CardBody({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
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

interface CardImageProps extends CardSubComponentProps {
  src?: string;
  alt?: string;
}

Card.Image = function CardImage({ className, children, src, alt }: CardImageProps) {
  // src가 있으면 직접 img 렌더링
  if (src) {
    return (
      <div className={clsx(className)}>
        <img className={clsx('h-full w-full object-cover')} src={src} alt={alt || ''} />
      </div>
    );
  }

  // children으로 전달받은 경우
  return <div className={clsx('flex items-end overflow-hidden', className)}>{children}</div>;
};

Card.Text = function CardText({ className, children, style }: CardSubComponentProps) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};
