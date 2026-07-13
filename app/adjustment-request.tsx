import { RefreshCcw } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimePickerField } from '@/components/ui/DatePickerField';
import { spacing } from '@/theme/tokens';
import { formatShortDate } from '@/utils/date';

export default function AdjustmentRequestScreen() {
  const [date, setDate] = useState(() => new Date(2026, 6, 10));
  const [time, setTime] = useState(() => new Date(2026, 6, 10, 17, 36));
  const [reason, setReason] = useState('');

  return (
    <RequestFormLayout
      onDraft={() => Alert.alert('Đã lưu nháp', 'Đơn điều chỉnh đã được lưu bằng dữ liệu mô phỏng.')}
      onSubmit={() => Alert.alert('Đã gửi đơn', 'Đơn điều chỉnh đã được gửi bằng dữ liệu mô phỏng.')}
      submitDisabled={!reason.trim()}
      subtitle="Bổ sung hoặc điều chỉnh dữ liệu chấm công"
      title="Điều chỉnh chấm công">
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
        <AttachmentField onPress={() => Alert.alert('Tệp đính kèm', 'Chức năng chọn tệp sẽ được kết nối ở giai đoạn sau.')} />
      </FormSection>

      <SummaryCard detail={formatShortDate(date)} icon={RefreshCcw} title="Dữ liệu hiện tại" tone="warning" value="08:41 → --:--" />
    </RequestFormLayout>
  );
}
