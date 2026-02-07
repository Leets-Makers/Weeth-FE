import { useEffect, useState } from 'react';
import {
  AttendanceTable,
  Wrapper,
  DateInfoWrapper,
  DateText,
  ContentText,
  DropdownButton,
} from '@/styles/admin/Attendance.styled';
import DropDown from '@/assets/images/ic_admin_cardinal.svg?react';
import fetchAttendancesByCardinal from '@/api/admin/attendance/fetchAttendancesByCardinal';
import dayjs from 'dayjs';
import AttendDropdown from '@/components/Admin/AttendDropdown';
import useUserData from '@/hooks/queries/useUserData';

interface AttendanceItem {
  id: number;
  title: string;
  content: string;
  start: string;
}

interface AttendanceProps {
  selectedCardinal: number | null;
}

const Attendance: React.FC<AttendanceProps> = ({ selectedCardinal }) => {
  const [data, setData] = useState<AttendanceItem[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY년 M월 D일');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      const res = await fetchAttendancesByCardinal(selectedCardinal);

      if (res.code === 200) {
        setData(res.data.meetings);
      }
    };
    fetchData();
  }, [selectedCardinal, isAdmin]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <AttendanceTable
            onClick={() => toggleDropdown(item.id)}
            $isOpen={openDropdownId === item.id}
          >
            <Wrapper>
              <div>
                <DateInfoWrapper>
                  <DateText $isOpen={openDropdownId === item.id}>
                    {formatDate(item.start)}
                  </DateText>
                  <ContentText $isOpen={openDropdownId === item.id}>
                    {item.content} {item.title}
                  </ContentText>
                </DateInfoWrapper>
              </div>
              <DropdownButton $isOpen={openDropdownId === item.id}>
                <DropDown />
              </DropdownButton>
            </Wrapper>
          </AttendanceTable>
          {openDropdownId === item.id && <AttendDropdown meetingId={item.id} />}
        </div>
      ))}
    </>
  );
};

export default Attendance;
