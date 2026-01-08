import { axiosInstance } from '@src/shared/apis/basic/axios';

export async function getTempHeader() {
  const res = await axiosInstance.post('auth/signIn', {
    email: 'soeun@gmail.com',
    password: 'soeun1234',
  });
  return {
    headers: {
      Authorization: `Bearer ${res.data.accessToken}`,
    },
  };
}
