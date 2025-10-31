import { Hand, MessageSquare, History, Settings, Sparkles, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="pt-16 pb-10 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-sky-400 rounded-3xl flex items-center justify-center shadow-2xl">
              <Hand className="w-11 h-11 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <h1 className="text-gray-800 mb-2">COMMUNICATE NOW</h1>
        <p className="text-gray-600">Add us & Chat us</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-10 gap-4">
        {/* Sign to Text Button */}
        <button
          onClick={() => onNavigate('sign-to-text')}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] border border-white/50"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Hand className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h2 className="text-gray-800 mb-2">Sign to Text</h2>
              <p className="text-gray-600 leading-relaxed">Convert sign language to text and voice</p>
            </div>
          </div>
        </button>

        {/* Text to Sign Button */}
        <button
          onClick={() => onNavigate('text-to-sign')}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] border border-white/50"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h2 className="text-gray-800 mb-2">Text to Sign</h2>
              <p className="text-gray-600 leading-relaxed">Convert text or voice to sign gestures</p>
            </div>
          </div>
        </button>

        {/* My Dictionary Button */}
        <button
          onClick={() => onNavigate('dictionary')}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] border border-white/50"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h2 className="text-gray-800 mb-2">My Dictionary</h2>
              <p className="text-gray-600 leading-relaxed">Create and manage your personal sign dictionary</p>
            </div>
          </div>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="p-6 bg-white/70 backdrop-blur-lg border-t border-white/60 shadow-lg">
        <div className="flex justify-around max-w-md mx-auto gap-2">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onNavigate('history')}
            className="flex flex-col gap-2 h-auto py-4 px-6 rounded-3xl hover:bg-white/90 transition-all"
          >
            <History className="w-7 h-7 text-gray-700" strokeWidth={2} />
            <span className="text-gray-700 text-sm">History</span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onNavigate('settings')}
            className="flex flex-col gap-2 h-auto py-4 px-6 rounded-3xl hover:bg-white/90 transition-all"
          >
            <Settings className="w-7 h-7 text-gray-700" strokeWidth={2} />
            <span className="text-gray-700 text-sm">Settings</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
