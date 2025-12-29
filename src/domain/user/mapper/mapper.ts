// src/domain/user/mapper.ts

import type { User } from '../Interface/User';
import type { UserMeResponse } from '../Interface/UserMeResponse';

export function mapUserMeResponseToUser(dto: UserMeResponse): User {
  return {
    id: dto.id,
    nickname: dto.nickname,
    profileImage: dto.image,
  };
}
