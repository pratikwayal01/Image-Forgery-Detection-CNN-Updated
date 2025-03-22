import axios from "axios";

// Get the API URL from environment variables (defaults to an empty string for relative URLs)
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export interface AnalysisResult {
  is_tampered: boolean;
  confidence: number;
  message: string;
  method: string;
  timestamp: string;
  input_image_path: string;
  heatmap_path?: string;
  overlay_path?: string;
  contour_path?: string;
  ela_path?: string;
  mask_path?: string;
  edge_path?: string;
  highlight_path?: string;
  ensemble_detail?: {
    ensemble_size: number;
    tampered_votes: number;
    authentic_votes: number;
    consensus_level: string;
    model_predictions: any[];
  };
}

export type LocalizationMethod =
  | "heatmap"
  | "overlay"
  | "contour"
  | "mask"
  | "edge"
  | "highlight";

export const analyzeImage = async (
  imageFile: File,
  showLocalization: boolean = true,
  showEla: boolean = true,
  localizationMethods: LocalizationMethod[] = [
    "heatmap",
    "overlay",
    "contour",
    "mask",
    "edge",
    "highlight",
  ]
): Promise<AnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("show_localization", showLocalization ? "true" : "false");
    formData.append("show_ela", showEla ? "true" : "false");

    // Add each localization method separately
    if (showLocalization && localizationMethods.length > 0) {
      localizationMethods.forEach((method) => {
        formData.append("localization_methods[]", method);
      });
    }

    const response = await api.post<AnalysisResult>("/api/analyze", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Analysis failed: ${error.response.data.error || "Unknown error"}`
      );
    }
    throw new Error("Failed to connect to the server. Please try again later.");
  }
};

export const analyzeImageEnsemble = async (
  imageFile: File,
  showLocalization: boolean = true,
  showEla: boolean = true,
  localizationMethods: LocalizationMethod[] = [
    "heatmap",
    "overlay",
    "contour",
    "mask",
    "edge",
    "highlight",
  ]
): Promise<AnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("show_localization", showLocalization ? "true" : "false");
    formData.append("show_ela", showEla ? "true" : "false");

    // Add each localization method separately
    if (showLocalization && localizationMethods.length > 0) {
      localizationMethods.forEach((method) => {
        formData.append("localization_methods[]", method);
      });
    }

    const response = await api.post<AnalysisResult>(
      "/api/analyze/ensemble",
      formData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Ensemble analysis failed: ${error.response.data.error || "Unknown error"}`
      );
    }
    throw new Error("Failed to connect to the server. Please try again later.");
  }
};

export const convertTiffToJpeg = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/convert-tiff", formData);
    return response.data.preview_url;
  } catch (error) {
    console.error("Error converting TIFF:", error);
    throw error;
  }
};

export const viewTiffFile = async (tiffPath: string): Promise<string> => {
  try {
    const response = await api.get(`/api/view-tiff/${tiffPath}`);
    return response.data.preview_url;
  } catch (error) {
    console.error("Error viewing TIFF:", error);
    throw error;
  }
};

export default api;
