import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaUpload,
  FaImage,
  FaTimes,
  FaLayerGroup,
  FaSearchLocation,
  FaBrain,
} from "react-icons/fa";
import AnalysisResult from "../components/ui/AnalysisResult";
import {
  analyzeImage,
  analyzeImageEnsemble,
  AnalysisResult as ApiAnalysisResult,
  LocalizationMethod,
} from "../services/api";
import useImageUpload from "../hooks/useImageUpload";

const Detect: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ApiAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLocalization, setShowLocalization] = useState(true);
  const [showEla, setShowEla] = useState(true);
  const [useEnsemble, setUseEnsemble] = useState(true);

  const {
    file,
    preview,
    clearImage,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    error: uploadError,
  } = useImageUpload({
    maxSizeInMB: 10,
    onImageSelected: () => {
      // Clear any previous errors when a new image is selected
      setError(null);
    },
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Request all visualization types - the user will select which ones to view on the results page
      const allVisualizationMethods: LocalizationMethod[] = [
        "heatmap",
        "overlay",
        "contour",
        "mask",
        "edge",
        "highlight",
      ];

      let result;
      if (useEnsemble) {
        // Use ensemble approach with multiple models
        result = await analyzeImageEnsemble(
          file,
          showLocalization,
          showEla,
          showLocalization ? allVisualizationMethods : []
        );
      } else {
        // Use single model approach
        result = await analyzeImage(
          file,
          showLocalization,
          showEla,
          showLocalization ? allVisualizationMethods : []
        );
      }

      setResult(result);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError(
        "An error occurred while analyzing the image. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    clearImage();
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Image Forgery Detection
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Upload an image to analyze it for potential manipulation or forgery
          using our advanced CNN model.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {!result ? (
              <>
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-500 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                        Supported Image Formats
                      </h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        You can upload images in JPG, JPEG, PNG, and BMP
                        formats. Maximum file size is 10MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Detection Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showLocalization"
                        checked={showLocalization}
                        onChange={(e) => setShowLocalization(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="showLocalization"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center">
                          <FaSearchLocation className="mr-1" />
                          Localize Tampering
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showEla"
                        checked={showEla}
                        onChange={(e) => setShowEla(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="showEla"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center">
                          <FaLayerGroup className="mr-1" />
                          Error Level Analysis
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="useEnsemble"
                        checked={useEnsemble}
                        onChange={(e) => setUseEnsemble(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="useEnsemble"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center">
                          <FaBrain className="mr-1" />
                          Use Model Ensemble
                          <span className="ml-1 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-300">
                            Recommended
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {useEnsemble && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start">
                        <FaBrain className="text-primary-500 dark:text-primary-400 mt-1 mr-2 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Ensemble mode uses multiple AI models to analyze your
                          image, providing higher accuracy and better detection
                          of various tampering techniques.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  {!preview ? (
                    <div
                      {...getRootProps()}
                      className={`
                        w-full border-2 border-dashed rounded-lg p-8 transition-colors
                        ${
                          isDragActive
                            ? "bg-primary-50 dark:bg-primary-900/20 border-primary-400"
                            : "border-gray-300 dark:border-gray-700"
                        }
                        ${
                          isDragAccept
                            ? "bg-green-50 dark:bg-green-900/20 border-green-400"
                            : ""
                        }
                        ${
                          isDragReject || uploadError
                            ? "bg-red-50 dark:bg-red-900/20 border-red-400"
                            : ""
                        }
                        ${
                          isProcessing
                            ? "pointer-events-none opacity-60"
                            : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50"
                        }
                      `}
                    >
                      <input {...getInputProps()} disabled={isProcessing} />

                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-4">
                          {isDragActive ? (
                            <FaUpload className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <FaImage className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                          )}
                        </div>

                        {isDragActive ? (
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            Drop the image here
                          </p>
                        ) : (
                          <>
                            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Drag & drop an image here, or click to select
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Support for JPG, PNG, GIF, TIFF (Max size: 10MB)
                            </p>
                          </>
                        )}

                        {uploadError && (
                          <div className="mt-4 text-red-600 dark:text-red-400 flex items-center">
                            <FaInfoCircle className="mr-2" />
                            <span>{uploadError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                      <img
                        src={preview}
                        alt="Selected image preview"
                        className="w-full h-auto max-h-[400px] object-contain bg-gray-100 dark:bg-gray-800"
                      />

                      {!isProcessing && (
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                          onClick={clearImage}
                          aria-label="Remove image"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      )}

                      {isProcessing && (
                        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center">
                          <div className="w-12 h-12 border-4 border-gray-400 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                          <p className="text-white font-medium">
                            {useEnsemble
                              ? "Running ensemble analysis..."
                              : "Analyzing image..."}
                          </p>
                          {useEnsemble && (
                            <p className="text-white text-sm mt-2">
                              This may take a bit longer as multiple models are
                              being used
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex-1 max-w-xs"
                    disabled={!file || isProcessing}
                    onClick={handleAnalyze}
                  >
                    {isProcessing ? "Analyzing..." : "Analyze Image"}
                  </motion.button>

                  {file && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-md flex-1 max-w-xs"
                      onClick={handleReset}
                    >
                      Reset
                    </motion.button>
                  )}
                </div>
              </>
            ) : (
              <>
                <AnalysisResult
                  result={result}
                  apiBaseUrl={""}
                />

                <div className="mt-8 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-md"
                    onClick={handleReset}
                  >
                    Analyze Another Image
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Detect;
