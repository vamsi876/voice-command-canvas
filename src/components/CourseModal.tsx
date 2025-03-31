import React, { useState, useEffect } from 'react';
import { X, Users, Clock, Calendar, BookOpen, MessageSquare, FileText, FolderOpen, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';

interface CourseModalProps {
  course: {
    id: number;
    name: string;
    instructor: string;
    progress: number;
    nextClass: string;
    students: number;
    image: string;
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
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
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

        // Close modal command
        if (command.includes('close course') || command.includes('exit course')) {
          onClose();
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

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'discussion':
        return <MessageSquare className="h-4 w-4" />;
      case 'file':
        return <FolderOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-48">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
            <p className="text-gray-600">{course.instructor}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{course.students} Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Next: {course.nextClass}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Course Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{course.progress}% Complete</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Modules</h3>
            <div className="space-y-2">
              {course.modules.map(module => (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      )}
                      <span className="font-medium text-gray-900">{module.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {module.items.length} items
                    </span>
                  </button>
                  
                  {expandedModules.includes(module.id) && (
                    <div className="divide-y divide-gray-100">
                      {module.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            {getItemIcon(item.type)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              {item.dueDate && (
                                <p className="text-xs text-gray-500">Due {item.dueDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <span className="text-xs text-gray-500">Pending</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <BookOpen className="h-5 w-5" />
              <span>Course Content</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <MessageSquare className="h-5 w-5" />
              <span>Discussion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}