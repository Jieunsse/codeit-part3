interface ProfileImgProps {
  src: string;
  alt?: string;
  size?: number;
  onClick?: () => void;
}

/**
 * ProfileImg
 *
 * 사용자 프로필 이미지를 원형으로 표시하는 UI 컴포넌트입니다.
 * 이 컴포넌트는 "표시" 역할만 담당하며,
 * 클릭 시 수행할 동작(페이지 이동, 모달 오픈 등)은
 * `onClick`을 통해 외부에서 주입받습니다.
 *
 * ```
 * @param {string} src
 *  표시할 프로필 이미지의 URL입니다.
 *
 * @param {string} [alt]
 *  이미지의 대체 텍스트입니다.
 *  접근성을 위해 기본값은 `"프로필 이미지"`로 설정되어 있습니다.
 *
 * @param {number} [size]
 *  프로필 이미지의 가로/세로 크기(px)입니다.
 *  전달하지 않으면 스타일에 의해 결정됩니다.
 *
 * @param {() => void} [onClick]
 *  프로필 이미지를 클릭했을 때 실행될 콜백 함수입니다.
 *  예: 마이페이지 이동, 프로필 변경 모달 오픈 등
 */

export function ProfileImg({ src, alt = '프로필 이미지', size, onClick }: ProfileImgProps) {
  return (
    <button
      type="button"
      aria-label="프로필"
      onClick={onClick}
      className="border-primary-purple-10 relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border focus:outline-none"
      style={{
        width: size,
        height: size,
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </button>
  );
}
