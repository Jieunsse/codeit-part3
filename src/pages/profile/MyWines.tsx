import { useEffect, useRef, useState } from 'react';
import type { MyWine } from './myWine';
import { CardMylist } from '@src/components/card/CardMylist';
import { DropdownBase } from '@src/components/dropdown/base/DropdownBase';
import {
  WineRegisterModal,
  type WineRegisterValue,
} from '@src/components/modal/modals/WineRegisterModal';
import { getTempHeader } from './tempHeader';
import { DeleteConfirmModal } from '@src/components/modal/modals/DeleteConfirmModal';
import { axiosInstance } from '@src/shared/apis/basic/axios';

const LIMIT_COUNT = 10;

export default function MyWines() {
  const [totalCount, setTotalCount] = useState(0);
  const [items, setItems] = useState<MyWine[]>([]);
  const [dropdownItem, setDropdownItem] = useState<MyWine | undefined>();
  const [editingItem, setEditingItem] = useState<MyWine | undefined>();
  const observerRef = useRef<IntersectionObserver>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [intersecting, setIntersecting] = useState(false);
  const isLoadingRef = useRef(false);
  const [deletingItem, setDeletingItem] = useState<MyWine>();

  async function loadFirstList() {
    isLoadingRef.current = true;
    const res = await axiosInstance.get(
      `users/me/wines?limit=${LIMIT_COUNT}`,
      await getTempHeader(),
    );
    setItems(res.data.list);
    setTotalCount(res.data.totalCount);
    setCursor(res.data.nextCursor);
    isLoadingRef.current = false;
  }

  function loadNextList() {
    isLoadingRef.current = true;
    getTempHeader().then((header) => {
      axiosInstance
        .get(`users/me/wines?limit=${LIMIT_COUNT}&cursor=${cursor}`, header)
        .then((res) => {
          setItems([...items, ...res.data.list]);
          setCursor(res.data.nextCursor);
          isLoadingRef.current = false;
        });
    });
  }

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
    if (!intersecting || !cursor || isLoadingRef.current) return;
    loadNextList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersecting, cursor]);

  useEffect(() => {
    const observer = observerRef.current;
    const target = targetRef.current;
    if (!observer || !target) return;

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [items]);

  async function requestDeleteItem(item: MyWine) {
    await axiosInstance.delete(`wines/${item.id}`, await getTempHeader());
    setItems(items.filter((it) => it.id != item.id));
  }

  async function onSubmitItem(value: WineRegisterValue) {
    //     {
    //   "image": "string",
    //   "type": "RED"
    // }
    let fileUrl: string | null = null;
    const tempHeader = await getTempHeader();
    if (value.photoFile) {
      const formdata = new FormData();
      formdata.append('image', value.photoFile);
      const res = await axiosInstance.post('images/upload', formdata, {
        headers: {
          ...tempHeader.headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fileUrl = res.data.url;
    }

    const body = {
      name: value.name,
      region: value.origin,
      price: parseInt(value.price + ''),
      type: value.type.toUpperCase(),
      ...(fileUrl ? { image: fileUrl } : {}),
    };
    const editingId = editingItem?.id ?? 0;
    const res = await axiosInstance.patch(`wines/${editingId}`, body, tempHeader);
    setItems((prev) => prev.map((it) => (it.id != editingId ? it : res.data)));
  }

  return (
    <div className="flex flex-col">
      {editingItem && (
        <WineRegisterModal
          isOpen={true}
          onClose={() => setEditingItem(undefined)}
          onSubmit={onSubmitItem}
        />
      )}
      <DeleteConfirmModal
        isOpen={deletingItem != undefined}
        onClose={() => setDeletingItem(undefined)}
        onConfirm={() => requestDeleteItem(deletingItem!)}
      />
      <div className="mb-4 self-end text-[12px] leading-[26px] font-[var(--font-weight-regular)] text-[var(--color-primary-purple-100)] md:text-[14px]">
        {`총 ${totalCount}개`}
      </div>
      <div className="flex w-full flex-col gap-4 md:gap-5">
        {items.map((it: MyWine, index) => {
          const isTarget = index == items.length - 4;
          return (
            <div key={it.id} ref={isTarget ? targetRef : null} className="relative">
              <CardMylist
                title={it.name}
                text={it.region}
                price={it.price}
                onMenuClick={() => setDropdownItem(it)}
              />
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
    </div>
  );
}
