import { useState } from 'react';
import ModifyProfile from './ModifyProfile';
import MyReviews from './MyReviews';
import MyWines from './MyWines';
// import { useAuthStore } from '@src/domain/auth/store/authStore';
// import { Navigate } from 'react-router-dom';

export default function MyProfile() {
  const [tab, setTeb] = useState('myReview');
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex w-full flex-col lg:mx-auto lg:mt-[37px] lg:flex-row lg:justify-center lg:gap-15">
      <ModifyProfile />

      <div className="relative mx-4 flex flex-col text-[18px] leading-[26px] font-[var(--font-weight-bold)] max-md:flex-1 lg:mx-0 lg:w-[800px] lg:text-[20px] lg:leading-[32px]">
        <div className="absolute inset-0 w-full">
          {tab == 'myReview' && <MyReviews />}
          {tab == 'myWine' && <MyWines />}
        </div>

        <div
          className="absolute top-0 right-0 left-0 flex gap-4"
          style={{
            color: 'var(--color-gray-800)',
          }}
        >
          <div
            className="cursor-pointer"
            onClick={() => {
              setTeb('myReview');
            }}
            style={{
              color: tab == 'myReview' ? 'var(--color-gray-800)' : 'var(--color-gray-300)',
            }}
          >
            내가 쓴 후기
          </div>

          <div
            className="cursor-pointer"
            onClick={() => {
              setTeb('myWine');
            }}
            style={{ color: tab == 'myWine' ? 'var(--color-gray-800)' : 'var(--color-gray-300)' }}
          >
            내가 등록한 와인
          </div>
        </div>
      </div>
    </div>
  );
}
