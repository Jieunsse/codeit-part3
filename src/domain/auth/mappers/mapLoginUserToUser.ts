import type { User } from '@src/domain/user/Interface/User';
import type { LoginUser } from '@src/pages/login/types/login.types';

export function mapLoginUserToUser(dto: LoginUser): User {
  return {
    id: dto.id,
    nickname: dto.nickname,
    profileImage: dto.image ?? null,
  };
}
