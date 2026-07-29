import { useLocalSearchParams } from 'expo-router';
import { RefreshCcw } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimePickerField } from '@/components/ui/DatePickerField';
import { useRequests } from '@/context/RequestsContext';
import type { RequestAttachment } from '@/data/requests';
import { useRequestActions } from '@/hooks/use-request-actions';
import { spacing } from '@/theme/tokens';
import { formatDate, formatIsoDate, formatShortDate, formatTime, parseIsoDate } from '@/utils/date';

export default function AdjustmentRequestScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { requests } = useRequests();
  const draft = requests.find((item) => item.id === id && item.status === 'draft' && item.type === 'adjustment');
  const draftDate = draft?.payload?.date ?? '2026-07-10';
  const [date, setDate] = useState(() => parseIsoDate(draftDate));
  const [time, setTime] = useState(() => new Date(`${draftDate}T${draft?.payload?.proposedTime ?? '17:36'}:00`));
  const [reason, setReason] = useState(draft?.payload?.reason ?? '');
  const [attachment, setAttachment] = useState<RequestAttachment | null>(() => draft?.attachment ?? null);
  const request = {
    type: 'adjustment' as const, title: 'Bổ sung check-out', period: `${formatShortDate(date)} · Check-out ${formatTime(time)}`,
    payload: { adjustmentType: 'add_check_out', date: formatIsoDate(date), proposedTime: formatTime(time), reason: reason.trim() },
    details: [
      { label: 'Loại điều chỉnh', value: 'Bổ sung check-out' },
      { label: 'Ngày điều chỉnh', value: formatDate(date) },
      { label: 'Giờ đề nghị', value: formatTime(time) },
      { label: 'Dữ liệu hiện tại', value: '08:41 → --:--' },
      { label: 'Lý do', value: reason.trim() },
    ],
  };
  const { isSubmitting, save, submit } = useRequestActions(request, attachment, draft?.id);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!reason.trim()}
      subtitle="Bổ sung hoặc điều chỉnh dữ liệu chấm công"
      title={draft ? 'Chỉnh sửa yêu cầu chỉnh công' : 'Yêu cầu chỉnh công'}>
      <FormSection label="Loại điều chỉnh">
        <SelectField detail="Thiếu dữ liệu ngày 10/07" icon={RefreshCcw} value="Bổ sung check-out" />
      </FormSection>

      <FormSection label="Thời gian cần bổ sung">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Ngày điều chỉnh" onChange={setDate} value={date} />
          <TimePickerField label="Giờ check-out" onChange={setTime} value={time} />
        </View>
        <DurationChip label="Thiếu check-out" />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Lý do điều chỉnh">
        <TextAreaField onChangeText={setReason} placeholder="Nhập lý do cần điều chỉnh..." value={reason} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Minh chứng">
        <AttachmentField attachment={attachment} disabled={isSubmitting} onChange={setAttachment} />
      </FormSection>

      <SummaryCard detail={formatShortDate(date)} icon={RefreshCcw} title="Dữ liệu hiện tại" tone="warning" value="08:41 → --:--" />
    </RequestFormLayout>
  );
}
