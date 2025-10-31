import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Home } from './components/Home';
import { SignToText } from './components/SignToText';
import { TextToSign } from './components/TextToSign';
import { History } from './components/History';
import { Settings } from './components/Settings';
//import { DictionaryManager } from './components/DictionaryManager';

export type Screen = 'home' | 'sign-to-text' | 'text-to-sign' | 'history' | 'settings' | 'dictionary';

export interface Translation {
  id: string;
  type: 'sign-to-text' | 'text-to-sign';
  input: string;
  output: string;
  timestamp: Date;
}

export interface AppSettings {
  language: string;
  voiceType: string;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  vibrationFeedback: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [translations, setTranslations] = useState<Translation[]>([
    {
      id: '1',
      type: 'sign-to-text',
      input: 'Hand gestures',
      output: 'Hello, how are you?',
      timestamp: new Date(2025, 9, 28, 14, 30),
    },
    {
      id: '2',
      type: 'text-to-sign',
      input: 'Thank you',
      output: 'Sign animation played',
      timestamp: new Date(2025, 9, 28, 15, 45),
    },
    {
      id: '3',
      type: 'sign-to-text',
      input: 'Hand gestures',
      output: 'Good morning',
      timestamp: new Date(2025, 9, 29, 9, 15),
    },
  ]);
  const [settings, setSettings] = useState<AppSettings>({
    language: 'english',
    voiceType: 'female',
    fontSize: 'medium',
    highContrast: false,
    vibrationFeedback: true,
  });

  const addTranslation = (translation: Omit<Translation, 'id' | 'timestamp'>) => {
    const newTranslation: Translation = {
      ...translation,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setTranslations([newTranslation, ...translations]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'sign-to-text':
        return <SignToText onNavigate={setCurrentScreen} onAddTranslation={addTranslation} settings={settings} />;
      case 'text-to-sign':
        return <TextToSign onNavigate={setCurrentScreen} onAddTranslation={addTranslation} settings={settings} />;
      case 'dictionary':
        return <DictionaryManager onNavigate={setCurrentScreen} settings={settings} />;
      case 'history':
        return <History onNavigate={setCurrentScreen} translations={translations} />;
      case 'settings':
        return <Settings onNavigate={setCurrentScreen} settings={settings} onUpdateSettings={setSettings} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      <div className={`min-h-screen ${settings.highContrast ? 'bg-black' : 'bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100'}`}>
        {renderScreen()}
      </div>
      <Toaster />
    </>
  );
}
