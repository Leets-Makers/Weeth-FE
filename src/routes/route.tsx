import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from '@/components/common/PrivateRoute';
import Layout from '@/layout';

const BoardLayout = lazy(() => import('@/pages/Layout'));
const Attendance = lazy(() => import('@/pages/attend/Attendance'));
const AttendCheck = lazy(() => import('@/pages/attend/AttendCheck'));
const Penalty = lazy(() => import('@/pages/attend/Penalty'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const Dues = lazy(() => import('@/pages/Dues'));
const Edit = lazy(() => import('@/pages/Edit'));
const EventPost = lazy(() => import('@/pages/EventPost'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const Home = lazy(() => import('@/pages/Home'));
const Landing = lazy(() => import('@/pages/Landing'));
const Login = lazy(() => import('@/pages/Login'));
const Member = lazy(() => import('@/pages/Member'));
const MemberDetail = lazy(() => import('@/pages/MemberDetail'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const Profile = lazy(() => import('@/pages/Profile'));
const Receipt = lazy(() => import('@/pages/Receipt'));
const Redirect = lazy(() => import('@/pages/Redirect'));
const Board = lazy(() => import('@/pages/Board'));
const AccountCheck = lazy(() => import('@/pages/AccountCheck'));
const RegistrationSuccess = lazy(() => import('@/pages/RegistrationSuccess'));
const WaitingApproval = lazy(() => import('@/pages/WaitingApproval'));
const NoticeDetail = lazy(() => import('@/pages/board/notices/NoticeDetail'));
const PartBoard = lazy(() => import('@/pages/board/part/PartBoard'));
const EduPost = lazy(() => import('@/pages/board/education/EduPost'));
const EducationBoard = lazy(
  () => import('@/pages/board/education/EducationBoard'),
);
const NoticePost = lazy(() => import('@/pages/board/notices/NoticePost'));
const NoticeEdit = lazy(() => import('@/pages/board/notices/NoticeEdit'));
const PartEdit = lazy(() => import('@/pages/board/part/PartEdit'));
const PartPost = lazy(() => import('@/pages/board/part/PartPost'));
const PartDetail = lazy(() => import('@/pages/board/part/PartDetail'));
const EduDetail = lazy(() => import('@/pages/board/education/EduDetail'));
const EduEdit = lazy(() => import('@/pages/board/education/EduEdit'));
const BoardNotice = lazy(() => import('@/pages/board/notices/BoardNotice'));

const AdminAttendance = lazy(() => import('@/pages/admin/AdminAttendance'));
const AdminMember = lazy(() => import('@/pages/admin/AdminMember'));
const AdminDues = lazy(() => import('@/pages/admin/AdminDues'));
const AdminPenalty = lazy(() => import('@/pages/admin/AdminPenalty'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/profile', element: <Profile /> },
      { path: '/kakao/oauth', element: <Redirect /> },
      { path: '/accountcheck', element: <AccountCheck /> },
      { path: '/register-success', element: <RegistrationSuccess /> },
      { path: '/waiting-approval', element: <WaitingApproval /> },

      { path: '/attendance', element: <Attendance /> },
      { path: '/penalty', element: <Penalty /> },

      { path: '/calendar', element: <Calendar /> },
      { path: '/:type/:id', element: <EventDetail /> },
      { path: '/events/create', element: <EventPost /> },
      { path: '/:type/:id/edit', element: <EventPost /> },
      { path: '/home', element: <Home /> },
      { path: '/attendCheck', element: <AttendCheck /> },
      { path: '/member', element: <Member /> },
      { path: '/member/:userId', element: <MemberDetail /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/edit', element: <Edit /> },
      { path: '/dues', element: <Dues /> },
      { path: '/receipt', element: <Receipt /> },

      {
        path: '/board',
        element: <BoardLayout />,
        children: [
          { index: true, element: <Board /> },
          { path: 'notices', element: <BoardNotice /> },
          { path: 'notices/post', element: <NoticePost /> },
          { path: 'notices/:postId', element: <NoticeDetail /> },
          { path: 'notices/:postId/edit', element: <NoticeEdit /> },
          { path: 'education/:part', element: <EducationBoard /> },
          { path: 'education/:part/post', element: <EduPost /> },
          { path: ':category/:part', element: <PartBoard /> },
          { path: ':category/:part/:postId', element: <PartDetail /> },
          { path: ':category/:part/:postId/edit', element: <PartEdit /> },
          { path: ':category/:part/post', element: <PartPost /> },
        ],
      },

      { path: '/education/:part/:postId', element: <EduDetail /> },
      { path: '/education/:part/:postId/edit', element: <EduEdit /> },

      { path: '/admin', element: <PrivateRoute element={<AdminMember />} /> },
      {
        path: '/admin/attendance',
        element: <PrivateRoute element={<AdminAttendance />} />,
      },
      {
        path: '/admin/member',
        element: <PrivateRoute element={<AdminMember />} />,
      },
      {
        path: '/admin/dues',
        element: <PrivateRoute element={<AdminDues />} />,
      },
      {
        path: '/admin/penalty',
        element: <PrivateRoute element={<AdminPenalty />} />,
      },
    ],
  },
]);

export default router;
