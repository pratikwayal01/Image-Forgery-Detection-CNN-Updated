import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Environment variables

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 8.5C9 8.22386 9.22386 8 9.5 8H11.5C11.7761 8 12 8.22386 12 8.5V11.5C12 11.7761 11.7761 12 11.5 12H9.5C9.22386 12 9 11.7761 9 11.5V8.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M13 14C13 13.4477 13.4477 13 14 13H16C16.5523 13 17 13.4477 17 14V16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ForgeDetect
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              Advanced image forgery detection using CNN models to identify and
              localize tampered regions in images.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/pratikwayal01/image-forgery-detection-cnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/pratikwayal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/detect"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  Detect Forgery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/pratikwayal01/image-forgery-detection-cnn/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pratikwayal01/image-forgery-detection-cnn/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="mailto:pratikswayal123@gmail.com"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} ForgeDetect. All rights reserved as per MIT General Purpose License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
