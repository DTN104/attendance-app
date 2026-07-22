import { router } from 'expo-router';
import { Clock3 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimeRangePickerField } from '@/components/ui/DatePickerField';
import { useRequests } from '@/context/RequestsContext';
import { spacing } from '@/theme/tokens';
import { formatDate, formatHours, formatShortDate, formatTime, getHourDuration } from '@/utils/date';

export default function OvertimeRequestScreen() {
  const { submitRequest } = useRequests();
  const [date, setDate] = useState(() => new Date(2026, 6, 18));
  const [fromTime, setFromTime] = useState(() => new Date(2026, 6, 18, 18));
  const [toTime, setToTime] = useState(() => new Date(2026, 6, 18, 20));
  const [content, setContent] = useState('');
  const duration = getHourDuration(fromTime, toTime);
  const submit = () => {
    const id = submitRequest({
      type: 'overtime', title: 'Tăng ca ngày thường', period: `${formatShortDate(date)} · ${formatTime(fromTime)} - ${formatTime(toTime)}`,
      details: [
        { label: 'Loại tăng ca', value: 'Tăng ca ngày thường' },
        { label: 'Ngày tăng ca', value: formatDate(date) },
        { label: 'Khung giờ', value: `${formatTime(fromTime)} - ${formatTime(toTime)}` },
        { label: 'Tổng thời gian', value: `${formatHours(duration)} giờ` },
        { label: 'Nội dung công việc', value: content.trim() },
      ],
    });
    router.replace({ pathname: '/request-detail', params: { id } });
  };

  return (
    <RequestFormLayout
      onDraft={() => Alert.alert('Đã lưu nháp', 'Đơn tăng ca đã được lưu bằng dữ liệu mô phỏng.')}
      onSubmit={submit}
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
        <AttachmentField />
      </FormSection>

      <SummaryCard detail={`6.5 giờ + ${formatHours(duration)} giờ`} icon={Clock3} title="Tổng giờ OT tháng 7" tone="primary" value={`${formatHours(6.5 + duration)} giờ`} />
    </RequestFormLayout>
  );
}
