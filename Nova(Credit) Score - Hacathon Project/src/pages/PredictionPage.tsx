import React, { useState } from 'react';
import { Brain, Target, TrendingUp, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { trainModels } from '../utils/modelTraining';
import DataExploration from '../components/DataExploration';
import ModelTraining from '../components/ModelTraining';
import PredictionInterface from '../components/PredictionInterface';

type ActiveTab = 'exploration' | 'training' | 'prediction';

const PredictionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('exploration');

  const tabs = [
    { id: 'exploration', label: 'Data Exploration', icon: TrendingUp },
    { id: 'training', label: 'Model Training', icon: Brain },
    { id: 'prediction', label: 'Prediction', icon: Target }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nova (Credit) Score Prediction System
          </h1>
          <p className="text-xl text-gray-600">
            Professional Machine Learning Platform for Credit Score Assessment
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-8">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          {activeTab === 'exploration' && <DataExploration />}
          {activeTab === 'training' && <ModelTraining />}
          {activeTab === 'prediction' && <PredictionInterface />}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;