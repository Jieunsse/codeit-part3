import { axiosInstance } from '../basic/axios';
import type { Wine } from '@shared/types/Wine';

export async function getWineDetail(id: number): Promise<Wine> {
  const response = await axiosInstance.get(`/wines/${id}`);
  return response.data;
}
