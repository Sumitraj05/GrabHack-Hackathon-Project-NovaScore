import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Target, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, BarChart3, PieChart, Activity } from 'lucide-react';

interface PredictionData {
  credit_score: number;
  credit_level: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  confidence: number;
  recommendations: string[];
  inputData: {
    gender: string;
    age: number;
    location: string;
    monthly_earnings: number;
    trip_frequency: number;
    avg_rating: number;
    consistency: number;
  };
}

const PredictionResultPage: React.FC = () => {
  const location = useLocation();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [gaugeRotation, setGaugeRotation] = useState(0);

  useEffect(() => {
    const data = location.state as PredictionData;
    if (data) {
      setPrediction(data);
      // Calculate gauge rotation based on credit score
      const rotation = ((data.credit_score - 300) / 550) * 180 - 90;
      setTimeout(() => setGaugeRotation(rotation), 500);
    }
  }, [location.state]);

  if (!prediction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No prediction data found</p>
          <Link to="/prediction" className="text-blue-600 hover:underline mt-2 inline-block">
            Go back to prediction
          </Link>
        </div>
      </div>
    );
  }

  const getCreditColor = (level: string) => {
    switch (level) {
      case 'Excellent': return { bg: 'from-green-500 to-emerald-600', text: 'text-green-700', border: 'border-green-200' };
      case 'Good': return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-700', border: 'border-blue-200' };
      case 'Fair': return { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'Poor': return { bg: 'from-red-500 to-red-600', text: 'text-red-700', border: 'border-red-200' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const creditColors = getCreditColor(prediction.credit_level);

  const getFeatureAnalysis = (key: string, value: any) => {
    const analyses: { [key: string]: { status: 'good' | 'warning' | 'poor', message: string, range: string } } = {
      age: {
        status: value >= 25 && value <= 60 ? 'good' : 'warning',
        message: value >= 25 && value <= 60 ? 'Optimal age range for credit' : 'Age may impact credit score',
        range: '25-60 (Optimal)'
      },
      monthly_earnings: {
        status: value >= 3000 ? 'good' : value >= 2000 ? 'warning' : 'poor',
        message: value >= 3000 ? 'Strong earning capacity' : value >= 2000 ? 'Moderate earnings' : 'Low earnings may affect score',
        range: '$3000+ (Excellent)'
      },
      avg_rating: {
        status: value >= 4.5 ? 'good' : value >= 3.5 ? 'warning' : 'poor',
        message: value >= 4.5 ? 'Excellent service rating' : value >= 3.5 ? 'Good service rating' : 'Rating needs improvement',
        range: '4.5+ (Excellent)'
      },
      consistency: {
        status: value <= 0.1 ? 'good' : value <= 0.2 ? 'warning' : 'poor',
        message: value <= 0.1 ? 'Excellent consistency' : value <= 0.2 ? 'Good consistency' : 'Consistency needs improvement',
        range: '0.0-0.1 (Excellent)'
      },
      trip_frequency: {
        status: value >= 100 ? 'good' : value >= 80 ? 'warning' : 'poor',
        message: value >= 100 ? 'High activity level' : value >= 80 ? 'Moderate activity' : 'Low activity may affect score',
        range: '100+ (Optimal)'
      }
    };

    return analyses[key] || { status: 'good', message: 'Normal range', range: 'Standard' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/prediction"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Prediction</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nova Score Results
            </h1>
          </div>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Credit Score Gauge */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Nova Score</h2>
              <p className="text-gray-600">Credit Score Assessment Result</p>
            </div>

            {/* Gauge Visualization */}
            <div className="relative w-80 h-40 mx-auto mb-8">
              {/* Gauge Background */}
              <svg className="w-full h-full" viewBox="0 0 200 100">
                {/* Background Arc */}
                <path
                  d="M 20 80 A 80 80 0 0 1 180 80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                
                {/* Color Segments */}
                <path d="M 20 80 A 80 80 0 0 1 65 25" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
                <path d="M 65 25 A 80 80 0 0 1 100 20" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
                <path d="M 100 20 A 80 80 0 0 1 135 25" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
                <path d="M 135 25 A 80 80 0 0 1 180 80" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" />
                
                {/* Needle */}
                <g transform={`rotate(${gaugeRotation} 100 80)`}>
                  <line x1="100" y1="80" x2="100" y2="30" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="80" r="6" fill="#374151" />
                </g>
                
                {/* Labels */}
                <text x="30" y="95" textAnchor="middle" className="text-xs fill-red-600 font-semibold">Poor</text>
                <text x="70" y="35" textAnchor="middle" className="text-xs fill-yellow-600 font-semibold">Fair</text>
                <text x="130" y="35" textAnchor="middle" className="text-xs fill-blue-600 font-semibold">Good</text>
                <text x="170" y="95" textAnchor="middle" className="text-xs fill-green-600 font-semibold">Excellent</text>
              </svg>
            </div>

            {/* Score Display */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${creditColors.bg} text-white text-3xl font-bold mb-4 shadow-lg`}>
                {prediction.credit_score}
              </div>
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${creditColors.bg} bg-opacity-10 border ${creditColors.border}`}>
                {prediction.credit_level === 'Excellent' || prediction.credit_level === 'Good' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                <span className={`font-semibold ${creditColors.text}`}>{prediction.credit_level} Credit</span>
              </div>
              <p className="text-gray-600 mt-2">Range: 300-850</p>
            </div>

            {/* Confidence */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Model Confidence</span>
                <span className="text-sm font-semibold text-gray-900">{prediction.confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Feature Analysis */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Analysis</h2>
            <div className="space-y-4">
              {Object.entries(prediction.inputData).map(([key, value]) => {
                if (key === 'gender' || key === 'location') return null;
                
                const analysis = getFeatureAnalysis(key, value);
                const statusColors = {
                  good: 'from-green-50 to-green-100 border-green-200 text-green-800',
                  warning: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800',
                  poor: 'from-red-50 to-red-100 border-red-200 text-red-800'
                };

                return (
                  <div key={key} className={`p-4 rounded-lg border bg-gradient-to-r ${statusColors[analysis.status]}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-bold">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                    </div>
                    <p className="text-sm mb-1">{analysis.message}</p>
                    <p className="text-xs opacity-75">Optimal Range: {analysis.range}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 w-full bg-white/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.status === 'good' ? 'bg-green-500' :
                          analysis.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            analysis.status === 'good' ? 100 :
                            analysis.status === 'warning' ? 60 : 30
                          }%` 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Score Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Score Breakdown</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Base Score', value: 650, color: 'bg-gray-400' },
                { label: 'Age Factor', value: prediction.inputData.age >= 25 && prediction.inputData.age <= 60 ? 25 : -20, color: 'bg-blue-500' },
                { label: 'Earnings Impact', value: prediction.inputData.monthly_earnings >= 3000 ? 30 : -20, color: 'bg-green-500' },
                { label: 'Rating Bonus', value: prediction.inputData.avg_rating >= 4.5 ? 25 : -15, color: 'bg-purple-500' },
                { label: 'Consistency', value: prediction.inputData.consistency <= 0.1 ? 20 : -30, color: 'bg-yellow-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${item.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.value >= 0 ? '+' : ''}{item.value}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Risk Assessment</h3>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${creditColors.bg} text-white text-lg font-bold mb-3`}>
                {prediction.credit_level === 'Excellent' ? 'A+' :
                 prediction.credit_level === 'Good' ? 'B+' :
                 prediction.credit_level === 'Fair' ? 'C' : 'D'}
              </div>
              <p className={`font-semibold ${creditColors.text} mb-2`}>{prediction.credit_level} Risk</p>
              <p className="text-sm text-gray-600">
                {prediction.credit_level === 'Excellent' ? 'Very Low Risk - Highly Recommended' :
                 prediction.credit_level === 'Good' ? 'Low Risk - Recommended' :
                 prediction.credit_level === 'Fair' ? 'Moderate Risk - Conditional' : 'High Risk - Not Recommended'}
              </p>
            </div>
          </div>

          {/* Improvement Potential */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Improvement Potential</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-bold mb-3">
                +{Math.min(850 - prediction.credit_score, 100)}
              </div>
              <p className="font-semibold text-green-700 mb-2">Potential Increase</p>
              <p className="text-sm text-gray-600">
                With improvements, your score could reach {Math.min(prediction.credit_score + 100, 850)}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prediction.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="p-1 bg-blue-500 rounded-full flex-shrink-0 mt-1">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            to="/prediction"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Target className="h-5 w-5" />
            <span>New Prediction</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultPage;