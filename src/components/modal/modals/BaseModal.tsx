/**
 * 공통 모달 베이스 컴포넌트
 *
 * - ESC 키로 닫힘
 * - 바깥 영역 클릭 시 닫힘
 * - 열릴 때 body 스크롤 잠금
 *
 * ### 사용 목적
 * - 모든 모달 UI의 공통 레이아웃과 접근성(role="dialog")을 제공
 * - 실제 콘텐츠는 children으로 주입
 *
 * ### 확장 방법
 * - `panelClassName`, `bodyClassName`으로 내부 스타일 커스터마이징
 * - `showHeader=false`로 헤더 없는 모달 구현 가능
 *
 * ### 접근성
 * - role="dialog"
 * - aria-modal="true"
 */
import React from 'react';
import {
  useModalEscapeClose,
  useModalLockBodyScroll,
  useModalOutsideClickClose,
} from '../hooks/modalHooks';
import closeIcon from '../img/closeButton.svg';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  titleClassName?: string;
  maxWidthClassName?: string; // 모달 최대 너비 Tailwind 클래스
  showHeader?: boolean; // 헤더 표시 여부 (기본: true)
  panelClassName?: string; // 패널 전체 컨테이너 클래스
  bodyClassName?: string; // 본문(body) 영역 클래스
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
