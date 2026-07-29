import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { DraftCreatedError, useRequests } from '@/context/RequestsContext';
import type { NewEmployeeRequest, RequestAttachment } from '@/data/requests';

export function useRequestActions(request: NewEmployeeRequest, attachment: RequestAttachment | null, draftId?: string) {
  const { saveDraft, submitDraft, submitRequest, updateDraft } = useRequests();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDraftId, setActiveDraftId] = useState(draftId);

  const save = async () => {
    setIsSubmitting(true);
    try {
      const nextRequest = { ...request, attachment: attachment ?? undefined };
      if (activeDraftId) await updateDraft(activeDraftId, nextRequest);
      else setActiveDraftId(await saveDraft(nextRequest));
      router.replace('/requests');
    } catch (error) {
      if (error instanceof DraftCreatedError) setActiveDraftId(error.draftId);
      Alert.alert('Không thể lưu nháp', error instanceof Error ? error.message : 'Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      let id = activeDraftId;
      if (id) {
        const storedAttachment = await updateDraft(id, { ...request, attachment: attachment ?? undefined });
        await submitDraft(id, storedAttachment);
      } else {
        id = await submitRequest(request, attachment);
      }
      router.replace({ pathname: '/request-detail', params: { id } });
    } catch (error) {
      if (error instanceof DraftCreatedError) setActiveDraftId(error.draftId);
      Alert.alert('Không thể gửi đơn', error instanceof Error ? error.message : 'Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, save, submit };
}
