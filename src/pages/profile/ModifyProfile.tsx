import ModalButton from '@src/components/button/ModalButton';
import { Input } from '@src/components/input/Input';
import Profile from '@src/components/input/Profile';
import { useRef, useState } from 'react';
import { getTempHeader } from './tempHeader';
import { axiosInstance } from '@src/shared/apis/basic/axios';

// 프로필 페이지 내의 내 프로필 수정 컴포넌트
export default function ModifyProfile() {
  //   const { user } = useAuthStore();
  const mockUser = {
    image:
      'https://file.sportsseoul.com/news/cms/2025/08/05/news-p.v1.20250805.44a328b08e9b4a549f66834fd2b98558_P1.png',
    updatedAt: '2025-12-30T11:04:56.432Z',
    createdAt: '2025-12-30T11:04:56.432Z',
    teamId: '123',
    nickname: '정소은',
    id: 1,
  };
  const [user, setUser] = useState(mockUser);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const canModify = newNickname.length > 0 && newNickname !== user.nickname;
  const refFile = useRef<HTMLInputElement>(null);

  // 닉네임 수정
  async function modifyNickname() {
    const res = await axiosInstance.patch(
      'users/me',
      {
        nickname: newNickname,
      },
      await getTempHeader(),
    );
    setUser(res.data);
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
    const tempHeader = await getTempHeader();
    const res = await axiosInstance.post('images/upload', formdata, {
      headers: {
        ...tempHeader.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    const resUser = await axiosInstance.patch(
      'users/me',
      {
        image: res.data.url,
      },
      tempHeader,
    );
    setUser(resUser.data);
  }

  return (
    <div className="flex w-full lg:w-[280px]">
      <div className="mx-4 mt-5 mb-[30px] flex flex-1 flex-col rounded-[16px] border border-[var(--color-gray-300)] bg-[var(--color-white)] px-[19px] pt-[19px] pb-[18px] shadow-[0px_2px_20px_0px_#0000000A] lg:m-0 lg:pt-[39px]">
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:flex-col lg:pb-[42px]">
          {/* 프로필 이미지 파일 선택 (hidden) */}
          <input type="file" className="hidden" ref={refFile} onChange={onFileChange} />

          {/* 프로필 이미지 */}
          <div className="cursor-pointer" onClick={onProfileClick}>
            <Profile url={user.image} />
          </div>

          {/* 닉네임 */}
          <div className="flex-1 text-[20px] leading-[32px] font-[var(--font-weight-bold)] text-[var(--color-gray-800)] md:pb-[34px] md:text-[24px] lg:pb-0">
            {user.nickname}
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
