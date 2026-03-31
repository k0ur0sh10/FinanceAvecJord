import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </LanguageProvider>
  );
}
