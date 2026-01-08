/**
 * 랜딩 페이지.
 *
 * - 주요 기능 소개용 섹션(메인/추천/필터/리뷰) 이미지를 반응형으로 노출합니다.
 * - CTA 버튼 클릭 시 와인 목록 페이지(`/wines`)로 이동합니다.
 * - 이미지는 <picture> 기반의 ResponsiveImg 컴포넌트를 통해 브레이크포인트별로 교체됩니다.
 */
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

import MainImg from './img/MainImg.png';
import MainImgMd from './img/MainImgMd.png';
import MainImgSm from './img/MainImgSm.png';

import RecommendImg from './img/RecommendImg.png';
import RecommendImgSm from './img/RecommendImgSm.png';

import FilterImg from './img/FilterImg.png';
import FilterImgSm from './img/FilterImgSm.png';

import ReviewImg from './img/ReviewImg.png';
import ReviewImgSm from './img/ReviewImgSm.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-[1140px] md:pt-8">
        <main className="pt-20">
          {/* MAIN */}
          <section className="pb-12 md:pb-40">
            <ResponsiveImg
              alt="메인"
              lg={MainImg}
              md={MainImgMd}
              sm={MainImgSm}
              className="mx-auto block w-full max-w-[343px] md:max-w-[704px] lg:max-w-none"
            />
          </section>

          <div className="mx-auto w-full max-w-[343px] md:max-w-[699px]">
            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="추천"
                lg={RecommendImg}
                sm={RecommendImgSm}
                className="mx-auto block w-full md:mx-0"
              />
            </section>

            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="필터"
                lg={FilterImg}
                sm={FilterImgSm}
                className="mx-auto block w-full max-w-[343px] md:mx-0 md:max-w-[640px]"
              />
            </section>

            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="리뷰"
                lg={ReviewImg}
                sm={ReviewImgSm}
                className="mx-auto block w-full max-w-[343px] md:mx-0 md:max-w-[640px]"
              />
            </section>
            <section className="lg:pb[109px] mx-auto mt-16 block w-full max-w-[343px] pb-[62px] md:mx-0 md:mt-20 md:max-w-[640px] md:pb-[72px] lg:mt-[104px]">
              <Button
                className="mx-auto block cursor-pointer rounded-[100px]! px-24 py-4 hover:bg-violet-800"
                onClick={() => {
                  navigate('/wines');
                }}
              >
                와인 보러가기
              </Button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

type ResponsiveImgProps = {
  alt: string;
  lg: string;
  sm: string;
  md?: string;
  className?: string;
};

/**
 * 브레이크포인트에 따라 이미지를 교체하는 반응형 이미지 컴포넌트.
 *
 * @param props.alt - 접근성(스크린리더) 및 이미지 로딩 실패 시 표시될 대체 텍스트
 * @param props.lg - 1024px 이상(Desktop)에서 사용할 이미지
 * @param props.md - 768px 이상(Tablet)에서 사용할 이미지 (옵션)
 * @param props.sm - 그 외 구간(Mobile 기본값)에서 사용할 이미지
 * @param props.className - img 태그에 추가로 적용할 클래스
 *
 * @remarks
 * - `<picture>` + `<source>`를 사용해 브라우저가 조건에 맞는 이미지를 선택합니다.
 * - md가 없으면 1024px 미만은 sm을 사용합니다.
 */

function ResponsiveImg({ alt, lg, md, sm, className = '' }: ResponsiveImgProps) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={lg} />
      {md ? <source media="(min-width: 768px)" srcSet={md} /> : null}
      <img src={sm} alt={alt} className={`block ${className}`} loading="lazy" draggable={false} />
    </picture>
  );
}
