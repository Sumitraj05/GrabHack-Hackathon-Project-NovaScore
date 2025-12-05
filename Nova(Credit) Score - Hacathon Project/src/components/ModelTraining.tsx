import React, { useState } from 'react';
import { Brain, Target, TrendingUp, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { trainModels } from '../utils/modelTraining';

interface ModelResult {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainTime: number;
  status: 'training' | 'completed' | 'error';
}

const ModelTraining: React.FC = () => {
  const [models, setModels] = useState<ModelResult[]>([
    { name: 'Linear Regression', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' },
    { name: 'Random Forest', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' },
    { name: 'XGBoost', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' },
    { name: 'Gradient Boosting', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' },
    { name: 'Support Vector Machine', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' },
    { name: 'Neural Network', accuracy: 0, precision: 0, recall: 0, f1Score: 0, trainTime: 0, status: 'training' }
  ]);
  
  const [isTraining, setIsTraining] = useState(false);
  const [bestModel, setBestModel] = useState<string | null>(null);

  const startTraining = async () => {
    setIsTraining(true);
    setBestModel(null);
    
    // Reset model statuses
    setModels(prev => prev.map(model => ({ ...model, status: 'training' as const })));

    try {
      const results = await trainModels();
      
      // Simulate progressive training completion
      for (let i = 0; i < results.length; i++) {
        setTimeout(() => {
          setModels(prev => {
            const newModels = [...prev];
            newModels[i] = { ...results[i], status: 'completed' };
            return newModels;
          });
          
          // If this is the last model, find the best one
          if (i === results.length - 1) {
            setTimeout(() => {
              const best = results.reduce((max, model) => 
                model.accuracy > max.accuracy ? model : max
              );
              setBestModel(best.name);
              setIsTraining(false);
            }, 500);
          }
        }, (i + 1) * 2000);
      }
    } catch (error) {
      setIsTraining(false);
      console.error('Training failed:', error);
    }
  };

  const getStatusIcon = (status: string, modelName: string) => {
    if (status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (status === 'error') {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    } else {
      return <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getModelColor = (modelName: string, bestModel: string | null) => {
    if (bestModel === modelName) {
      return 'border-green-500 bg-green-50';
    }
    return 'border-slate-200 bg-white';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Model Training</h2>
          <p className="text-gray-600">Compare multiple ML algorithms and select the best performer</p>
        </div>
        <button
          onClick={startTraining}
          disabled={isTraining}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            isTraining
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          <Play className="h-4 w-4" />
          <span>{isTraining ? 'Training...' : 'Start Training'}</span>
        </button>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-800 font-medium">Training models with cross-validation...</span>
          </div>
          <p className="text-blue-600 text-sm mt-1">This process includes data preprocessing, feature engineering, and model evaluation.</p>
        </div>
      )}

      {/* Best Model Highlight */}
      {bestModel && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Best Model: {bestModel}</span>
          </div>
          <p className="text-green-600 text-sm mt-1">This model achieved the highest accuracy and will be used for predictions.</p>
        </div>
      )}

      {/* Model Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {models.map((model, index) => (
          <div
            key={index}
            className={`rounded-lg border-2 p-6 transition-all ${getModelColor(model.name, bestModel)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{model.name}</h3>
              </div>
              {getStatusIcon(model.status, model.name)}
            </div>

            {model.status === 'completed' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="font-semibold text-gray-900">{(model.accuracy * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${model.accuracy * 100}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Precision</p>
                    <p className="font-medium text-gray-900">{(model.precision * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Recall</p>
                    <p className="font-medium text-gray-900">{(model.recall * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">F1-Score</p>
                    <p className="font-medium text-gray-900">{(model.f1Score * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Train Time</p>
                    <p className="font-medium text-gray-900">{model.trainTime}ms</p>
                  </div>
                </div>

                {bestModel === model.name && (
                  <div className="mt-3 flex items-center space-x-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Best Performance</span>
                  </div>
                )}
              </div>
            ) : model.status === 'training' ? (
              <div className="text-center py-8">
                <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-600">Training in progress...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">Training failed</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Training Details */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Dataset Split</h4>
            <p className="text-sm text-gray-600">80% Training / 20% Testing</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Cross-Validation</h4>
            <p className="text-sm text-gray-600">5-Fold CV for robust evaluation</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
            <p className="text-sm text-gray-600">9 input features + engineering</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Preprocessing</h4>
            <p className="text-sm text-gray-600">Scaling, encoding, normalization</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Hyperparameter Tuning</h4>
            <p className="text-sm text-gray-600">Grid search optimization</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Evaluation Metrics</h4>
            <p className="text-sm text-gray-600">Accuracy, Precision, Recall, F1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;