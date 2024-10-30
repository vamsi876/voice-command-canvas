import React from 'react';
import { Layout } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Layout className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">Canvas Voice</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}