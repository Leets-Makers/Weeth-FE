import './assets/fonts/fonts.css';

import router from '@/routes/route';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CustomToastContainer } from '@/components/common/ToastMessage';

import theme from '@/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomToastContainer limit={1} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
