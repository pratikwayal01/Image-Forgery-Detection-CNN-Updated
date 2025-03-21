# Image Forgery Detection using CNN

This project implements image forgery detection using Convolutional Neural Networks (CNN) and other machine learning techniques to identify manipulated images.

## Project Structure

```
Image-Forgery-Detection-CNN-Updated/
├── .github/
│   └── workflows/                # GitHub Actions workflow files
├── Documents/                    # Supplementary documents
├── backend/                      # Backend server implementation
│   └── app.py                    # Flask API entry point
├── configs/                      # Configuration files
│   └── model_config.py           # Model parameters and settings
├── data/                         # Data directory
│   ├── raw/                      # Original, immutable data
│   ├── processed/                # Cleaned and processed data ready for modeling
│   ├── interim/                  # Intermediate data
│   └── external/                 # External data sources
├── docs/                         # Project documentation
│   ├── images/                   # Documentation images
│   └── plots/                    # Generated plots and visualizations
├── frontend/                     # React frontend application
│   └── src/                      # Frontend source code
├── models/                       # Model implementations
│   └── weights/                  # Saved model weights
├── reports/                      # Test reports and analysis outputs
├── scripts/                      # Utility scripts
│   ├── minimal_demo.py           # Minimal demo script
│   ├── run_improved_model.py     # Script to run the improved model
│   └── ...                       # Other supporting scripts
├── tests/                        # Test suites
│   ├── test_models.py            # Model test cases
│   └── generate_test_report.py   # Test report generator
├── utils/                        # Utility functions and helpers
│   ├── common.py                 # Common utility functions
│   ├── feature_extraction.py     # Feature extraction utilities
│   └── extract_patches.py        # Image patch extraction utilities
├── .gitignore                    # Git ignore file
├── Dockerfile                    # Docker build configuration
├── README.md                     # Project overview and instructions
└── requirements.txt              # Python dependency list  
```

## Installation

Install dependencies:

```bash
pip install -r requirements.txt
```

For the frontend:

```bash
cd react-frontend
npm install
```

## Usage

### Running the Models

```bash
python scripts/run_improved_model.py
```

### Running the Backend Server

```bash
cd backend
python app.py
```

### Running the Frontend

```bash
cd react-frontend
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Overview

Image forgery detection is a critical task in digital forensics. This project focuses on detecting image manipulations using deep learning techniques. The implementation includes:

- A Convolutional Neural Network (CNN) architecture optimized for forgery detection
- Advanced feature extraction and fusion techniques
- Sophisticated classification methods including XGBoost
- Comprehensive evaluation metrics

## Quick Start

### Prerequisites

- Python 3.7+
- PyTorch 1.7+
- scikit-learn
- XGBoost
- NumPy, Pandas, Matplotlib

### Installation

Install all required dependencies:

```bash
.\install_dependencies.bat
```

### Running the Model

1. **Run the Full Improved Model Demo**:

```bash
.\run_improved_model.bat
```

2. **Run the Minimal Demo** (demonstrates the improved CNN architecture):

```bash
.\run_minimal_demo.bat
```

3. **Run the XGBoost Demo** (demonstrates proper XGBoost configuration):

```bash
.\run_xgboost_demo.bat
```

## Project Structure

- `src/` - Source code directory
  - `cnn/` - CNN implementation
  - `feature_fusion/` - Feature fusion techniques
  - `classification/` - Classification methods
  - Various demo scripts
- `data/` - Data directory
- `IMPROVED_MODEL.md` - Detailed documentation of the improvements
- `IMPROVED_README.md` - Extended documentation with technical details

## Key Improvements

1. **Enhanced CNN Architecture**

   - Residual connections
   - Attention mechanisms
   - Batch normalization
   - Adaptive pooling

2. **Advanced Feature Fusion**

   - Multiple fusion strategies
   - Spatial pyramid pooling

3. **Sophisticated Classification**

   - Ensemble methods
   - XGBoost with best practices
   - Imbalanced data handling

4. **Modern Training Techniques**
   - Mixed precision training
   - Advanced learning rate scheduling

## Performance

The improved model achieves significantly better performance compared to the original model, with expected accuracy improvements of approximately 2% and enhanced robustness to various forgery types.

## Documentation

For more detailed information:

- See [IMPROVED_README.md](IMPROVED_README.md) for technical details
- See [IMPROVED_MODEL.md](IMPROVED_MODEL.md) for in-depth explanation of improvements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Y. Rao et al. for the original work on CNN-based image forgery detection
- The PyTorch team for their excellent deep learning framework
- The XGBoost team for their powerful gradient boosting implementation

## Test Results

The model was tested on a diverse set of images from the CASIA2 dataset, achieving an accuracy of 100% on the test set. The system correctly identified both tampered and authentic images with high confidence.

![Test Results](reports/casia2_forgery_detection_report_20250315_220137.png)

To generate your own test report:

```
.\generate_report.bat
```

## Model Architecture

The CNN architecture includes:

- Convolutional layers for feature extraction
- Residual connections for better gradient flow
- Attention mechanisms to focus on important features
- SVM classifier for final decision making

## Tampering Localization

The system can localize tampered regions in an image using a sliding window approach:

1. The image is divided into overlapping patches
2. Each patch is analyzed by the CNN model
3. A heatmap is generated showing the probability of tampering
4. Contours are drawn around regions with high tampering probability
