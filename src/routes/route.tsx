import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '@/components/common/PrivateRoute';
import BoardLayout from '@/pages/Layout';
import Layout from '@/layout';

import {
  Attendance,
  AttendCheck,
  Penalty,
  Calendar,
  Dues,
  Edit,
  EventPost,
  EventDetail,
  Home,
  Landing,
  Login,
  Member,
  MemberDetail,
  MyPage,
  Profile,
  Receipt,
  Redirect,
  Board,
  AccountCheck,
  RegistrationSuccess,
  WaitingApproval,
  NoticeDetail,
  PartBoard,
  EduPost,
  EducationBoard,
  NoticePost,
  NoticeEdit,
  PartEdit,
  PartPost,
  PartDetail,
  EduDetail,
  EduEdit,
  BoardNotice,
  AdminAttendance,
  AdminMember,
  AdminDues,
  AdminPenalty,
} from '@/pages';

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
