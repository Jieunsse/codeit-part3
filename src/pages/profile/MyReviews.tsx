import { useEffect, useRef, useState } from 'react';
import type { MyReview } from './myReview';
import { CardMy } from '@src/components/card/CardMy';
import { DropdownBase } from '@src/components/dropdown/base/DropdownBase';
import type { ReviewRegisterValue } from '@src/components/modal/modals/ReviewRegisterModal/ReviewRegisterModal.types';
import { convertReviewTime } from './review';
import { DeleteConfirmModal } from '@src/components/modal/modals/DeleteConfirmModal';
import { getTempHeader } from './tempHeader';
import { axiosInstance } from '@src/shared/apis/basic/axios';
import { ReviewEditModal } from '@src/components/modal/modals/ReviewRegisterModal/ReviewEditModal';
import { AROMA_MAP } from '@src/domain/review/utils/aroma';

const LIMIT_COUNT = 10;

// 내 리뷰 목록 컴포넌트
export default function MyReviews() {
  const [totalCount, setTotalCount] = useState(0);
  const [items, setItems] = useState<MyReview[]>([]);
  const [dropdownItem, setDropdownItem] = useState<MyReview>();
  const [editingItem, setEditingItem] = useState<MyReview>();
  const observerRef = useRef<IntersectionObserver>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [intersecting, setIntersecting] = useState(false);
  const isLoadingRef = useRef(false);
  const [deletingItem, setDeletingItem] = useState<MyReview>();

  // 첫 번째 목록 받아오기
  async function loadFirstList() {
    isLoadingRef.current = true;
    const res = await axiosInstance.get(
      `users/me/reviews?limit=${LIMIT_COUNT}`,
      await getTempHeader(),
    );
    setItems(res.data.list);
    setTotalCount(res.data.totalCount);
    setCursor(res.data.nextCursor);
    isLoadingRef.current = false;
  }

  // 이후 목록 받아오기
  function loadNextList() {
    isLoadingRef.current = true;
    getTempHeader().then((header) => {
      axiosInstance
        .get(`users/me/reviews?limit=${LIMIT_COUNT}&cursor=${cursor}`, header)
        .then((res) => {
          setItems([...items, ...res.data.list]);
          setCursor(res.data.nextCursor);
          isLoadingRef.current = false;
        });
    });
  }

  // 이후 목록 받아오기 sideEffect
  useEffect(() => {
    if (!intersecting || !cursor || isLoadingRef.current) return;
    loadNextList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersecting, cursor]);

  useEffect(() => {
    loadFirstList();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = observerRef.current;
    const target = targetRef.current;
    if (!observer || !target) return;

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [items]);

  function showPopupMenu(item: MyReview) {
    setDropdownItem(item);
  }

  async function requestDeleteItem(item: MyReview) {
    await axiosInstance.delete(`reviews/${item.id}`, await getTempHeader());
    setItems(items.filter((it) => it.id != item.id));
  }

  async function onSubmitItem(values: ReviewRegisterValue) {
    const body = {
      rating: values.rating,
      aroma: values.aromas,
      content: values.content,
      lightBold: values.taste['body'] ?? 0,
      smoothTannic: values.taste['tannin'] ?? 0,
      softAcidic: values.taste['acid'] ?? 0,
      drySweet: values.taste['sweet'] ?? 0,
    };
    const editingId = editingItem?.id ?? 0;
    const res = await axiosInstance.patch(`reviews/${editingId}`, body, await getTempHeader());
    setItems((prev) => prev.map((it) => (it.id != editingId ? it : res.data)));
  }

  function convertAromas(codes: string[]): string[] {
    const keys = Object.keys(AROMA_MAP);
    const map: { [key: string]: string } = {};
    keys.forEach((it) => {
      const value = AROMA_MAP[it];
      map[value] = it;
    });
    return codes.map((it) => {
      return map[it];
    });
  }

  return (
    <div className="flex flex-col">
      <ReviewEditModal
        review={{
          rating: editingItem?.rating ?? 0,
          content: editingItem?.content ?? '',
          taste: {
            body: editingItem?.lightBold ?? 0,
            tannin: editingItem?.smoothTannic ?? 0,
            sweet: editingItem?.drySweet ?? 0,
            acid: editingItem?.softAcidic ?? 0,
          },
          aromas: convertAromas(editingItem?.aroma ?? []),
        }}
        isOpen={editingItem != undefined}
        onClose={() => setEditingItem(undefined)}
        wineName={editingItem?.user.nickname ?? ''}
        wineImageUrl={editingItem?.user.image ?? ''}
        onSubmit={onSubmitItem}
      />

      <div className="mb-4 self-end text-[12px] leading-[26px] font-[var(--font-weight-regular)] text-[var(--color-primary-purple-100)] md:text-[14px] lg:mb-[22px] lg:text-[14px] lg:leading-[24px]">
        {`총 ${totalCount}개`}
      </div>
      <div className="flex w-full flex-col gap-4 lg:gap-2">
        {items.map((it, index) => {
          const isTarget = index == items.length - 4;
          return (
            <div ref={isTarget ? targetRef : null} key={it.id} className="relative lg:mt-[-42px]">
              {/* reviewCard */}
              <CardMy
                className="w-auto md:w-auto"
                rating={it.rating}
                username={it.user.nickname}
                createdAt={convertReviewTime(it.createdAt)}
                text={it.content}
                onMenuClick={() => showPopupMenu(it)}
              />

              {/* popupMenu */}
              {dropdownItem == it && (
                <div className="absolute top-[117px] right-[40px]">
                  <DropdownBase
                    items={[
                      { key: 'edit', label: '수정하기' },
                      { key: 'delete', label: '삭제하기' },
                    ]}
                    width={126}
                    onItemClick={(item) => {
                      switch (item.key) {
                        case 'edit':
                          setEditingItem(it);
                          break;
                        case 'delete':
                          setDeletingItem(it);
                          break;
                      }
                      setDropdownItem(undefined);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DeleteConfirmModal
        isOpen={deletingItem != undefined}
        onClose={() => setDeletingItem(undefined)}
        onConfirm={() => requestDeleteItem(deletingItem!)}
      />
    </div>
  );
}
