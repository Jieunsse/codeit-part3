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
            {/* RECOMMEND */}
            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="추천"
                lg={RecommendImg}
                sm={RecommendImgSm}
                className="mx-auto block w-full md:mx-0"
              />
            </section>

            {/* FILTER */}
            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="필터"
                lg={FilterImg}
                sm={FilterImgSm}
                className="mx-auto block w-full max-w-[343px] md:mx-0 md:max-w-[640px]"
              />
            </section>

            {/* REVIEW */}
            <section className="mt-16 md:mt-20">
              <ResponsiveImg
                alt="리뷰"
                lg={ReviewImg}
                sm={ReviewImgSm}
                className="mx-auto block w-full max-w-[343px] md:mx-0 md:max-w-[640px]"
              />
            </section>
            {/* CTA BUTTON */}
            <section className="lg:pb[109px] mx-auto mt-16 block w-full max-w-[343px] pb-[62px] md:mx-0 md:mt-20 md:max-w-[640px] md:pb-[72px] lg:mt-[104px]">
              <Button
                className="mx-auto block rounded-[100px]! px-24 py-4 hover:bg-violet-800"
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

function ResponsiveImg({ alt, lg, md, sm, className = '' }: ResponsiveImgProps) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={lg} />
      {md ? <source media="(min-width: 768px)" srcSet={md} /> : null}
      <img src={sm} alt={alt} className={`block ${className}`} loading="lazy" draggable={false} />
    </picture>
  );
}
