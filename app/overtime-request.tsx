import { useLocalSearchParams } from 'expo-router';
import { Clock3 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimeRangePickerField } from '@/components/ui/DatePickerField';
import { useRequests } from '@/context/RequestsContext';
import type { RequestAttachment } from '@/data/requests';
import { useRequestActions } from '@/hooks/use-request-actions';
import { spacing } from '@/theme/tokens';
import { formatDate, formatHours, formatIsoDate, formatShortDate, formatTime, getHourDuration, parseIsoDate } from '@/utils/date';

export default function OvertimeRequestScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { requests } = useRequests();
  const draft = requests.find((item) => item.id === id && item.status === 'draft' && item.type === 'overtime');
  const draftDate = draft?.payload?.date ?? '2026-07-18';
  const [date, setDate] = useState(() => parseIsoDate(draftDate));
  const [fromTime, setFromTime] = useState(() => new Date(`${draftDate}T${draft?.payload?.startTime ?? '18:00'}:00`));
  const [toTime, setToTime] = useState(() => new Date(`${draftDate}T${draft?.payload?.endTime ?? '20:00'}:00`));
  const [content, setContent] = useState(draft?.payload?.workContent ?? '');
  const [attachment, setAttachment] = useState<RequestAttachment | null>(() => draft?.attachment ?? null);
  const duration = getHourDuration(fromTime, toTime);
  const request = {
    type: 'overtime' as const, title: 'Tăng ca ngày thường', period: `${formatShortDate(date)} · ${formatTime(fromTime)} - ${formatTime(toTime)}`,
    payload: { overtimeType: 'weekday', date: formatIsoDate(date), startTime: formatTime(fromTime), endTime: formatTime(toTime), workContent: content.trim() },
    details: [
      { label: 'Loại tăng ca', value: 'Tăng ca ngày thường' },
      { label: 'Ngày tăng ca', value: formatDate(date) },
      { label: 'Khung giờ', value: `${formatTime(fromTime)} - ${formatTime(toTime)}` },
      { label: 'Tổng thời gian', value: `${formatHours(duration)} giờ` },
      { label: 'Nội dung công việc', value: content.trim() },
    ],
  };
  const { isSubmitting, save, submit } = useRequestActions(request, attachment, draft?.id);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!content.trim() || duration <= 0}
      subtitle="Đăng ký thời gian làm việc ngoài giờ"
      title={draft ? 'Chỉnh sửa đơn tăng ca' : 'Đăng ký tăng ca'}>
      <FormSection label="Loại tăng ca">
        <SelectField detail="Hệ số 150%" icon={Clock3} value="Tăng ca ngày thường" />
      </FormSection>

      <FormSection label="Thời gian tăng ca">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Ngày tăng ca" onChange={setDate} value={date} />
          <TimeRangePickerField fromValue={fromTime} label="Khung giờ" onChangeFrom={setFromTime} onChangeTo={setToTime} toValue={toTime} />
        </View>
        <DurationChip label={`${formatHours(duration)} giờ`} />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Nội dung công việc">
        <TextAreaField onChangeText={setContent} placeholder="Mô tả công việc cần thực hiện..." value={content} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Đính kèm">
        <AttachmentField attachment={attachment} disabled={isSubmitting} onChange={setAttachment} />
      </FormSection>

      <SummaryCard detail={`6.5 giờ + ${formatHours(duration)} giờ`} icon={Clock3} title="Tổng giờ OT tháng 7" tone="primary" value={`${formatHours(6.5 + duration)} giờ`} />
    </RequestFormLayout>
  );
}
