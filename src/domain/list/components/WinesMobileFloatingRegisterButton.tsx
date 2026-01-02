import { WineRegisterButton } from './WineRegisterButton';

type WinesMobileFloatingRegisterButtonProps = {
  onOpenWineRegister: () => void;
};

export function WinesMobileFloatingRegisterButton({
  onOpenWineRegister,
}: WinesMobileFloatingRegisterButtonProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 sm:hidden">
      <div className="mx-auto w-full max-w-[1140px] px-[30px] pb-4">
        <WineRegisterButton className="w-full" onClick={onOpenWineRegister} />
      </div>
    </div>
  );
}
