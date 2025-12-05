import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Calculator, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface PredictionForm {
  gender: string;
  age: number;
  location: string;
  monthly_earnings: number;
  trip_frequency: number;
  avg_rating: number;
  consistency: number;
}

interface PredictionResult {
  credit_score: number;
  credit_level: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  confidence: number;
  recommendations: string[];
}

const PredictionInterface: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PredictionForm>({
    gender: 'Male',
    age: 35,
    location: 'Urban',
    monthly_earnings: 2500,
    trip_frequency: 105,
    avg_rating: 4.0,
    consistency: 0.10
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCreditScore = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Simulate ML model prediction logic for credit score
      let creditScore = 650; // Base credit score
      
      // Age factor
      if (formData.age < 25) creditScore -= 30;
      else if (formData.age > 60) creditScore -= 20;
      else if (formData.age >= 35 && formData.age <= 50) creditScore += 25;
      
      // Gender factor
      if (formData.gender === 'Male') creditScore += 5;
      
      // Location factor
      if (formData.location === 'Urban') creditScore += 15;
      
      // Earnings factor
      if (formData.monthly_earnings < 2000) creditScore -= 40;
      else if (formData.monthly_earnings > 3000) creditScore += 30;
      
      // Rating factor
      if (formData.avg_rating < 3.5) creditScore -= 35;
      else if (formData.avg_rating > 4.5) creditScore += 25;
      
      // Consistency factor
      creditScore -= formData.consistency * 60;
      
      // Trip frequency factor
      if (formData.trip_frequency > 120) creditScore += 10;
      else if (formData.trip_frequency < 90) creditScore -= 15;
      
      // Add some randomness
      creditScore += (Math.random() - 0.5) * 40;
      
      creditScore = Math.max(300, Math.min(850, Math.round(creditScore)));
      
      const creditLevel: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 
        creditScore >= 740 ? 'Excellent' : 
        creditScore >= 670 ? 'Good' :
        creditScore >= 580 ? 'Fair' : 'Poor';
      
      const confidence = Math.random() * 15 + 85; // 85-100% confidence
      
      const recommendations = generateRecommendations(creditScore, formData);
      
      setPrediction({
        credit_score: creditScore,
        credit_level: creditLevel,
        confidence: Math.round(confidence * 100) / 100,
        recommendations,
        inputData: formData
      });
      
      // Navigate to results page
      navigate('/prediction-result', {
        state: {
          credit_score: creditScore,
          credit_level: creditLevel,
          confidence: Math.round(confidence * 100) / 100,
          recommendations,
          inputData: formData
        }
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const generateRecommendations = (creditScore: number, data: PredictionForm): string[] => {
    const recommendations: string[] = [];
    
    if (data.avg_rating < 4.0) {
      recommendations.push('Improve service quality and customer satisfaction ratings');
    }
    
    if (data.consistency < 0.15) {
      recommendations.push('Focus on maintaining consistent performance and reliability');
    }
    
    if (data.monthly_earnings < 2500) {
      recommendations.push('Consider strategies to increase monthly earnings');
    }
    
    if (data.trip_frequency > 110) {
      recommendations.push('Maintain high activity levels for better credit profile');
    }
    
    if (creditScore < 580) {
      recommendations.push('Focus on comprehensive credit improvement strategies');
    } else if (creditScore < 670) {
      recommendations.push('Work on building stronger financial habits');
    }
    
    if (creditScore >= 740) {
      recommendations.push('Excellent credit profile - maintain current practices');
    }
    
    return recommendations.length > 0 ? recommendations : ['Continue current financial practices'];
  };

  const getCreditColor = (level: string) => {
    switch (level) {
      case 'Excellent': return 'text-green-600 bg-green-100 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Poor': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCreditIcon = (level: string) => {
    switch (level) {
      case 'Excellent': return <CheckCircle className="h-6 w-6" />;
      case 'Good': return <CheckCircle className="h-6 w-6" />;
      case 'Fair': return <AlertTriangle className="h-6 w-6" />;
      case 'Poor': return <AlertTriangle className="h-6 w-6" />;
      default: return <Target className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Credit Score Prediction</h2>
        <p className="text-gray-600">Enter individual details to predict credit (Nova) score and get recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Input Features</h3>
          
          <div className="space-y-4">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                min="18"
                max="80"
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

            {/* Monthly Earnings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Earnings ($)</label>
              <input
                type="number"
                min="1000"
                max="10000"
                value={formData.monthly_earnings}
                onChange={(e) => handleInputChange('monthly_earnings', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Trip Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Frequency (per month)</label>
              <input
                type="number"
                min="50"
                max="200"
                value={formData.trip_frequency}
                onChange={(e) => handleInputChange('trip_frequency', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Average Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.avg_rating}
                onChange={(e) => handleInputChange('avg_rating', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Accident Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Consistency Score (0-1)</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={formData.consistency}
                onChange={(e) => handleInputChange('consistency', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

          </div>

          <button
            onClick={calculateCreditScore}
            disabled={isCalculating}
            className={`w-full mt-6 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              isCalculating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            <Calculator className="h-4 w-4" />
            <span>{isCalculating ? 'Calculating...' : 'Predict Credit Score'}</span>
          </button>
        </div>

        {/* Prediction Results */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Prediction Results</h3>
          
          {isCalculating ? (
            <div className="text-center py-12">
              <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Analyzing data with ML model...</p>
            </div>
          ) : prediction ? (
            <div className="space-y-6">
              {/* Credit Score Display */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold mb-4">
                  {prediction.credit_score}
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Credit (Nova) Score</h4>
                <p className="text-gray-600">Range: 300-850</p>
              </div>

              {/* Credit Level */}
              <div className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${getCreditColor(prediction.credit_level)}`}>
                {getCreditIcon(prediction.credit_level)}
                <span className="font-semibold text-lg">{prediction.credit_level} Credit</span>
              </div>

              {/* Confidence */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Model Confidence</span>
                  <span className="text-sm font-semibold text-gray-900">{prediction.confidence.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Recommendations</span>
                </h5>
                <div className="space-y-2">
                  {prediction.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-1 h-1 bg-blue-600 rounded-full mt-2"></span>
                      <span>{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter details and click "Predict Credit Score" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionInterface;