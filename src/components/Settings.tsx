import { useState } from 'react';
import { ArrowLeft, Globe, Volume2, Type, Eye, ChevronRight, Info, KeyRound, LogOut, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';
import type { Screen, AppSettings } from '../App';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

type SettingsView = 'main' | 'language' | 'voice' | 'display' | 'accessibility' | 'about';

export function Settings({ onNavigate, settings, onUpdateSettings }: SettingsProps) {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [darkMode, setDarkMode] = useState(false);

  const handleLanguageChange = (value: string) => {
    onUpdateSettings({ ...settings, language: value });
  };

  const handleVoiceTypeChange = (value: string) => {
    onUpdateSettings({ ...settings, voiceType: value });
  };

  const handleFontSizeChange = (value: 'small' | 'medium' | 'large') => {
    onUpdateSettings({ ...settings, fontSize: value });
  };

  const handleHighContrastToggle = (checked: boolean) => {
    onUpdateSettings({ ...settings, highContrast: checked });
  };

  const handleVibrationToggle = (checked: boolean) => {
    onUpdateSettings({ ...settings, vibrationFeedback: checked });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(checked ? 'Dark mode enabled' : 'Dark mode disabled');
  };

  const handleChangePassword = () => {
    toast.success('Password change feature coming soon!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would clear session and redirect
  };

  // Main Settings Menu
  const renderMainMenu = () => (
    <>
      <div className="space-y-4 pb-4">
        {/* Language Card */}
        <Card 
          className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setCurrentView('language')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-md">
                <Globe className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800">Language</h3>
                <p className="text-gray-500">Choose sign language</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        {/* Voice Card */}
        <Card 
          className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setCurrentView('voice')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-md">
                <Volume2 className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800">Voice</h3>
                <p className="text-gray-500">Choose voice type</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        {/* Display Card */}
        <Card 
          className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setCurrentView('display')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-md">
                <Type className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800">Display</h3>
                <p className="text-gray-500">Display settings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        {/* Accessibility Card */}
        <Card 
          className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setCurrentView('accessibility')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-md">
                <Eye className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800">Accessibility</h3>
                <p className="text-gray-500">Accessibility options</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        {/* About Card */}
        <Card 
          className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
          onClick={() => setCurrentView('about')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                <Info className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800">About SignSpeak</h3>
                <p className="text-gray-500">App information</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        <Separator className="my-6 bg-gray-200" />

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Change Password Button */}
          <Button
            variant="outline"
            onClick={handleChangePassword}
            className="w-full h-auto py-4 px-5 rounded-2xl border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-gray-800">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Button>

          {/* Logout Button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-auto py-4 px-5 rounded-2xl border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-red-50 hover:shadow-lg transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-gray-800 group-hover:text-red-600">Logout</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
          </Button>
        </div>

        <Separator className="my-6 bg-gray-200" />

        {/* Dark Mode Toggle */}
        <Card className="p-5 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
                <Moon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <Label className="text-gray-800">Dark Mode</Label>
                <p className="text-gray-500">Enable dark theme</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </Card>
      </div>
    </>
  );

  // Language Detail Page
  const renderLanguagePage = () => (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-gray-800 mb-2">Choose Sign Language</h2>
        <p className="text-gray-600">Select your preferred sign language</p>
      </div>

      <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <Label className="text-gray-700 mb-3 block">Sign Language</Label>
        <Select value={settings.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="rounded-2xl border-0 shadow-sm bg-white/90 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">American Sign Language (ASL)</SelectItem>
            <SelectItem value="british">British Sign Language (BSL)</SelectItem>
            <SelectItem value="vietnamese">Vietnamese Sign Language (VSL)</SelectItem>
          </SelectContent>
        </Select>
      </Card>
    </div>
  );

  // Voice Detail Page
  const renderVoicePage = () => (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Volume2 className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-gray-800 mb-2">Choose Voice Type</h2>
        <p className="text-gray-600">Select your preferred voice</p>
      </div>

      <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <Label className="text-gray-700 mb-4 block">Voice Type</Label>
        <RadioGroup value={settings.voiceType} onValueChange={handleVoiceTypeChange} className="space-y-3">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="flex-1 cursor-pointer text-gray-800">Male Voice</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="flex-1 cursor-pointer text-gray-800">Female Voice</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="neutral" id="neutral" />
            <Label htmlFor="neutral" className="flex-1 cursor-pointer text-gray-800">Neutral Voice</Label>
          </div>
        </RadioGroup>
      </Card>
    </div>
  );

  // Display Detail Page
  const renderDisplayPage = () => (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Type className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-gray-800 mb-2">Display Settings</h2>
        <p className="text-gray-600">Customize text appearance</p>
      </div>

      <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <Label className="text-gray-700 mb-4 block">Font Size</Label>
        <RadioGroup 
          value={settings.fontSize} 
          onValueChange={(value) => handleFontSizeChange(value as 'small' | 'medium' | 'large')}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small" className="flex-1 cursor-pointer text-gray-800">Small</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="flex-1 cursor-pointer text-gray-800">Medium</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 hover:bg-white/90 transition-all cursor-pointer">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large" className="flex-1 cursor-pointer text-gray-800">Large</Label>
          </div>
        </RadioGroup>
      </Card>
    </div>
  );

  // Accessibility Detail Page
  const renderAccessibilityPage = () => (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Eye className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-gray-800 mb-2">Accessibility</h2>
        <p className="text-gray-600">Customize accessibility features</p>
      </div>

      <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <div className="space-y-5">
          {/* High Contrast */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60">
            <div>
              <Label className="text-gray-800 block mb-1">High Contrast Mode</Label>
              <p className="text-gray-500">Increase contrast for better visibility</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={handleHighContrastToggle}
            />
          </div>

          <Separator className="bg-gray-200" />

          {/* Vibration Feedback */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60">
            <div>
              <Label className="text-gray-800 block mb-1">Vibration Feedback</Label>
              <p className="text-gray-500">Haptic feedback for interactions</p>
            </div>
            <Switch
              checked={settings.vibrationFeedback}
              onCheckedChange={handleVibrationToggle}
            />
          </div>
        </div>
      </Card>
    </div>
  );

  // About Detail Page
  const renderAboutPage = () => (
    <div className="space-y-6 pb-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Info className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-gray-800 mb-2">About SignSpeak</h2>
      </div>

      <Card className="p-8 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-sky-400 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-6">
          <span className="text-white">SS</span>
        </div>
        <h3 className="text-gray-800 mb-3">SignSpeak</h3>
        <p className="text-gray-600 mb-4">Version 1.0.0</p>
        <Separator className="my-6 bg-gray-200" />
        <p className="text-gray-700 leading-relaxed">
          Bridging communication through sign language translation
        </p>
        <p className="text-gray-500 mt-4">
          © 2025 SignSpeak. All rights reserved.
        </p>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${settings.highContrast ? 'bg-black' : 'bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100'}`}>
      {/* Header */}
      <header className={`p-6 flex items-center gap-4 ${settings.highContrast ? 'bg-gray-900 border-b border-white' : 'bg-white/60 backdrop-blur-md border-b border-white/50'}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => currentView === 'main' ? onNavigate('home') : setCurrentView('main')}
          className={`rounded-2xl ${settings.highContrast ? 'text-white hover:bg-gray-800' : 'hover:bg-white/80'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className={settings.highContrast ? 'text-white' : 'text-gray-800'}>
            {currentView === 'main' ? 'Settings' : 
             currentView === 'language' ? 'Language' :
             currentView === 'voice' ? 'Voice' :
             currentView === 'display' ? 'Display' :
             currentView === 'accessibility' ? 'Accessibility' :
             'About'}
          </h1>
          <p className={settings.highContrast ? 'text-gray-400' : 'text-gray-600'}>
            {currentView === 'main' ? 'Customize your experience' : 'Customize settings'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-2xl mx-auto">
            {currentView === 'main' && renderMainMenu()}
            {currentView === 'language' && renderLanguagePage()}
            {currentView === 'voice' && renderVoicePage()}
            {currentView === 'display' && renderDisplayPage()}
            {currentView === 'accessibility' && renderAccessibilityPage()}
            {currentView === 'about' && renderAboutPage()}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
