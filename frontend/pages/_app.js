import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        duration: 3500,
        style: { background: '#fff', color: '#1f2937', border: '1px solid #fce7f3', borderRadius: '12px' },
        success: { iconTheme: { primary: '#e11d48', secondary: '#fff' } },
      }} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
