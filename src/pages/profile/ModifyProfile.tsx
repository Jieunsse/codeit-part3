import ModalButton from '@src/components/button/ModalButton';
import { Input } from '@src/components/input/Input';
import Profile from '@src/components/input/Profile';
import { useRef, useState } from 'react';
import { axiosInstance } from '@src/shared/apis/basic/axios';
import { useAuthStore } from '@src/domain/auth/store/authStore';
import { mapLoginUserToUser } from '@src/domain/auth/mapper/mapLoginUserToUser';
import type { LoginUser } from '../login/login.types';

// 프로필 페이지 내의 내 프로필 수정 컴포넌트
export default function ModifyProfile() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const [newNickname, setNewNickname] = useState(user?.nickname ?? '');
  const canModify = newNickname.length > 0 && newNickname !== user?.nickname;
  const refFile = useRef<HTMLInputElement>(null);

  // 닉네임 수정
  async function modifyNickname() {
    const res = await axiosInstance.patch<LoginUser>('users/me', {
      nickname: newNickname,
    });
    login(mapLoginUserToUser(res.data));
  }

  // 프로필 이미지 선택
  function onProfileClick() {
    refFile.current?.click();
  }

  // 프로필 이미지 변경
  async function onFileChange() {
    if (!refFile.current || !refFile.current.files || refFile.current.files.length == 0) return;
    const file = refFile.current.files[0];
    const formdata = new FormData();
    formdata.append('image', file);
    const res = await axiosInstance.post('images/upload', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const resUser = await axiosInstance.patch<LoginUser>('users/me', {
      image: res.data.url,
    });
    login(mapLoginUserToUser(resUser.data));
  }

  return (
    <div className="flex w-full lg:w-[280px]">
      <div className="mx-4 mt-5 mb-[30px] flex flex-1 flex-col rounded-[16px] border border-[var(--color-gray-300)] bg-[var(--color-white)] px-[19px] pt-[19px] pb-[18px] shadow-[0px_2px_20px_0px_#0000000A] lg:m-0 lg:pt-[39px]">
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:flex-col lg:pb-[42px]">
          {/* 프로필 이미지 파일 선택 (hidden) */}
          <input type="file" className="hidden" ref={refFile} onChange={onFileChange} />

          {/* 프로필 이미지 */}
          <div className="cursor-pointer" onClick={onProfileClick}>
            <Profile url={user?.profileImage ?? ''} />
          </div>

          {/* 닉네임 */}
          <div className="flex-1 text-[20px] leading-[32px] font-[var(--font-weight-bold)] text-[var(--color-gray-800)] md:pb-[34px] md:text-[24px] lg:pb-0">
            {user?.nickname ?? ''}
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row md:gap-6 lg:flex-col lg:gap-0">
          {/* 닉네임 입력창 */}
          <Input
            onInput={(e) => setNewNickname((e.target as HTMLInputElement).value)}
            title="닉네임"
            type="text"
            className="mt-5 md:mt-[30px] md:flex-1 lg:mt-12"
          />

          {/* 변경하기 버튼 */}
          <ModalButton
            onClick={modifyNickname}
            disabled={!canModify}
            style={{ opacity: canModify ? 1 : 0.5 }}
            className="mt-4 self-end md:h-12 md:w-[116px] lg:mt-2 lg:h-auto lg:w-auto"
          >
            변경하기
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
