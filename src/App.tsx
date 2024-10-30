import React, { useState, useEffect } from 'react';
import { Layout, Menu, Home, Book, CalendarIcon, Bell, Settings as SettingsIcon, Mic, MicOff } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('');

  useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        setLastCommand(command);
        
        if (command.includes('dashboard') || command.includes('home')) {
          setActiveTab('dashboard');
        } else if (command.includes('courses') || command.includes('class')) {
          setActiveTab('courses');
        } else if (command.includes('calendar') || command.includes('schedule')) {
          setActiveTab('calendar');
        } else if (command.includes('notifications') || command.includes('alerts')) {
          setActiveTab('notifications');
        } else if (command.includes('settings') || command.includes('preferences')) {
          setActiveTab('settings');
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const toggleVoiceRecognition = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Book size={20} />
              <span>Courses</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon size={20} />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={toggleVoiceRecognition}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                isListening ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              <span>{isListening ? 'Stop Voice' : 'Start Voice'}</span>
            </button>
            
            {isListening && lastCommand && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Last command:</p>
                <p className="text-sm text-gray-700 font-medium">{lastCommand}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'courses' && <Courses />}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default App;