import { axiosInstance } from '@src/shared/apis/basic/axios';

export type UploadImageResponse = {
  url: string;
};

export async function uploadImage(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);

  // axiosInstance는 기본 Content-Type이 application/json이라,
  // multipart 업로드 시에는 Content-Type을 강제로 비워 브라우저가 boundary 포함해서 설정하게 함

  const { data } = await axiosInstance.post<UploadImageResponse>('/images/upload', formData, {
    headers: { 'Content-Type': undefined } as unknown as Record<string, string>,
  });

  return data;
}
