import { BriefcaseBusiness, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField } from '@/components/ui/DatePickerField';
import { useRequestActions } from '@/hooks/use-request-actions';
import type { LocalAttachment } from '@/services/attachments';
import { spacing } from '@/theme/tokens';
import { formatDate, formatIsoDate, formatShortDate, getInclusiveDayCount } from '@/utils/date';

export default function BusinessTripRequestScreen() {
  const [fromDate, setFromDate] = useState(() => new Date(2026, 6, 20));
  const [toDate, setToDate] = useState(() => new Date(2026, 6, 22));
  const [purpose, setPurpose] = useState('');
  const [attachment, setAttachment] = useState<LocalAttachment | null>(null);
  const duration = getInclusiveDayCount(fromDate, toDate);
  const request = {
    type: 'business' as const, title: 'Công tác Hà Nội', period: `${formatShortDate(fromDate)} - ${formatShortDate(toDate)}`,
    payload: { location: 'Hà Nội', startDate: formatIsoDate(fromDate), endDate: formatIsoDate(toDate), purpose: purpose.trim() },
    details: [
      { label: 'Địa điểm', value: 'Hà Nội · Văn phòng ACBS Hà Nội' },
      { label: 'Thời gian', value: `${formatDate(fromDate)} - ${formatDate(toDate)}` },
      { label: 'Thời lượng', value: `${duration} ngày` },
      { label: 'Mục đích công tác', value: purpose.trim() },
    ],
  };
  const { isSubmitting, save, submit } = useRequestActions(request, attachment);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!purpose.trim()}
      subtitle="Đăng ký lịch trình công tác"
      title="Đăng ký đi công tác">
      <FormSection label="Địa điểm công tác">
        <SelectField detail="Văn phòng ACBS Hà Nội" icon={MapPin} value="Hà Nội" />
      </FormSection>

      <FormSection label="Thời gian công tác">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Từ ngày" onChange={(date) => { setFromDate(date); if (date > toDate) setToDate(date); }} value={fromDate} />
          <DatePickerField label="Đến ngày" minimumDate={fromDate} onChange={setToDate} value={toDate} />
        </View>
        <DurationChip label={`${duration} ngày`} />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Mục đích công tác">
        <TextAreaField onChangeText={setPurpose} placeholder="Nhập mục đích và nội dung chuyến công tác..." value={purpose} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Đính kèm">
        <AttachmentField attachment={attachment} disabled={isSubmitting} onChange={setAttachment} />
      </FormSection>

      <SummaryCard
        detail={`Hà Nội · ${duration} ngày`}
        icon={BriefcaseBusiness}
        title="Tóm tắt chuyến đi"
        tone="warning"
        value={`${formatShortDate(fromDate)} - ${formatShortDate(toDate)}`}
      />
    </RequestFormLayout>
  );
}
