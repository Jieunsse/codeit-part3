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

  panelClassName?: string;
  bodyClassName?: string;
};

export function BaseModal({
  isOpen,
  title,
  onClose,
  children,
  maxWidthClassName = 'max-w-[520px]',
  showHeader = true,
  titleClassName,
  panelClassName,
  bodyClassName,
}: BaseModalProps) {
  useModalLockBodyScroll(isOpen);
  useModalEscapeClose(isOpen, onClose);
  const { containerRef } = useModalOutsideClickClose<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* modal background overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* panel */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidthClassName} rounded-2xl bg-white shadow-xl ${panelClassName ?? ''}`}
      >
        {showHeader && (
          <div className="flex items-center justify-between p-6">
            <div className={`translate-y-1 ${titleClassName ?? ''}`}>{title}</div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
              aria-label="close"
            >
              <img src={closeIcon} alt="close" className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className={` ${showHeader ? 'px-6 pb-6' : 'p-6'} ${bodyClassName ?? ''} `}>
          {children}
        </div>
      </div>
    </div>
  );
}
