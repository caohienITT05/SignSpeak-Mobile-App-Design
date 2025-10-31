import { ArrowLeft, Hand, MessageSquare, Trash2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import type { Screen, Translation } from '../App';

interface HistoryProps {
  onNavigate: (screen: Screen) => void;
  translations: Translation[];
}

export function History({ onNavigate, translations }: HistoryProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className="rounded-full w-11 h-11 hover:bg-white/60"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2} />
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-800">History</h1>
          <p className="text-gray-600">Your past translations</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-6 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-4 pb-4">
            {translations.length === 0 ? (
              <Card className="p-12 text-center rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-rose-400" strokeWidth={2} />
                </div>
                <h3 className="text-gray-800 mb-2">No Translations Yet</h3>
                <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Your translation history will appear here once you start using the app
                </p>
              </Card>
            ) : (
              translations.map((translation) => (
                <Card key={translation.id} className="p-5 hover:shadow-xl transition-all rounded-3xl border-0 shadow-lg bg-white/90 backdrop-blur-sm group">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        translation.type === 'sign-to-text'
                          ? 'bg-gradient-to-br from-rose-400 to-pink-500'
                          : 'bg-gradient-to-br from-sky-400 to-blue-500'
                      }`}
                    >
                      {translation.type === 'sign-to-text' ? (
                        <Hand className="w-7 h-7 text-white" strokeWidth={2.5} />
                      ) : (
                        <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white shadow-sm text-sm ${
                            translation.type === 'sign-to-text'
                              ? 'bg-gradient-to-r from-rose-400 to-pink-500'
                              : 'bg-gradient-to-r from-sky-400 to-blue-500'
                          }`}
                        >
                          {translation.type === 'sign-to-text' ? 'Sign → Text' : 'Text → Sign'}
                        </span>
                        <span className="text-gray-500 text-sm whitespace-nowrap flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                          {formatDate(translation.timestamp)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-2xl p-3">
                          <p className="text-xs text-gray-500 mb-1">Input</p>
                          <p className="text-gray-700">{translation.input}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-50 to-sky-50 rounded-2xl p-3">
                          <p className="text-xs text-gray-500 mb-1">Output</p>
                          <p className="text-gray-800">{translation.output}</p>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-red-500 flex-shrink-0 rounded-full w-9 h-9 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
