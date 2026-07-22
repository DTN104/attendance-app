import { router } from 'expo-router';
import { RefreshCcw } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField, TimePickerField } from '@/components/ui/DatePickerField';
import { useRequests } from '@/context/RequestsContext';
import { spacing } from '@/theme/tokens';
import { formatDate, formatShortDate, formatTime } from '@/utils/date';

export default function AdjustmentRequestScreen() {
  const { submitRequest } = useRequests();
  const [date, setDate] = useState(() => new Date(2026, 6, 10));
  const [time, setTime] = useState(() => new Date(2026, 6, 10, 17, 36));
  const [reason, setReason] = useState('');
  const submit = () => {
    const id = submitRequest({
      type: 'adjustment', title: 'Bổ sung check-out', period: `${formatShortDate(date)} · Check-out ${formatTime(time)}`,
      details: [
        { label: 'Loại điều chỉnh', value: 'Bổ sung check-out' },
        { label: 'Ngày điều chỉnh', value: formatDate(date) },
        { label: 'Giờ đề nghị', value: formatTime(time) },
        { label: 'Dữ liệu hiện tại', value: '08:41 → --:--' },
        { label: 'Lý do', value: reason.trim() },
      ],
    });
    router.replace({ pathname: '/request-detail', params: { id } });
  };

  return (
    <RequestFormLayout
      onDraft={() => Alert.alert('Đã lưu nháp', 'Đơn điều chỉnh đã được lưu bằng dữ liệu mô phỏng.')}
      onSubmit={submit}
      submitDisabled={!reason.trim()}
      subtitle="Bổ sung hoặc điều chỉnh dữ liệu chấm công"
      title="Yêu cầu chỉnh công">
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
        <AttachmentField />
      </FormSection>

      <SummaryCard detail={formatShortDate(date)} icon={RefreshCcw} title="Dữ liệu hiện tại" tone="warning" value="08:41 → --:--" />
    </RequestFormLayout>
  );
}
