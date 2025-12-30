import type { ButtonHTMLAttributes, ReactNode } from 'react';
import ModalButton from '../../../button/ModalButton';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  cancel?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function ModalButtonAdapter({
  cancel,
  className,
  children,
  onClick,
  disabled,
  type = 'button',
}: Props) {
  const isDisabled = Boolean(disabled);

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (type === 'submit') {
      const target = e.target as unknown;
      if (target instanceof HTMLElement) {
        const form = target.closest('form');
        form?.requestSubmit?.();
      }
      return;
    }

    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();

    if (type === 'submit') {
      const target = e.target as unknown;
      if (target instanceof HTMLElement) {
        const form = target.closest('form');
        form?.requestSubmit?.();
      }
      return;
    }

    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      onClick={handleDivClick}
      onKeyDown={handleKeyDown}
      className={['w-full', isDisabled ? 'pointer-events-none opacity-50' : ''].join(' ')}
    >
      <ModalButton cancel={cancel} className={['w-full', className].filter(Boolean).join(' ')}>
        {children}
      </ModalButton>
    </div>
  );
}
