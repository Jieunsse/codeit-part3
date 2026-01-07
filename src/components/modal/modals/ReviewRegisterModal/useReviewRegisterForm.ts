import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_AROMAS,
  DEFAULT_TASTE,
  MAX_SELECT_AROMAS,
  MAX_TOTAL_AROMAS,
} from './ReviewRegisterModal.constants';
import type {
  ReviewRegisterInitialValue,
  ReviewRegisterValue,
  ReviewTasteKey,
} from './ReviewRegisterModal.types';

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: ReviewRegisterValue) => Promise<void> | void;
  initialValue?: ReviewRegisterInitialValue;
};

export function useReviewRegisterForm({ isOpen, onClose, onSubmit, initialValue }: Params) {
  const contentRef = useRef<HTMLDivElement>(null);

  const baseline = useMemo(() => {
    return {
      rating: initialValue?.rating ?? 4,
      content: initialValue?.content ?? '',
      taste: (initialValue?.taste ?? DEFAULT_TASTE) as Record<ReviewTasteKey, number>,
      aromas: initialValue?.aromas ?? [],
    };
  }, [initialValue]);

  const [rating, setRating] = useState(baseline.rating);
  const [content, setContent] = useState(baseline.content);
  const [isContentEmpty, setIsContentEmpty] = useState(baseline.content.trim().length === 0);

  const [taste, setTaste] = useState<Record<ReviewTasteKey, number>>(baseline.taste);

  const [selectedAromas, setSelectedAromas] = useState<string[]>(baseline.aromas);
  const [customAromas, setCustomAromas] = useState<string[]>([]);
  const [isAddingAroma, setIsAddingAroma] = useState(false);
  const [newAroma, setNewAroma] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const allAromas = useMemo(() => {
    const set = new Set<string>([...DEFAULT_AROMAS, ...customAromas]);
    return Array.from(set);
  }, [customAromas]);

  const hasDirty = useMemo(() => {
    const sameAromas = selectedAromas.join('|') === baseline.aromas.join('|');

    return (
      rating !== baseline.rating ||
      content.trim() !== baseline.content.trim() ||
      !sameAromas ||
      customAromas.length > 0 ||
      taste.body !== baseline.taste.body ||
      taste.tannin !== baseline.taste.tannin ||
      taste.sweet !== baseline.taste.sweet ||
      taste.acid !== baseline.taste.acid
    );
  }, [rating, content, selectedAromas, customAromas.length, taste, baseline]);

  /** 공백 정규화(중복 공백 제거) */
  const normalizeTag = (s: string) => s.trim().replace(/\s+/g, ' ');

  /**
   * 향 선택/해제 토글
   * - 최대 MAX_SELECT_AROMAS개 선택 제한
   */
  const toggleAroma = (tag: string) => {
    setError('');
    setSelectedAromas((prev) => {
      const exists = prev.includes(tag);
      if (exists) return prev.filter((t) => t !== tag);

      if (prev.length >= MAX_SELECT_AROMAS) {
        setError(`향은 최대 ${MAX_SELECT_AROMAS}개까지 선택할 수 있어요.`);
        return prev;
      }
      return [...prev, tag];
    });
  };

  /**
   * 커스텀 향 태그 추가
   * - 대소문자 무시 중복 방지
   * - 합산 MAX_TOTAL_AROMAS 제한
   */
  const addCustomAroma = () => {
    setError('');
    const tag = normalizeTag(newAroma);
    if (!tag) return;

    const lower = tag.toLowerCase();
    const existsInAll = allAromas.some((t) => t.toLowerCase() === lower);
    if (existsInAll) {
      setError('이미 존재하는 향 태그예요.');
      return;
    }

    if (allAromas.length + 1 > MAX_TOTAL_AROMAS) {
      setError(`향 태그는 최대 ${MAX_TOTAL_AROMAS}개까지 만들 수 있어요.`);
      return;
    }

    setCustomAromas((prev) => [...prev, tag]);
    setNewAroma('');
  };

  /**
   * 닫기 요청 처리
   * - 태그 추가 입력 중이면 입력만 종료
   * - Dirty 상태면 확인 모달 표시
   */
  const requestClose = () => {
    if (submitting) return;

    if (isAddingAroma) {
      setNewAroma('');
      setIsAddingAroma(false);
      return;
    }

    if (hasDirty) {
      setShowCloseConfirm(true);
      return;
    }

    onClose();
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => setShowCloseConfirm(false);

  /**
   * 제출 처리
   * - 향 태그 최소 1개 선택 필수
   * - 성공적으로 resolve 되면 모달 닫힘
   */
  const submit = async () => {
    setError('');

    if (selectedAromas.length < 1) {
      setError('향 태그를 최소 1개 이상 선택해 주세요.');
      return;
    }

    const payload: ReviewRegisterValue = {
      rating,
      content,
      taste,
      aromas: selectedAromas,
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  // 모달 열릴 때마다 baseline 기준으로 초기화
  useEffect(() => {
    if (!isOpen) return;

    setRating(baseline.rating);
    setContent(baseline.content);
    setIsContentEmpty(baseline.content.trim().length === 0);
    setTaste(baseline.taste);

    setSelectedAromas(baseline.aromas);

    setCustomAromas([]);
    setIsAddingAroma(false);
    setNewAroma('');

    setError('');
    setSubmitting(false);
    setShowCloseConfirm(false);

    if (contentRef.current) contentRef.current.textContent = baseline.content;
  }, [isOpen, baseline]);

  return {
    // refs
    contentRef,

    // states
    rating,
    content,
    isContentEmpty,
    taste,
    selectedAromas,
    customAromas,
    isAddingAroma,
    newAroma,
    error,
    submitting,
    showCloseConfirm,

    // derived
    allAromas,
    hasDirty,

    // setters/handlers
    setRating,
    setTaste,
    setIsAddingAroma,
    setNewAroma,
    toggleAroma,
    addCustomAroma,

    setContent,
    setIsContentEmpty,

    requestClose,
    confirmClose,
    cancelClose,

    submit,
  };
}
