import React, { useState } from 'react';
import { Book, Users, Clock, Search, Filter, Grid, List } from 'lucide-react';
import CourseModal from './CourseModal';

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Tomorrow, 10:00 AM',
      students: 120,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['Computer Science', 'Programming'],
      resources: 12,
      assignments: 8
    },
    {
      id: 2,
      name: 'Web Development Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Today, 2:00 PM',
      students: 85,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['Web Development', 'Programming'],
      resources: 15,
      assignments: 6
    },
    {
      id: 3,
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Emily Williams',
      progress: 40,
      nextClass: 'Thursday, 11:30 AM',
      students: 95,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      tags: ['Computer Science', 'Algorithms'],
      resources: 18,
      assignments: 10
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.instructor}</p>
                
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{course.progress}% Complete</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.nextClass}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.students}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Book className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.resources} resources</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.students} students</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{course.progress}% Complete</div>
                  <div className="text-sm text-gray-600 mt-1">Next: {course.nextClass}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}