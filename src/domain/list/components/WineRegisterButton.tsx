import Button from '@src/components/button/Button';

type WineRegisterButtonProps = {
  onClick: () => void;
  className?: string;
};

export function WineRegisterButton({ onClick, className }: WineRegisterButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      <span>와인 등록하기</span>
    </Button>
  );
}
