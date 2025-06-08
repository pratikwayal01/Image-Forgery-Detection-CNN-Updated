import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

import {
  FaArrowRight,
  FaCheckCircle,
  FaChartBar,
  FaTachometerAlt,
  FaRegLightbulb,
  FaBrain,
  FaShieldAlt,
  FaEye,
  FaCog,
} from "react-icons/fa";
import ThreeDModel from "../components/3D_Model/3DModel";

// Error boundary component for Spline
class SplineErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if ((this.state as { hasError: boolean }).hasError) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      );
    }

    // Return children if no error
    // @ts-ignore
    return this.props.children;
  }
}

const Home = () => {
  const [splineError, setSplineError] = useState(false);

  const handleSplineError = (e: any) => {
    console.error("Spline loading error:", e);
    setSplineError(true);
  };

  return (
    <>
      {/* Hero Section with Spline Background */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden min-h-screen">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          {!splineError ? (
            <ThreeDModel />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
          )}
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse z-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000 z-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-600/15 rounded-full blur-3xl animate-bounce z-20"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6"
              >
                <FaShieldAlt className="text-cyan-400 mr-2" />
                <span className="text-cyan-300 text-sm font-medium">
                  Next-Gen AI Security
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-white">Image</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Forensics
                </span>
              </h1>

              <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                Detect sophisticated image manipulations with state-of-the-art
                deep learning. Protect digital authenticity with military-grade
                precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/detect">
                  <motion.button
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-2xl shadow-cyan-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEye className="mr-2 group-hover:animate-pulse" />
                    Analyze Image Now
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link to="/about">
                  <motion.button
                    className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl font-semibold shadow-xl border border-white/20 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaCog className="mr-2" />
                    Learn Technology
                  </motion.button>
                </Link>
              </div>

              {/* Performance indicators */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Accuracy",
                    value: "99.2%",
                    color: "from-green-400 to-emerald-500",
                  },
                  {
                    label: "Speed",
                    value: "< 2s",
                    color: "from-blue-400 to-cyan-500",
                  },
                  {
                    label: "Models",
                    value: "5+",
                    color: "from-purple-400 to-pink-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                  >
                    <div
                      className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaShieldAlt className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-blue-700 dark:text-blue-300 font-semibold">
                Advanced Capabilities
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Next-Generation Forensics
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Powered by advanced computer vision algorithms and deep learning techniques 
              to detect multiple types of image forgeries with high precision.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaEye className="h-7 w-7" />,
                title: "Pixel-Level Analysis",
                description:
                  "Examine every pixel with microscopic precision to detect subtle manipulation artifacts invisible to the human eye.",
                gradient: "from-blue-500 via-cyan-500 to-teal-500",
                color: "blue",
              },
              {
                icon: <FaBrain className="h-7 w-7" />,
                title: "Multiple Detection Methods",
                description:
                  "Specialized detection algorithms for copy-move, splicing, inpainting, double JPEG, and metadata analysis.",
                gradient: "from-purple-500 via-pink-500 to-rose-500",
                color: "purple",
              },
              {
                icon: <FaShieldAlt className="h-7 w-7" />,
                title: "Anti-Adversarial Defense",
                description:
                  "Robust against sophisticated attacks designed to fool AI detection systems.",
                gradient: "from-emerald-500 via-green-500 to-teal-500",
                color: "emerald",
              },
              {
                icon: <FaTachometerAlt className="h-7 w-7" />,
                title: "Real-Time Processing",
                description:
                  "Lightning-fast analysis with optimized GPU acceleration for instant results.",
                gradient: "from-orange-500 via-red-500 to-pink-500",
                color: "orange",
              },
              {
                icon: <FaChartBar className="h-7 w-7" />,
                title: "Forensic Reporting",
                description:
                  "Comprehensive analysis reports suitable for legal proceedings and professional investigations.",
                gradient: "from-indigo-500 via-blue-500 to-cyan-500",
                color: "indigo",
              },
              {
                icon: <FaRegLightbulb className="h-7 w-7" />,
                title: "Intuitive Interface",
                description:
                  "Professional-grade capabilities wrapped in a user-friendly interface accessible to everyone.",
                gradient: "from-yellow-500 via-orange-500 to-red-500",
                color: "yellow",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/50 dark:to-gray-700/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How it works section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaCog className="text-cyan-400 mr-2" />
              <span className="text-cyan-300 font-semibold">
                Process Overview
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              How It{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Works
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our advanced forensic pipeline combines multiple AI models and
              sophisticated algorithms to provide comprehensive image
              authenticity analysis.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                number: 1,
                title: "Upload & Preprocessing",
                description:
                  "Secure upload with automatic format optimization and metadata extraction for comprehensive analysis.",
                icon: <FaRegLightbulb className="h-8 w-8" />,
                gradient: "from-cyan-400 to-blue-500",
              },
              {
                number: 2,
                title: "Multi-Method Analysis",
                description:
                  "Each image is analyzed using five specialized techniques: copy-move detection, splicing detection, inpainting detection, JPEG compression analysis, and metadata examination.",
                icon: <FaBrain className="h-8 w-8" />,
                gradient: "from-blue-500 to-purple-500",
              },
              {
                number: 3,
                title: "Forensic Report",
                description:
                  "Detailed results with confidence scores, localization maps, and comprehensive authenticity assessment.",
                icon: <FaChartBar className="h-8 w-8" />,
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center relative shadow-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:-translate-y-2">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div
                    className={`mx-auto mb-6 mt-4 w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-white/40 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/detect">
              <motion.button
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEye className="mr-3 group-hover:animate-pulse" />
                Start Analysis Now
                <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Stats section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: "99.2%",
                label: "Detection Accuracy",
                icon: <FaCheckCircle className="h-8 w-8" />,
                gradient: "from-green-400 to-emerald-500",
                description: "Verified on 100K+ samples",
              },
              {
                value: "< 2s",
                label: "Processing Time",
                icon: <FaTachometerAlt className="h-8 w-8" />,
                gradient: "from-blue-400 to-cyan-500",
                description: "Lightning fast analysis",
              },
              {
                value: "97.8%",
                label: "Localization Precision",
                icon: <FaEye className="h-8 w-8" />,
                gradient: "from-purple-400 to-pink-500",
                description: "Pixel-perfect detection",
              },
              {
                value: "15+",
                label: "Forgery Types",
                icon: <FaShieldAlt className="h-8 w-8" />,
                gradient: "from-orange-400 to-red-500",
                description: "Comprehensive coverage",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-8">
              <FaShieldAlt className="text-cyan-400 mr-2" />
              <span className="text-cyan-300 font-semibold">
                Ready to Deploy
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Protect Digital{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Authenticity
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join the fight against digital deception. Deploy our
              military-grade image forensics technology and ensure the integrity
              of visual content in your organization.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/detect">
                <motion.button
                  className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEye className="mr-3 group-hover:animate-pulse" />
                  Start Detection Now
                  <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/enterprise">
                <motion.button
                  className="px-10 py-5 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-2xl font-bold text-lg shadow-xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShieldAlt className="mr-3" />
                  Enterprise Solutions
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <FaShieldAlt className="h-6 w-6" />,
                  title: "Military Grade",
                  description: "Trusted by defense agencies",
                },
                {
                  icon: <FaCheckCircle className="h-6 w-6" />,
                  title: "99.2% Accurate",
                  description: "Verified on forensic datasets",
                },
                {
                  icon: <FaCog className="h-6 w-6" />,
                  title: "Real-Time",
                  description: "Instant analysis results",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-3 text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-sm text-gray-300">
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
