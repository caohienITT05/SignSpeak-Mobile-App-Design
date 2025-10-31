import { useState } from 'react';
import { ArrowLeft, Video, VideoOff, Mic, Volume2, Copy, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import type { Screen, AppSettings } from '../App';

interface SignToTextProps {
  onNavigate: (screen: Screen) => void;
  onAddTranslation: (translation: { type: 'sign-to-text' | 'text-to-sign'; input: string; output: string }) => void;
  settings: AppSettings;
}

export function SignToText({ onNavigate, onAddTranslation, settings }: SignToTextProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setIsCameraOn(true);
      // Simulate detection after a delay
      setTimeout(() => {
        const mockText = 'Hello, how are you today?';
        setDetectedText(mockText);
        onAddTranslation({
          type: 'sign-to-text',
          input: 'Hand gestures',
          output: mockText,
        });
        setIsProcessing(false);
      }, 2000);
      setIsProcessing(true);
    } else {
      setIsProcessing(false);
    }
  };

  const handleSpeak = () => {
    if (detectedText) {
      toast.success(`Speaking: "${detectedText}"`);
    }
  };

  const handleCopy = async () => {
    if (detectedText) {
      try {
        await navigator.clipboard.writeText(detectedText);
        toast.success('Text copied to clipboard!');
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = detectedText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          toast.success('Text copied to clipboard!');
        } catch (e) {
          toast.error('Unable to copy text');
        }
        document.body.removeChild(textarea);
      }
    }
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
          <h1 className={settings.highContrast ? 'text-white' : 'text-gray-800'}>Sign to Text</h1>
          <p className={settings.highContrast ? 'text-gray-400' : 'text-gray-600'}>Translate sign language</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-6 gap-5 overflow-y-auto">
        {/* Camera Preview Section */}
        <div className="space-y-3">
          <Label className={settings.highContrast ? 'text-white' : 'text-gray-700'}>Camera</Label>
          <Card className={`relative aspect-[4/3] overflow-hidden rounded-3xl border-0 shadow-xl ${settings.highContrast ? 'bg-gray-900 border border-white' : 'bg-white'}`}>
            {isCameraOn ? (
              <div className="w-full h-full bg-gradient-to-br from-rose-300 via-pink-300 to-sky-300 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="w-10 h-10 text-rose-500" strokeWidth={2} />
                  </div>
                  <p className="text-white drop-shadow-lg">Camera Active</p>
                  {isProcessing && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${settings.highContrast ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <VideoOff className={`w-10 h-10 ${settings.highContrast ? 'text-white' : 'text-gray-400'}`} strokeWidth={2} />
                  </div>
                  <p className={settings.highContrast ? 'text-white' : 'text-gray-500'}>Camera Off</p>
                  <p className={`mt-2 ${settings.highContrast ? 'text-gray-400' : 'text-gray-400'}`}>Tap Record to start</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Detected Text Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className={settings.highContrast ? 'text-white' : 'text-gray-700'}>Detected Text</Label>
            {detectedText && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`rounded-full h-8 px-3 ${settings.highContrast ? 'text-white hover:bg-gray-800' : 'hover:bg-white/80 text-gray-600'}`}
              >
                <Copy className="w-4 h-4 mr-2" strokeWidth={2} />
                Copy
              </Button>
            )}
          </div>
          <Card className={`p-6 min-h-[140px] rounded-3xl border-0 shadow-lg ${settings.highContrast ? 'bg-gray-900 border border-white' : 'bg-white'}`}>
            <p className={`${fontSizeClass} leading-relaxed ${settings.highContrast ? 'text-white' : 'text-gray-800'} ${!detectedText ? 'text-gray-400 italic' : ''}`}>
              {detectedText || 'Your translated text will appear here...'}
            </p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {/* Record/Stop Button */}
          <Button
            size="lg"
            onClick={handleToggleRecording}
            className={`flex flex-col gap-2 h-auto py-5 rounded-3xl shadow-lg border-0 transition-all ${
              isRecording 
                ? 'bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white' 
                : 'bg-gradient-to-br from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
            }`}
          >
            <Video className="w-7 h-7" strokeWidth={2} />
            <span className="text-xs">{isRecording ? 'Stop' : 'Record'}</span>
          </Button>
          
          {/* Speak Button */}
          <Button
            size="lg"
            onClick={handleSpeak}
            disabled={!detectedText}
            className={`flex flex-col gap-2 h-auto py-5 rounded-3xl shadow-lg border-0 ${
              settings.highContrast 
                ? 'bg-gray-900 border border-white text-white hover:bg-gray-800' 
                : 'bg-white text-gray-700 hover:bg-white/80'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <Volume2 className="w-7 h-7" strokeWidth={2} />
            <span className="text-xs">Speak</span>
          </Button>
          
          {/* Voice Button */}
          <Button
            size="lg"
            className={`flex flex-col gap-2 h-auto py-5 rounded-3xl shadow-lg border-0 ${
              settings.highContrast 
                ? 'bg-gray-900 border border-white text-white hover:bg-gray-800' 
                : 'bg-white text-gray-700 hover:bg-white/80'
            }`}
          >
            <Mic className="w-7 h-7" strokeWidth={2} />
            <span className="text-xs">Voice</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={`block mb-1 ${className}`}>{children}</label>;
}
