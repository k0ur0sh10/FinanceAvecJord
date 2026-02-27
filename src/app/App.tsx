import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="dark min-h-screen">
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </div>
    </LanguageProvider>
  );
}