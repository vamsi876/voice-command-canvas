import React, { useEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

interface CourseNavigationProps {
  course: {
    id: number;
    name: string;
    modules: Array<{
      id: string;
      name: string;
      items: Array<{
        type: string;
        name: string;
        dueDate: string | null;
        status: 'completed' | 'pending';
      }>;
    }>;
  };
  onNavigate: (section: string) => void;
}

export default function CourseNavigation({ course, onNavigate }: CourseNavigationProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        // Navigation commands
        if (command.includes('go to') || command.includes('navigate to')) {
          const section = command.split('to')[1]?.trim();
          if (section) {
            const sectionMap: { [key: string]: string } = {
              'home': 'home',
              'overview': 'home',
              'modules': 'modules',
              'content': 'modules',
              'assignments': 'assignments',
              'work': 'assignments',
              'discussions': 'discussions',
              'forum': 'discussions',
              'people': 'people',
              'students': 'people',
              'calendar': 'calendar',
              'schedule': 'calendar',
              'settings': 'settings',
              'preferences': 'settings'
            };

            const targetSection = sectionMap[section];
            if (targetSection) {
              onNavigate(targetSection);
            }
          }
        }

        // Module expansion commands
        if (command.includes('expand module') || command.includes('open module')) {
          const moduleNumber = command.match(/\d+/)?.[0];
          if (moduleNumber) {
            const moduleId = `m${moduleNumber}`;
            toggleModule(moduleId);
          }
        }

        // Module collapse commands
        if (command.includes('collapse module') || command.includes('close module')) {
          const moduleNumber = command.match(/\d+/)?.[0];
          if (moduleNumber) {
            const moduleId = `m${moduleNumber}`;
            if (expandedModules.includes(moduleId)) {
              toggleModule(moduleId);
            }
          }
        }

        // Item-specific commands
        if (command.includes('open item') || command.includes('view item')) {
          const itemName = command.split('item')[1]?.trim();
          if (itemName) {
            // Find and handle the item
            course.modules.forEach(module => {
              const item = module.items.find(i => 
                i.name.toLowerCase().includes(itemName.toLowerCase())
              );
              if (item) {
                // Handle item opening logic here
                console.log('Opening item:', item.name);
              }
            });
          }
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      setRecognition(recognitionInstance);
    }
  }, [course, expandedModules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const navigationItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'modules', name: 'Modules', icon: BookOpen },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'discussions', name: 'Discussions', icon: MessageSquare },
    { id: 'people', name: 'People', icon: Users },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h2>
        <div className="space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Course Modules</h3>
        <div className="space-y-1">
          {course.modules.map(module => (
            <div key={module.id} className="space-y-1">
              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                <div className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-sm">{module.name}</span>
                </div>
                <span className="text-xs text-gray-500">{module.items.length}</span>
              </button>
              <div className="ml-6 space-y-1">
                {module.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      {item.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {item.dueDate && (
                      <span className="text-xs text-gray-500">{item.dueDate}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Course Progress</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium text-blue-600">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: '75%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 