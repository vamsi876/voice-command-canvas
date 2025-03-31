import React, { useState, useEffect } from 'react';
import { Layout, Menu, Home, Book, CalendarIcon, Bell, Settings as SettingsIcon, Mic, MicOff } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import CourseNavigation from './components/CourseNavigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseSection, setCourseSection] = useState<string>('home');

  useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        setLastCommand(command);
        
        // Main navigation commands
        if (command.includes('dashboard') || command.includes('home')) {
          setActiveTab('dashboard');
          setSelectedCourse(null);
        } else if (command.includes('courses') || command.includes('class')) {
          setActiveTab('courses');
          setSelectedCourse(null);
        } else if (command.includes('calendar') || command.includes('schedule')) {
          setActiveTab('calendar');
          setSelectedCourse(null);
        } else if (command.includes('notifications') || command.includes('alerts')) {
          setActiveTab('notifications');
          setSelectedCourse(null);
        } else if (command.includes('settings') || command.includes('preferences')) {
          setActiveTab('settings');
          setSelectedCourse(null);
        }

        // Course-specific commands
        if (selectedCourse) {
          // Course navigation commands
          if (command.includes('course home') || command.includes('course overview')) {
            setCourseSection('home');
          } else if (command.includes('course modules') || command.includes('course content')) {
            setCourseSection('modules');
          } else if (command.includes('course assignments') || command.includes('course work')) {
            setCourseSection('assignments');
          } else if (command.includes('course discussions') || command.includes('course forum')) {
            setCourseSection('discussions');
          } else if (command.includes('course people') || command.includes('course students')) {
            setCourseSection('people');
          } else if (command.includes('course calendar') || command.includes('course schedule')) {
            setCourseSection('calendar');
          } else if (command.includes('course settings') || command.includes('course preferences')) {
            setCourseSection('settings');
          }

          // Module-specific commands
          if (command.includes('open module')) {
            const moduleNumber = command.match(/\d+/)?.[0];
            if (moduleNumber) {
              const moduleId = `m${moduleNumber}`;
              // Handle module opening logic here
            }
          }

          // Item-specific commands
          if (command.includes('open item') || command.includes('view item')) {
            const itemName = command.split('item')[1]?.trim();
            if (itemName) {
              // Handle item opening logic here
            }
          }
        }

        // Course selection commands
        if (command.includes('select course') || command.includes('open course')) {
          const courseName = command.split('course')[1]?.trim();
          if (courseName) {
            // Find and select the course
            const course = courses.find(c => 
              c.name.toLowerCase().includes(courseName.toLowerCase())
            );
            if (course) {
              handleCourseSelect(course);
            }
          }
        }

        // View mode commands
        if (command.includes('grid view') || command.includes('show grid')) {
          setViewMode('grid');
        } else if (command.includes('list view') || command.includes('show list')) {
          setViewMode('list');
        }

        // Search commands
        if (command.includes('search for')) {
          const searchTerm = command.split('search for')[1]?.trim();
          if (searchTerm) {
            setSearchQuery(searchTerm);
          }
        }

        // Voice control commands
        if (command.includes('start voice') || command.includes('enable voice')) {
          toggleVoiceRecognition();
        } else if (command.includes('stop voice') || command.includes('disable voice')) {
          toggleVoiceRecognition();
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [selectedCourse]);

  const toggleVoiceRecognition = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setActiveTab('course');
  };

  const handleCourseNavigation = (section: string) => {
    setCourseSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Main Sidebar */}
        {!selectedCourse && (
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
        )}

        {/* Course Navigation */}
        {selectedCourse && (
          <CourseNavigation
            course={selectedCourse}
            onNavigate={handleCourseNavigation}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'courses' && (
            <Courses
              onCourseSelect={handleCourseSelect}
            />
          )}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'course' && selectedCourse && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h1>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {courseSection.charAt(0).toUpperCase() + courseSection.slice(1)}
                </h2>
                {/* Course section content will be added here */}
                <p className="text-gray-600">Course section content coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;