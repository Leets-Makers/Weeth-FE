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
import Badge from '@/components/Admin/Badge';

interface AttendanceItem {
  id: number;
  title: string;
  content: string;
  start: string;
  cardinal?: number;
}

interface AttendanceProps {
  selectedCardinal: number | null;
}

const Attendance: React.FC<AttendanceProps> = ({ selectedCardinal }) => {
  const [data, setData] = useState<AttendanceItem[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [thisWeekId, setThisWeekId] = useState<number | null>(null);
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY년 M월 D일');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      setData([]);

      const res = await fetchAttendancesByCardinal(selectedCardinal);

      if (res.code === 200) {
        const { thisWeek, meetings } = res.data;

        // thisWeek이 있으면 해당 ID를 저장
        if (thisWeek) {
          setThisWeekId(thisWeek.id);

          // thisWeek 항목을 맨 위로 정렬
          const sortedMeetings = [...meetings].sort((a, b) => {
            if (a.id === thisWeek.id) return -1;
            if (b.id === thisWeek.id) return 1;
            return 0;
          });

          setData(sortedMeetings);
        } else {
          setThisWeekId(null);
          setData(meetings);
        }
      }
    };
    fetchData();
  }, [selectedCardinal, isAdmin]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const filteredData =
    selectedCardinal != null
      ? data.filter((item) => item.cardinal === selectedCardinal)
      : data;

  return (
    <>
      {filteredData.map((item) => (
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
                  {thisWeekId === item.id && (
                    <Badge
                      text="이번 주"
                      isActive={openDropdownId === item.id}
                    />
                  )}
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
