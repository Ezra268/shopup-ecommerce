import type { Metadata } from 'next';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ShopUp Admin Dashboard',
  description: 'Manage ShopUp Kenya e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </Provider>
      </body>
    </html>
  );
}
