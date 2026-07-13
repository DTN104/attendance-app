import { Clock3 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimeRangePickerField } from '@/components/ui/DatePickerField';
import { spacing } from '@/theme/tokens';
import { formatHours, getHourDuration } from '@/utils/date';

export default function OvertimeRequestScreen() {
  const [date, setDate] = useState(() => new Date(2026, 6, 18));
  const [fromTime, setFromTime] = useState(() => new Date(2026, 6, 18, 18));
  const [toTime, setToTime] = useState(() => new Date(2026, 6, 18, 20));
  const [content, setContent] = useState('');
  const duration = getHourDuration(fromTime, toTime);

  return (
    <RequestFormLayout
      onDraft={() => Alert.alert('Đã lưu nháp', 'Đơn tăng ca đã được lưu bằng dữ liệu mô phỏng.')}
      onSubmit={() => Alert.alert('Đã gửi đơn', 'Đơn tăng ca đã được gửi bằng dữ liệu mô phỏng.')}
      submitDisabled={!content.trim() || duration <= 0}
      subtitle="Đăng ký thời gian làm việc ngoài giờ"
      title="Tạo đơn tăng ca">
      <FormSection label="Loại tăng ca">
        <SelectField detail="Hệ số 150%" icon={Clock3} value="Tăng ca ngày thường" />
      </FormSection>

      <FormSection label="Thời gian tăng ca">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Ngày tăng ca" onChange={setDate} value={date} />
          <TimeRangePickerField fromValue={fromTime} label="Khung giờ" onChangeFrom={setFromTime} onChangeTo={setToTime} toValue={toTime} />
        </View>
        <DurationChip label={`${formatHours(duration)} giờ tăng ca`} />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Nội dung công việc">
        <TextAreaField onChangeText={setContent} placeholder="Mô tả công việc cần thực hiện..." value={content} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Đính kèm">
        <AttachmentField onPress={() => Alert.alert('Tệp đính kèm', 'Chức năng chọn tệp sẽ được kết nối ở giai đoạn sau.')} />
      </FormSection>

      <SummaryCard detail={`6.5 giờ + ${formatHours(duration)} giờ`} icon={Clock3} title="Tổng giờ OT tháng 7" tone="primary" value={`${formatHours(6.5 + duration)} giờ`} />
    </RequestFormLayout>
  );
}
