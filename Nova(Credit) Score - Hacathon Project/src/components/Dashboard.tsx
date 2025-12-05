import React from 'react';
import { BarChart, Brain, Database, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Dataset Size', value: '10,000', subtext: 'Training Records', icon: Database, color: 'blue' },
    { label: 'Model Accuracy', value: '92.8%', subtext: 'Credit Score Prediction', icon: Target, color: 'green' },
    { label: 'Features', value: '7', subtext: 'Input Variables', icon: BarChart, color: 'purple' },
    { label: 'Models Trained', value: '5', subtext: 'Algorithms Compared', icon: Brain, color: 'orange' }
  ];

  const features = [
    'Comprehensive Data Analysis & Visualization',
    'Multiple ML Algorithm Comparison',
    'Advanced Feature Engineering',
    'Cross-Validation & Model Selection',
    'Real-time Risk Prediction Interface',
    'Professional Performance Metrics'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-3 animate-pulse">Risk Prediction ML System</h2>
            <h2 className="text-4xl font-bold mb-3 animate-pulse">Credit Score Prediction ML System</h2>
            <p className="text-blue-100 text-xl mb-4 leading-relaxed">
              Professional machine learning platform for credit score assessment and prediction
            </p>
            <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold">National Level Project</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Brain className="h-20 w-20 text-white/90 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const gradientClasses = {
            blue: 'from-blue-400 to-blue-600',
            green: 'from-green-400 to-green-600',
            purple: 'from-purple-400 to-purple-600',
            orange: 'from-orange-400 to-orange-600'
          };
          
          const bgClasses = {
            blue: 'from-blue-50 to-blue-100 border-blue-200',
            green: 'from-green-50 to-green-100 border-green-200',
            purple: 'from-purple-50 to-purple-100 border-purple-200',
            orange: 'from-orange-50 to-orange-100 border-orange-200'
          };

          return (
            <div key={index} className={`bg-gradient-to-br ${bgClasses[stat.color as keyof typeof bgClasses]} rounded-xl p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${gradientClasses[stat.color as keyof typeof gradientClasses]} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="w-12 h-1 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${gradientClasses[stat.color as keyof typeof gradientClasses]} rounded-full animate-pulse`}></div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-700 font-semibold">{stat.label}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span>Advanced Features</span>
          </h3>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span>Data Schema</span>
          </h3>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-blue-900 font-semibold">gender: Categorical (Male/Female)</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-green-900 font-semibold">age: Numeric (18-80)</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-purple-900 font-semibold">location: Categorical (Urban/Rural)</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-orange-900 font-semibold">monthly_earnings: Numeric ($)</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-red-900 font-semibold">trip_frequency: Numeric</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-indigo-900 font-semibold">avg_rating: Numeric (1-5)</p>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-pink-900 font-semibold">consistency: Numeric (0-1)</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200 hover:shadow-md transition-all duration-200">
              <p className="font-mono text-sm text-yellow-900 font-semibold">credit_score: Target (300-850)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-8 shadow-xl border border-slate-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Getting Started Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-fit mx-auto mb-4">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-blue-900 text-lg mb-2">1. Explore Data</h4>
            <p className="text-sm text-blue-700 leading-relaxed">Analyze the dataset and understand patterns with interactive visualizations</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full w-fit mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-green-900 text-lg mb-2">2. Train Models</h4>
            <p className="text-sm text-green-700 leading-relaxed">Compare multiple ML algorithms with advanced metrics</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full w-fit mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-purple-900 text-lg mb-2">3. Make Predictions</h4>
            <p className="text-sm text-purple-700 leading-relaxed">Use the best model for accurate credit score prediction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;