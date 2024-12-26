import animationData from "./animation-thinking.json";
import { useState } from 'react';
import { Brain, Share2, Timer } from 'lucide-react';
import DrawingCanvas from './components/DrawingCanvas';
import Lottie from 'react-lottie-player';

// const fetchDataFromBackend = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return {
//     algorithms: ['knn', 'kmeans', 'ann', 'svm'],
//     algorithmNames: {
//       knn: 'K-Nearest Neighbors',
//       kmeans: 'K-Means Clustering',
//       ann: 'Artificial Neural Network',
//       svm: 'Support Vector Machine'
//     },
//     predictions: {
//       knn: { number: '५', accuracy: 0.95, precision: 0.94, recall: 0.95, f1Score: 0.94 },
//       kmeans: { number: '५', accuracy: 0.92, precision: 0.91, recall: 0.92, f1Score: 0.91 },
//       ann: { number: '५', accuracy: 0.97, precision: 0.96, recall: 0.97, f1Score: 0.96 },
//       svm: { number: '५', accuracy: 0.96, precision: 0.95, recall: 0.96, f1Score: 0.95 }
//     }
//   };
// };

const algorithms = [
  {
    name: 'K-Nearest Neighbors', accuracy: 0.95, precision: 0.94, recall: 0.95, f1Score: 0.94,
    img: 'no-search.png'
  },
  {
    name: 'K-Means Clustering', accuracy: 0.92, precision: 0.91, recall: 0.92, f1Score: 0.91,
    img: 'no-search.png'
  },
  {
    name: 'Artificial Neural Network', accuracy: 0.97, precision: 0.96, recall: 0.97, f1Score: 0.96,
    img: 'no-search.png'
  },
  {
    name: 'Support Vector Machine', accuracy: 0.96, precision: 0.95, recall: 0.96, f1Score: 0.95,
    img: 'no-search.png'
  }
]


const FeatureCard = ({ icon: Icon, text }) => (
  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
    <Icon className="h-6 w-6 mx-auto mb-2 text-blue-400" />
    <p className="text-sm text-gray-300">{text}</p>
  </div>
);

const AlgorithmResult = ({ name, accuracy, prediction }) => (
  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex justify-between items-center">
    <div>
      <h3 className="font-medium text-gray-200">{name}</h3>
      <p className="text-sm text-gray-400">
        Accuracy: {typeof accuracy === 'number' ? (accuracy * 100).toFixed(1) : '0'}%
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-blue-400">
        Predicted: {prediction}
      </p>
    </div>
  </div>
);

const MetricsPanel = ({ metrics }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
    <h3 className="text-lg font-semibold text-gray-200 mb-2">Metrics</h3>
    <div className="space-y-2">
      {Object.entries(metrics).map(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        return (
          <p key={key} className="text-sm text-gray-300">
            {formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}: {
              key === 'number' ? value : typeof value === 'number' ? value.toFixed(3) : '0'
            }
          </p>
        );
      })}
    </div>
  </div>
);

const ConfusionMatrix = ({ algorithmName }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
    <h3 className="text-lg font-semibold text-gray-200 mb-2">
      Confusion Matrix
    </h3>
    <div className="flex justify-center">
      <img
        src="/api/placeholder/250/250"
        alt={`Confusion Matrix for ${algorithmName}`}
        className="w-[250px] h-[250px]"
      />
    </div>
  </div>
);

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [backendData, setBackendData] = useState([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredictionStart = () => {
    setIsLoading(true);
    setShowPrediction(false);
  };

  const handlePredictionComplete = (data) => {
    setBackendData(data);
    setShowPrediction(true);
    setIsLoading(false);
  };
  return (
    <main className="min-h-screen relative">
      <div className="relative container mx-auto px-2 py-2">
      <header className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            DEVANAGARI NUMBER RECOGNITION
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compare Prediction of different data mining models on Devanagari Numbers
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Drawing Section */}
          <div className="md:col-span-3 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">

            <DrawingCanvas
              onPredictionStart={handlePredictionStart}
              onPredictionComplete={handlePredictionComplete}
            />
          </div>

          {/* Analysis Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
              <h1 className="text-center text-2xl font-bold  bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                See what the AI thinks 😉
              </h1>
              
              <h2 className="text-lg text-gray-200 mb-4">
                {showPrediction && backendData.length
                  ? "Prediction Results"
                  : isLoading
                    ? "Predicting Results..."
                    : "Write and hit Predict to continue..."}
              </h2>

              {showPrediction && backendData.length ? (
                <div className="space-y-3">
                  {backendData.map((item) => (
                    <AlgorithmResult
                      key={item.model_name}
                      name={item.model_name}
                      accuracy={92}
                      prediction={item.prediction}
                    />
                  ))}
                </div>
              ) : isLoading ? (
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: 400, height: 400, margin: 'auto' }}
                />
              ) : (
                <div className="mt-20">
                  <img src="no-search.png" alt="No prediction" className="w-2/3 mx-auto opacity-70" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Algorithm Metrics
          </h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.name}
                className={`px-4 py-2 rounded-lg ${selectedAlgorithm === algo
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                onClick={() => setSelectedAlgorithm(algo)}
              >
                {algo.name}
              </button>
            ))}
          </div>
          <div className=" flex items-center justify-start gap-20">
            <div className="text-white ">
            <p>Accuracy: {selectedAlgorithm.accuracy}</p>
            <p>Precision: {selectedAlgorithm.precision}</p>
            <p>Recall: {selectedAlgorithm.recall}</p>
            <p>F1 Score: {selectedAlgorithm.f1Score}</p>
            </div>
            <div>
              <img src='no-search.png' alt="Algorithm" className="w-auto h-[200px]" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            About Nepali Numbers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">Number System</h3>
              <p className="text-gray-400 text-sm">
                Nepali numbers (०, १, २, ३, ४, ५, ६, ७, ८, ९) are part of the
                Devanagari script, used in Nepal. Each number has distinct
                characteristics that our ML model learns to recognize.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-200">ML Analysis</h3>
              <p className="text-gray-400 text-sm">
                Our algorithms analyze your drawn number by comparing it with
                thousands of training examples, using various techniques to make
                accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}