import React from 'react';
import {
  useModalEscapeClose,
  useModalLockBodyScroll,
  useModalOutsideClickClose,
} from '../hooks/modalHooks';
import closeIcon from '../img/closeButton.svg';

type BaseModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
  showHeader?: boolean;
  titleClassName?: string;
};

export function BaseModal({
  isOpen,
  title,
  onClose,
  children,
  maxWidthClassName = 'max-w-[520px]',
  showHeader = true,
  titleClassName,
}: BaseModalProps) {
  useModalLockBodyScroll(isOpen);
  useModalEscapeClose(isOpen, onClose);
  const { containerRef } = useModalOutsideClickClose<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* modal background overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* panel */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidthClassName} rounded-2xl bg-white shadow-xl`}
      >
        {showHeader && (
          <div className="flex items-center justify-between px-6 py-4">
            <div className={`${titleClassName ?? ''}`}>{title}</div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
              aria-label="close"
            >
              <img src={closeIcon} alt="close" className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className={showHeader ? 'px-6 pb-6' : 'p-6'}>{children}</div>
      </div>
    </div>
  );
}
