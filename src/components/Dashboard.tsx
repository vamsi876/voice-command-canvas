import React from 'react';
import { BookOpen, Clock, Calendar, Bell, TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
  const courseGrades = [
    { course: 'Computer Science', grade: 'A', percentage: 92 },
    { course: 'Web Development', grade: 'A-', percentage: 89 },
    { course: 'Mathematics', grade: 'B+', percentage: 87 }
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
          <h2 className="text-lg font-semibold mb-4">Course Performance</h2>
          <div className="space-y-4">
            {courseGrades.map((course, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{course.course}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{course.percentage}%</span>
                  <span className="text-sm font-semibold text-blue-600">{course.grade}</span>
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