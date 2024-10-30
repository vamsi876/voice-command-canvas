import React from 'react';
import { X, Users, Clock, Calendar, BookOpen, MessageSquare } from 'lucide-react';

interface CourseModalProps {
  course: {
    id: number;
    name: string;
    instructor: string;
    progress: number;
    nextClass: string;
    students: number;
    image: string;
  };
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
            {[
              { date: 'Mon, Mar 15', time: '10:00 AM', topic: 'Introduction to Arrays' },
              { date: 'Wed, Mar 17', time: '10:00 AM', topic: 'Sorting Algorithms' },
              { date: 'Fri, Mar 19', time: '10:00 AM', topic: 'Binary Search' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.topic}</p>
                    <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">Add to Calendar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}