import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          About This Project
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Image Forgery Detection using CNN
            </h2>

            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p>
                This project implements a Convolutional Neural Network (CNN)
                based approach for detecting image forgeries, particularly
                focusing on identifying manipulated regions within digital
                images. The system can detect various types of image forgeries,
                including splicing, copy-move, and removal.
              </p>

              <h3>Technical Overview</h3>
              <p>
                The core of this system is based on a deep learning architecture
                that analyzes patterns and inconsistencies within images that
                may not be visible to the human eye. The CNN model has been
                trained on a dataset of authentic and forged images to learn the
                subtle artifacts introduced during manipulation.
              </p>

              <h3>Key Features</h3>
              <ul>
                <li>
                  Detection of multiple forgery types (splicing, copy-move,
                  etc.)
                </li>
                <li>
                  Localization of tampered regions with heatmap visualization
                </li>
                <li>High accuracy on standard image forgery datasets</li>
                <li>
                  User-friendly interface for uploading and analyzing images
                </li>
                <li>Detailed result visualization with confidence scoring</li>
              </ul>

              <h3>Methodology</h3>
              <p>The detection process involves several steps:</p>
              <ol>
                <li>
                  <strong>Feature Extraction:</strong> The CNN extracts relevant
                  features from the input image that may indicate manipulation.
                </li>
                <li>
                  <strong>Anomaly Detection:</strong> The model identifies
                  regions with inconsistent patterns or statistical anomalies.
                </li>
                <li>
                  <strong>Classification:</strong> Based on the extracted
                  features, the system classifies the image as authentic or
                  forged.
                </li>
                <li>
                  <strong>Localization:</strong> For forged images, the system
                  generates a heatmap highlighting the tampered regions.
                </li>
              </ol>

              <h3>Technologies Used</h3>
              <p>This project is built using several modern technologies:</p>
              <ul>
                <li>Python with PyTorch for the CNN model development</li>
                <li>FastAPI for the backend API</li>
                <li>React and Tailwind CSS for the frontend interface</li>
                <li>Docker for containerization and deployment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Research Background
            </h2>

            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p>
                Image forgery detection is an increasingly important field in
                digital forensics as image manipulation becomes more
                sophisticated and accessible. Traditional methods often rely on
                statistical analysis and handcrafted features, but deep learning
                approaches have shown superior performance in recent years.
              </p>

              <p>
                This project builds upon several influential research papers:
              </p>

              <ul>
                <li>
                  <strong>CNN-based Image Forgery Detection (2018)</strong>
                  <p className="mt-1">
                    Pioneering work on using CNN architectures for detecting
                    manipulation artifacts in images.
                  </p>
                </li>
                <li>
                  <strong>
                    ManTra-Net: Manipulation Tracing Network (2019)
                  </strong>
                  <p className="mt-1">
                    End-to-end solution for both detecting and localizing image
                    forgeries regardless of manipulation type.
                  </p>
                </li>
                <li>
                  <strong>
                    SPAN: Spatial Pyramid Attention Network (2020)
                  </strong>
                  <p className="mt-1">
                    Advanced architecture incorporating attention mechanisms to
                    focus on relevant image regions.
                  </p>
                </li>
              </ul>

              <p>
                Our implementation incorporates elements from these approaches
                while introducing several enhancements to improve detection
                accuracy and computational efficiency.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact & Resources
            </h2>

            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
              <p>
                This project was developed as a final year project. Feel free to
                reach out for questions, contributions, or collaboration
                opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://github.com/pratikwayal01/image-forgery-detection-cnn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              >
                <FaGithub className="text-2xl mr-3 text-gray-700 dark:text-gray-300" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    GitHub Repository
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Source code and documentation
                  </div>
                </div>
                <FaChevronRight className="ml-auto text-gray-400" />
              </a>

              <a
                href="https://linkedin.com/in/pratilwayal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              >
                <FaLinkedin className="text-2xl mr-3 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    LinkedIn
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Connect professionally
                  </div>
                </div>
                <FaChevronRight className="ml-auto text-gray-400" />
              </a>

              <a
                href="mailto:pratikswayal123@gmail.com"
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 md:col-span-2"
              >
                <FaEnvelope className="text-2xl mr-3 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Email Contact
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    pratikswayal123@gmail.com
                  </div>
                </div>
                <FaChevronRight className="ml-auto text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
