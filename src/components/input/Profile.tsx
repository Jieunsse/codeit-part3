import profile from '@shared/assets/images/profile.svg';
import profileHover from '@shared/assets/images/profile-hover.svg';

interface ProfileProps {
  url: string | undefined;
  className?: string;
}

export default function Profile({ url, className = '' }: ProfileProps) {
  return (
    <div className={`relative h-[174px] w-[174px] ${className}`}>
      <img
        className={`absolute inset-0 h-full w-full rounded-full object-cover`}
        src={url || profile}
      />
      <img
        className={`absolute inset-0 h-full w-full opacity-0 transition-opacity hover:opacity-100`}
        src={profileHover}
      />
    </div>
  );
}
