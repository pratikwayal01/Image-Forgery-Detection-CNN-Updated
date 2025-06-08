import React from "react";
import { motion } from "framer-motion";
import {
  FaUpload,
  FaImage,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";
import useImageUpload from "../../hooks/useImageUpload";

interface ImageUploaderProps {
  onImageSelected?: (file: File) => void;
  isProcessing?: boolean;
  maxSizeInMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  isProcessing = false,
  maxSizeInMB = 10,
}) => {
  const {
    preview,
    error,
    clearImage,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useImageUpload({
    maxSizeInMB,
    ...(onImageSelected ? { onImageSelected } : {}),
  });

  return (
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
              isDragReject || error
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
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
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
                    Support for JPG, PNG, GIF, TIFF (Max size: {maxSizeInMB}MB)
                  </p>
                </>
              )}

              {error && (
                <div className="mt-4 text-red-600 dark:text-red-400 flex items-center">
                  <FaExclamationCircle className="mr-2" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="relative w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
          <img
            src={preview}
            alt="Selected image preview"
            className="w-full h-auto max-h-[400px] object-contain bg-gray-100 dark:bg-gray-800"
          />

          {!isProcessing && (
            <motion.button
              type="button"
              className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white shadow-md"
              onClick={clearImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Remove image"
            >
              <FaTimes />
            </motion.button>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-white font-medium">Analyzing image...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
