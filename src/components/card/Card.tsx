import clsx from 'clsx';

//composition 스타일 패턴

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

interface CardSubComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'mt-[42px] h-[260px] w-[1140px]',
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

Card.Header = function CardHeader({ className, children }: CardSubComponentProps) {
  return <div className={clsx('px-6 pt-6', className)}>{children}</div>;
};

Card.Body = function CardBody({ className, children }: CardSubComponentProps) {
  return <div className={clsx('flex-1 px-6 py-4', className)}>{children}</div>;
};

Card.Footer = function CardFooter({ className, children }: CardSubComponentProps) {
  return <div className={clsx('px-6 pb-6', className)}>{children}</div>;
};

interface CardImageProps extends CardSubComponentProps {
  fit?: 'contain' | 'cover' | 'fill';
  src?: string;
  alt?: string;
}

Card.Image = function CardImage({ className, children, fit = 'cover', src, alt }: CardImageProps) {
  const fitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
  };

  // img 태그를 직접 사용하는 경우
  if (src) {
    return (
      <div className={clsx('h-full w-full overflow-hidden', className)}>
        <img src={src} alt={alt || ''} className={clsx('h-full w-full', fitClasses[fit])} />
      </div>
    );
  }

  // children으로 커스텀 이미지를 받는 경우
  return <div className={clsx('h-full w-full overflow-hidden', className)}>{children}</div>;
};
