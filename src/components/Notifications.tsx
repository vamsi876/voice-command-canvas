import React from 'react';
import { Bell, MessageSquare, File, Users } from 'lucide-react';

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'announcement':
      return { bg: 'bg-blue-50', text: 'text-blue-600' };
    case 'message':
      return { bg: 'bg-green-50', text: 'text-green-600' };
    case 'assignment':
      return { bg: 'bg-yellow-50', text: 'text-yellow-600' };
    case 'group':
      return { bg: 'bg-purple-50', text: 'text-purple-600' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-600' };
  }
};

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'announcement',
      title: 'New Course Announcement',
      message: 'Important update regarding the midterm examination schedule',
      time: '2 hours ago',
      course: 'Computer Science 101',
      icon: Bell
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Instructor',
      message: 'Please review the updated assignment guidelines',
      time: '4 hours ago',
      course: 'Web Development',
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Assignment Due Soon',
      message: 'Research paper submission deadline approaching',
      time: '1 day ago',
      course: 'English Literature',
      icon: File
    },
    {
      id: 4,
      type: 'group',
      title: 'Group Project Update',
      message: 'New files have been shared in your project group',
      time: '2 days ago',
      course: 'Business Ethics',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const styles = getTypeStyles(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`p-6 flex items-start space-x-4 ${
                index !== notifications.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className={`p-2 rounded-lg ${styles.bg}`}>
                <Icon className={`h-6 w-6 ${styles.text}`} />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.course}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}