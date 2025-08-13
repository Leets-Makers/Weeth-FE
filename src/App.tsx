import './App.css';
import './assets/fonts/fonts.css';

import ScrollToTop from '@/hooks/ScrollToTop';
import Attendance from '@/pages/Attendance';
import AttendCheck from '@/pages/AttendCheck';
import Calendar from '@/pages/Calendar';
import Dues from '@/pages/Dues';
import Edit from '@/pages/Edit';
import EventPost from '@/pages/EventPost';
import EventDetail from '@/pages/EventDetail';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Member from '@/pages/Member';
import MemberDetail from '@/pages/MemberDetail';
import MyPage from '@/pages/MyPage';
import Profile from '@/pages/Profile';
import Receipt from '@/pages/Receipt';
import theme from '@/styles/theme';
import Redirect from '@/pages/Redirect';
import Board from '@/pages/Board';
import AccountCheck from '@/pages/AccountCheck';
import RegistrationSuccess from '@/pages/RegistrationSuccess';
import WaitingApproval from '@/pages/WaitingApproval';
import NoticeDetail from '@/pages/board/notices/NoticeDetail';
import PartBoard from '@/pages/board/part/PartBoard';
import EduPost from '@/pages/board/education/EduPost';
import EducationBoard from '@/pages/board/education/EducationBoard';
import NoticePost from '@/pages/board/notices/NoticePost';
import NoticeEdit from '@/pages/board/notices/NoticeEdit';
import PartEdit from '@/pages/board/part/PartEdit';
import PartPost from '@/pages/board/part/PartPost';
import PartDetail from '@/pages/board/part/PartDetail';
import EduDetail from '@/pages/board/education/EduDetail';
import EduEdit from '@/pages/board/education/EduEdit';
import BoardNotice from '@/pages/board/notices/BoardNotice';

import AdminAttendance from '@/pages/admin/AdminAttendance';
import AdminMember from '@/pages/admin/AdminMember';
import AdminDues from '@/pages/admin/AdminDues';
import AdminPenalty from '@/pages/admin/AdminPenalty';

import PrivateRoute from '@/components/common/PrivateRoute';
import { CustomToastContainer } from '@/components/common/ToastMessage';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomToastContainer limit={1} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kakao/oauth" element={<Redirect />} />
        <Route path="/accountcheck" element={<AccountCheck />} />
        <Route path="/register-success" element={<RegistrationSuccess />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/:type/:id" element={<EventDetail />} />
        <Route path="/events/create" element={<EventPost />} />
        <Route path="/:type/:id/edit" element={<EventPost />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attendCheck" element={<AttendCheck />} />
        <Route path="/member" element={<Member />} />
        <Route path="/member/:userId" element={<MemberDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/dues" element={<Dues />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/notices" element={<BoardNotice />} />
        <Route path="/board/notices/post" element={<NoticePost />} />
        <Route path="/board/notices/:postId" element={<NoticeDetail />} />
        <Route path="/board/notices/:postId/edit" element={<NoticeEdit />} />
        <Route path="/board/education/:part" element={<EducationBoard />} />
        <Route path="/board/education/:part/post" element={<EduPost />} />
        <Route path="/education/:part/:postId" element={<EduDetail />} />
        <Route path="/education/:part/:postId/edit" element={<EduEdit />} />
        <Route path="/board/:category/:part" element={<PartBoard />} />
        <Route path="/board/:category/:part/:postId" element={<PartDetail />} />
        <Route
          path="/board/:category/:part/:postId/edit"
          element={<PartEdit />}
        />
        <Route path="/board/:category/:part/post" element={<PartPost />} />

        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminMember />} />}
        />
        <Route
          path="/admin/attendance"
          element={<PrivateRoute element={<AdminAttendance />} />}
        />
        <Route
          path="/admin/member"
          element={<PrivateRoute element={<AdminMember />} />}
        />
        <Route
          path="/admin/dues"
          element={<PrivateRoute element={<AdminDues />} />}
        />
        <Route
          path="/admin/penalty"
          element={<PrivateRoute element={<AdminPenalty />} />}
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
