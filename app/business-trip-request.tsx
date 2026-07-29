import { useLocalSearchParams } from 'expo-router';
import { BriefcaseBusiness, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField } from '@/components/ui/DatePickerField';
import { useRequests } from '@/context/RequestsContext';
import type { RequestAttachment } from '@/data/requests';
import { useRequestActions } from '@/hooks/use-request-actions';
import { spacing } from '@/theme/tokens';
import { formatDate, formatIsoDate, formatShortDate, getInclusiveDayCount, parseIsoDate } from '@/utils/date';

export default function BusinessTripRequestScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { requests } = useRequests();
  const draft = requests.find((item) => item.id === id && item.status === 'draft' && item.type === 'business');
  const [fromDate, setFromDate] = useState(() => parseIsoDate(draft?.payload?.startDate ?? '2026-07-20'));
  const [toDate, setToDate] = useState(() => parseIsoDate(draft?.payload?.endDate ?? '2026-07-22'));
  const [purpose, setPurpose] = useState(draft?.payload?.purpose ?? '');
  const [attachment, setAttachment] = useState<RequestAttachment | null>(() => draft?.attachment ?? null);
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
  const { isSubmitting, save, submit } = useRequestActions(request, attachment, draft?.id);

  return (
    <RequestFormLayout
      onDraft={save}
      onSubmit={submit}
      submitting={isSubmitting}
      submitDisabled={!purpose.trim()}
      subtitle="Đăng ký lịch trình công tác"
      title={draft ? 'Chỉnh sửa đơn công tác' : 'Đăng ký đi công tác'}>
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
