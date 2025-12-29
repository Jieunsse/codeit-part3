import { useState } from 'react';
import { FilterModal } from '../components/modal/modals/FilterModal';
import { DeleteConfirmModal } from '../components/modal/modals/DeleteConfirmModal';
import { FilterRegisterModal } from '../components/modal/modals/FilterRegisterModal';
import { ReviewRegisterModal } from '../components/modal/modals/ReviewRegisterModal/ReviewRegisterModal';
import { WineRegisterModal } from '../components/modal/modals/WineRegisterModal';

type ModalKey = null | 'filter' | 'wine' | 'filterReg' | 'review' | 'delete';

export default function App() {
  const [open, setOpen] = useState<ModalKey>(null);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[900px] space-y-6">
        <h1 className="text-xl font-bold">Modal Playground</h1>

        {/* 테스트 버튼들 */}
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg bg-white px-4 py-2 ring-1 ring-gray-200"
            onClick={() => setOpen('filter')}
          >
            필터 모달
          </button>
          <button
            className="rounded-lg bg-white px-4 py-2 ring-1 ring-gray-200"
            onClick={() => setOpen('wine')}
          >
            와인 등록
          </button>
          <button
            className="rounded-lg bg-white px-4 py-2 ring-1 ring-gray-200"
            onClick={() => setOpen('filterReg')}
          >
            필터 등록
          </button>
          <button
            className="rounded-lg bg-white px-4 py-2 ring-1 ring-gray-200"
            onClick={() => setOpen('review')}
          >
            리뷰 등록
          </button>
          <button
            className="rounded-lg bg-white px-4 py-2 ring-1 ring-gray-200"
            onClick={() => setOpen('delete')}
          >
            삭제 확인
          </button>
        </div>

        {/* 모달들 */}
        <FilterModal
          isOpen={open === 'filter'}
          onClose={() => setOpen(null)}
          maxPrice={30_000_000}
          onApply={(v) => {
            console.log('Filter apply:', v);
          }}
        />

        <WineRegisterModal
          isOpen={open === 'wine'}
          onClose={() => setOpen(null)}
          onSubmit={(v) => {
            console.log('Wine submit:', v);
          }}
        />

        <FilterRegisterModal
          isOpen={open === 'filterReg'}
          onClose={() => setOpen(null)}
          onSubmit={(v) => {
            console.log('Filter register submit:', v);
          }}
        />

        <ReviewRegisterModal
          isOpen={open === 'review'}
          onClose={() => setOpen(null)}
          wineName="Sentinel Cabernet Sauvignon 2016"
          onSubmit={(v) => {
            console.log('Review submit:', v);
          }}
        />

        <DeleteConfirmModal
          isOpen={open === 'delete'}
          onClose={() => setOpen(null)}
          onConfirm={() => {
            console.log('Delete confirmed');
          }}
        />
      </div>
    </div>
  );
}
