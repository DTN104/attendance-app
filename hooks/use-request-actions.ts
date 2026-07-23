import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { useRequests } from '@/context/RequestsContext';
import type { NewEmployeeRequest } from '@/data/requests';
import { submitWithAttachment } from '@/services/attachments';
import type { LocalAttachment } from '@/services/attachments';

export function useRequestActions(request: NewEmployeeRequest, attachment: LocalAttachment | null) {
  const { saveDraft, submitRequest } = useRequests();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const save = () => {
    saveDraft({ ...request, attachment: attachment ? { name: attachment.name } : undefined });
    router.replace('/requests');
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const id = await submitWithAttachment(attachment, (uploaded) => submitRequest({ ...request, attachment: uploaded }));
      router.replace({ pathname: '/request-detail', params: { id } });
    } catch (error) {
      Alert.alert('Không thể gửi đơn', error instanceof Error ? error.message : 'Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, save, submit };
}
