import filterIcon from '@shared/assets/images/filter.svg';

type FilterIconButtonProps = {
  onClick: () => void;
  className?: string;
};

export function FilterIconButton({ onClick, className }: FilterIconButtonProps) {
  return (
    <button type="button" onClick={onClick} aria-label="필터 열기" className={className}>
      <img src={filterIcon} alt="filter" className="h-6 w-6" />
    </button>
  );
}
