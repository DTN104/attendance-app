import { BriefcaseBusiness, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';

import { AttachmentField, DurationChip, SelectField, SummaryCard, TextAreaField } from '@/components/forms/RequestFormFields';
import { FormSection, RequestFormLayout } from '@/components/forms/RequestFormLayout';
import { DatePickerField } from '@/components/ui/DatePickerField';
import { spacing } from '@/theme/tokens';
import { formatShortDate, getInclusiveDayCount } from '@/utils/date';

export default function BusinessTripRequestScreen() {
  const [fromDate, setFromDate] = useState(() => new Date(2026, 6, 20));
  const [toDate, setToDate] = useState(() => new Date(2026, 6, 22));
  const [purpose, setPurpose] = useState('');
  const duration = getInclusiveDayCount(fromDate, toDate);

  return (
    <RequestFormLayout
      onDraft={() => Alert.alert('Đã lưu nháp', 'Đơn công tác đã được lưu bằng dữ liệu mô phỏng.')}
      onSubmit={() => Alert.alert('Đã gửi đơn', 'Đơn công tác đã được gửi bằng dữ liệu mô phỏng.')}
      submitDisabled={!purpose.trim()}
      subtitle="Đăng ký lịch trình công tác"
      title="Tạo đơn công tác">
      <FormSection label="Địa điểm công tác">
        <SelectField detail="Văn phòng ACBS Hà Nội" icon={MapPin} value="Hà Nội" />
      </FormSection>

      <FormSection label="Thời gian công tác">
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <DatePickerField label="Từ ngày" onChange={(date) => { setFromDate(date); if (date > toDate) setToDate(date); }} value={fromDate} />
          <DatePickerField label="Đến ngày" minimumDate={fromDate} onChange={setToDate} value={toDate} />
        </View>
        <DurationChip label={`${duration} ngày công tác`} />
      </FormSection>

      <FormSection hint="Bắt buộc" label="Mục đích công tác">
        <TextAreaField onChangeText={setPurpose} placeholder="Nhập mục đích và nội dung chuyến công tác..." value={purpose} />
      </FormSection>

      <FormSection hint="Không bắt buộc" label="Đính kèm">
        <AttachmentField onPress={() => Alert.alert('Tệp đính kèm', 'Chức năng chọn tệp sẽ được kết nối ở giai đoạn sau.')} />
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
