import React from 'react';
import { BookOpen, Clock, Calendar, Bell, TrendingUp, Award, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const courseGrades = [
    { course: 'Computer Science', grade: 'A', percentage: 92 },
    { course: 'Web Development', grade: 'A-', percentage: 89 },
    { course: 'Mathematics', grade: 'B+', percentage: 87 }
  ];

  const activeCourses = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Tomorrow, 10:00 AM',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Web Development Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Today, 2:00 PM',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Emily Williams',
      progress: 40,
      nextClass: 'Thursday, 11:30 AM',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Term GPA:</span>
          <span className="text-lg font-semibold text-blue-600">3.8</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-xl font-semibold">6</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Classes</p>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Assignments Due</p>
              <p className="text-xl font-semibold">4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">New Notifications</p>
              <p className="text-xl font-semibold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Active Courses</h2>
            <button
              onClick={() => onNavigate('courses')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {activeCourses.map(course => (
              <div
                key={course.id}
                onClick={() => onNavigate('courses')}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="mt-2 space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{course.progress}% Complete</span>
                      <span className="text-gray-600">{course.nextClass}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Study Streak</h2>
          <div className="text-center space-y-2">
            <Award className="h-12 w-12 text-yellow-500 mx-auto" />
            <p className="text-3xl font-bold text-gray-900">7 Days</p>
            <p className="text-sm text-gray-600">Keep up the great work!</p>
            <div className="grid grid-cols-7 gap-1 mt-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-green-100 flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: 'Assignment submitted: Web Development Basics', time: '2 hours ago' },
              { title: 'New announcement in Mathematics 101', time: '4 hours ago' },
              { title: 'Grade posted: Introduction to Psychology', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <p className="text-sm text-gray-800">{activity.title}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Library', icon: BookOpen },
              { name: 'Grades', icon: TrendingUp },
              { name: 'Calendar', icon: Calendar },
              { name: 'Resources', icon: Award }
            ].map((link, index) => {
              const Icon = link.icon;
              return (
                <button
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center space-y-1"
                >
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}