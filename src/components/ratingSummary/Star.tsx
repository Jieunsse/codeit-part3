interface StarProps {
  active?: boolean;
}

export function Star({ active = false }: StarProps) {
  return (
    <svg
      width="17.12"
      height="16.35"
      viewBox="0 0 24 24"
      fill={active ? 'var(--color-primary-purple-100)' : 'var(--color-gray-300)'}
    >
      <path d="M12 2l2.9 6.1L22 9.2l-5 4.9L18.2 22 12 18.6 5.8 22 7 14.1l-5-4.9 7.1-1.1L12 2z" />
    </svg>
  );
}
