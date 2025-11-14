import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from '@/components/common/PrivateRoute';
import FixedLayout from '@/Layout/FixedLayout';
import ResponsiveLayout from '@/Layout/ResponsiveLayout';
import NoHeaderLayout from '@/Layout/NoHeaderLayout';
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
const Login = lazy(() => import('@/pages/login/Login'));
const WaitingApproval = lazy(() => import('@/pages/login/WaitingApproval'));
const Profile = lazy(() => import('@/pages/login/Profile'));
const AccountCheck = lazy(() => import('@/pages/login/AccountCheck'));
const RegistrationSuccess = lazy(
  () => import('@/pages/login/RegistrationSuccess'),
);

const Member = lazy(() => import('@/pages/Member'));
const MemberDetail = lazy(() => import('@/pages/MemberDetail'));

const MyPage = lazy(() => import('@/pages/MyPage'));
const Receipt = lazy(() => import('@/pages/Receipt'));
const Redirect = lazy(() => import('@/pages/Redirect'));

const Board = lazy(() => import('@/pages/board/Board'));
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
  // 0. 헤더 없는 고정 레이아웃 (비로그인 페이지)
  {
    element: <NoHeaderLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/profile', element: <Profile /> },
      { path: '/accountcheck', element: <AccountCheck /> },
      { path: '/kakao/oauth', element: <Redirect /> },
      { path: '/register-success', element: <RegistrationSuccess /> },
      { path: '/waiting-approval', element: <WaitingApproval /> },
    ],
  },

  // 1. 고정 레이아웃 (로그인 필요)
  {
    element: <FixedLayout />,
    children: [
      { path: '/home', element: <PrivateRoute element={<Home />} /> },
      { path: '/calendar', element: <PrivateRoute element={<Calendar />} /> },
      { path: '/member', element: <PrivateRoute element={<Member />} /> },
      {
        path: '/member/:userId',
        element: <PrivateRoute element={<MemberDetail />} />,
      },
      { path: '/mypage', element: <PrivateRoute element={<MyPage />} /> },
      { path: '/edit', element: <PrivateRoute element={<Edit />} /> },
      { path: '/receipt', element: <PrivateRoute element={<Receipt />} /> },

      {
        path: '/events/create',
        element: <PrivateRoute element={<EventPost />} />,
      },
      {
        path: '/:type/:id',
        element: <PrivateRoute element={<EventDetail />} />,
      },
      {
        path: '/:type/:id/edit',
        element: <PrivateRoute element={<EventPost />} />,
      },
    ],
  },

  // 2. 반응형 레이아웃 (로그인 필요)
  {
    element: <ResponsiveLayout />,
    children: [
      {
        path: '/attendance',
        element: <PrivateRoute element={<Attendance />} />,
      },
      {
        path: '/attendCheck',
        element: <PrivateRoute element={<AttendCheck />} />,
      },
      { path: '/penalty', element: <PrivateRoute element={<Penalty />} /> },
      { path: '/dues', element: <PrivateRoute element={<Dues />} /> },

      {
        path: '/board',
        element: <PrivateRoute element={<BoardLayout />} />,
        children: [
          { index: true, element: <PrivateRoute element={<Board />} /> },
          {
            path: 'notices',
            element: <PrivateRoute element={<BoardNotice />} />,
          },
          {
            path: 'notices/post',
            element: <PrivateRoute element={<NoticePost />} />,
          },
          {
            path: 'notices/:postId',
            element: <PrivateRoute element={<NoticeDetail />} />,
          },
          {
            path: 'notices/:postId/edit',
            element: <PrivateRoute element={<NoticeEdit />} />,
          },
          {
            path: 'education/:part',
            element: <PrivateRoute element={<EducationBoard />} />,
          },
          {
            path: 'education/:part/post',
            element: <PrivateRoute element={<EduPost />} />,
          },
          {
            path: ':category/:part',
            element: <PrivateRoute element={<PartBoard />} />,
          },
          {
            path: ':category/:part/:postId',
            element: <PrivateRoute element={<PartDetail />} />,
          },
          {
            path: ':category/:part/:postId/edit',
            element: <PrivateRoute element={<PartEdit />} />,
          },
          {
            path: ':category/:part/post',
            element: <PrivateRoute element={<PartPost />} />,
          },
        ],
      },

      {
        path: '/education/:part/:postId',
        element: <PrivateRoute element={<EduDetail />} />,
      },
      {
        path: '/education/:part/:postId/edit',
        element: <PrivateRoute element={<EduEdit />} />,
      },
    ],
  },

  // 3. 어드민 레이아웃
  {
    element: <Layout />,
    children: [
      {
        path: '/admin',
        element: <PrivateRoute element={<AdminMember />} />,
      },
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
