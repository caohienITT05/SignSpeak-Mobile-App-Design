import { useState } from 'react';
import { ArrowLeft, Play, Mic, Hand, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import type { Screen, AppSettings } from '../App';

interface TextToSignProps {
  onNavigate: (screen: Screen) => void;
  onAddTranslation: (translation: { type: 'sign-to-text' | 'text-to-sign'; input: string; output: string }) => void;
  settings: AppSettings;
}

export function TextToSign({ onNavigate, onAddTranslation, settings }: TextToSignProps) {
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handlePlayGesture = () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text first');
      return;
    }

    setIsPlaying(true);
    onAddTranslation({
      type: 'text-to-sign',
      input: inputText,
      output: 'Sign animation played',
    });

    // Simulate animation duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const mockVoiceText = 'Thank you very much';
      setInputText(mockVoiceText);
      setIsListening(false);
      toast.success('Voice input captured!');
    }, 2000);
  };

  const fontSizeClass = settings.fontSize === 'small' ? 'text-sm' : settings.fontSize === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className={`min-h-screen flex flex-col ${settings.highContrast ? 'bg-black' : 'bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100'}`}>
      {/* Header */}
      <header className={`px-6 pt-6 pb-4 flex items-center gap-4 ${settings.highContrast ? 'bg-gray-900' : ''}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className={`rounded-full w-11 h-11 ${settings.highContrast ? 'text-white hover:bg-gray-800' : 'hover:bg-white/60'}`}
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2} />
        </Button>
        <div className="flex-1">
          <h1 className={settings.highContrast ? 'text-white' : 'text-gray-800'}>Text to Sign</h1>
          <p className={settings.highContrast ? 'text-gray-400' : 'text-gray-600'}>Convert text to sign language</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-6 gap-5 overflow-y-auto">
        {/* Text Input Section */}
        <div className="space-y-3">
          <Label className={settings.highContrast ? 'text-white' : 'text-gray-700'}>Enter Your Message</Label>
          <Card className={`p-0 rounded-3xl border-0 shadow-lg overflow-hidden ${settings.highContrast ? 'bg-gray-900 border border-white' : 'bg-white'}`}>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type what you want to say..."
              className={`min-h-[140px] resize-none border-0 focus-visible:ring-0 rounded-3xl p-5 ${fontSizeClass} ${
                settings.highContrast ? 'bg-gray-900 text-white placeholder:text-gray-500' : 'bg-white text-gray-800 placeholder:text-gray-400'
              }`}
            />
          </Card>
          
          {/* Voice Input Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`rounded-full px-4 h-10 border-0 shadow-md ${
              settings.highContrast 
                ? 'bg-gray-900 border border-white text-white hover:bg-gray-800' 
                : 'bg-white text-gray-700 hover:bg-white/80'
            } disabled:opacity-50`}
          >
            <Mic className="w-4 h-4 mr-2" strokeWidth={2} />
            {isListening ? 'Listening...' : 'Use Voice Input'}
          </Button>
        </div>

        {/* Animation Preview Section */}
        <div className="space-y-3 flex-1">
          <Label className={settings.highContrast ? 'text-white' : 'text-gray-700'}>Sign Animation Preview</Label>
          <Card className={`flex-1 min-h-[280px] flex flex-col rounded-3xl border-0 shadow-xl overflow-hidden ${
            settings.highContrast ? 'bg-gray-900 border border-white' : 'bg-white'
          }`}>
            <div className={`flex-1 flex items-center justify-center p-8 ${
              settings.highContrast ? 'bg-gray-900' : 'bg-gradient-to-br from-rose-50 via-pink-50 to-sky-50'
            }`}>
              {isPlaying ? (
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-400 to-sky-400 rounded-full animate-pulse opacity-60" />
                    <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Hand className="w-16 h-16 text-rose-500 animate-bounce" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-md">
                      <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className={`px-6 py-3 rounded-2xl ${
                    settings.highContrast ? 'bg-gray-800' : 'bg-white/80'
                  } shadow-md inline-block`}>
                    <p className={`${fontSizeClass} ${settings.highContrast ? 'text-white' : 'text-gray-700'}`}>
                      "{inputText}"
                    </p>
                  </div>
                  <p className={`mt-4 ${settings.highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                    Playing animation...
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-rose-200 to-sky-200 rounded-full flex items-center justify-center opacity-60">
                    <Hand className="w-14 h-14 text-white" strokeWidth={2} />
                  </div>
                  <p className={`${settings.highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                    Ready to play animation
                  </p>
                  <p className={`mt-2 text-sm ${settings.highContrast ? 'text-gray-500' : 'text-gray-400'}`}>
                    Enter text and tap Play Gesture
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Play Button */}
        <Button
          size="lg"
          onClick={handlePlayGesture}
          disabled={!inputText.trim() || isPlaying}
          className="bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white h-14 rounded-3xl shadow-xl border-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <Play className="w-6 h-6 mr-2" strokeWidth={2} />
          <span>{isPlaying ? 'Playing Animation...' : 'Play Gesture'}</span>
        </Button>
      </main>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={`block mb-1 ${className}`}>{children}</label>;
}
