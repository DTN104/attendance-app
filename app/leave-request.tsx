import { CalendarDays, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField } from '@/components/ui/DatePickerField';
import { useRequestActions } from '@/hooks/use-request-actions';
import type { LocalAttachment } from '@/services/attachments';
import { spacing } from '@/theme/tokens';
import { formatDate, formatShortDate, getInclusiveDayCount } from '@/utils/date';

const LEAVE_BALANCE = 12;

export default function LeaveRequestScreen() {
  const [fromDate, setFromDate] = useState(() => new Date(2026, 6, 15));
  const [toDate, setToDate] = useState(() => new Date(2026, 6, 16));
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<LocalAttachment | null>(null);
  const duration = getInclusiveDayCount(fromDate, toDate);
  const request = {
    type: 'leave' as const, title: 'Nghỉ phép năm', period: `${formatShortDate(fromDate)} - ${formatShortDate(toDate)}`,
    details: [
      { label: 'Loại nghỉ', value: 'Nghỉ phép năm' },
      { label: 'Thời gian', value: `${formatDate(fromDate)} - ${formatDate(toDate)}` },
      { label: 'Thời lượng', value: `${duration} ngày` },
      { label: 'Lý do', value: reason.trim() },
    ],
  };
  const { isSubmitting, save, submit } = useRequestActions(request, attachment);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!reason.trim()}
      subtitle="Điền thông tin để gửi yêu cầu nghỉ phép"
      title="Tạo đơn nghỉ phép">
      <FormSection label="Loại nghỉ">
        <SelectField detail="Còn 12 ngày" icon={CalendarDays} value="Nghỉ phép năm" />
      </FormSection>

      <FormSection label="Thời gian nghỉ">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Từ ngày" onChange={(date) => { setFromDate(date); if (date > toDate) setToDate(date); }} value={fromDate} />
          <DatePickerField label="Đến ngày" minimumDate={fromDate} onChange={setToDate} value={toDate} />
        </View>
        <DurationChip label={`${duration} ngày nghỉ`} />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Lý do nghỉ">
        <TextAreaField onChangeText={setReason} placeholder="Nhập lý do nghỉ phép..." value={reason} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Đính kèm">
        <AttachmentField attachment={attachment} disabled={isSubmitting} onChange={setAttachment} />
      </FormSection>

      <SummaryCard
        detail={`${LEAVE_BALANCE} ngày - ${duration} ngày`}
        icon={CheckCircle2}
        title="Phép còn lại sau khi gửi"
        tone="success"
        value={`${Math.max(0, LEAVE_BALANCE - duration)} ngày`}
      />
    </RequestFormLayout>
  );
}
