import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Kanbas Learning Management System
            </h1>
            <Link
              to="/kanbas"
              className="inline-block bg-red-600 text-black px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Go to Kanbas →
            </Link>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Project Team
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Tian Huang
                  </h3>
                  <p className="text-gray-500">Section 02</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Links Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Project Repositories
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* React Project Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              React Frontend
            </h3>
            <a
              href="https://github.com/tianhg468/kanbas-react-web-app/tree/project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-500"
            >
              View Repository →
            </a>
          </div>

          {/* Node Project Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Node Backend
            </h3>
            <a
              href="https://github.com/tianhg468/kanbas-node-server-app/tree/project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-500"
            >
              View Repository →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <p className="text-center text-gray-500">
            © 2024 Kanbas LMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
