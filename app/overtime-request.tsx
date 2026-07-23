import { Clock3 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimeRangePickerField } from '@/components/ui/DatePickerField';
import { useRequestActions } from '@/hooks/use-request-actions';
import type { LocalAttachment } from '@/services/attachments';
import { spacing } from '@/theme/tokens';
import { formatDate, formatHours, formatShortDate, formatTime, getHourDuration } from '@/utils/date';

export default function OvertimeRequestScreen() {
  const [date, setDate] = useState(() => new Date(2026, 6, 18));
  const [fromTime, setFromTime] = useState(() => new Date(2026, 6, 18, 18));
  const [toTime, setToTime] = useState(() => new Date(2026, 6, 18, 20));
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState<LocalAttachment | null>(null);
  const duration = getHourDuration(fromTime, toTime);
  const request = {
    type: 'overtime' as const, title: 'Tăng ca ngày thường', period: `${formatShortDate(date)} · ${formatTime(fromTime)} - ${formatTime(toTime)}`,
    details: [
      { label: 'Loại tăng ca', value: 'Tăng ca ngày thường' },
      { label: 'Ngày tăng ca', value: formatDate(date) },
      { label: 'Khung giờ', value: `${formatTime(fromTime)} - ${formatTime(toTime)}` },
      { label: 'Tổng thời gian', value: `${formatHours(duration)} giờ` },
      { label: 'Nội dung công việc', value: content.trim() },
    ],
  };
  const { isSubmitting, save, submit } = useRequestActions(request, attachment);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!content.trim() || duration <= 0}
      subtitle="Đăng ký thời gian làm việc ngoài giờ"
      title="Đăng ký tăng ca">
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
