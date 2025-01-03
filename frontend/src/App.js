import animationData from "./animation-thinking.json";
import { useState } from 'react';
import { Brain, Share2, Timer } from 'lucide-react';
import DrawingCanvas from './components/DrawingCanvas';
import Lottie from 'react-lottie-player';


const algorithms = [
  {
    name: 'K-Nearest Neighbors', accuracy: 0.96, precision: 0.96, recall: 0.96, f1Score: 0.96,
    img: 'knn.png'
  },
  {
    name: 'K-Means Clustering', accuracy: 0.65, precision: 0.71, recall: 0.65, f1Score: 0.66,
    img: 'kmeans.png'
  },
  {
    name: 'Artificial Neural Network', accuracy: 0.97, precision: 0.97, recall: 0.97, f1Score: 0.97,
    img: 'ann.png'
  },
  {
    name: 'Support Vector Machine', accuracy: 0.96, precision: 0.96, recall: 0.96, f1Score: 0.96,
    img: 'svm.png'
  }
]


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
                      accuracy={item.accuracy}
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
              <img src={selectedAlgorithm.img} alt="Algorithm" className="w-auto h-[350px]" />
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