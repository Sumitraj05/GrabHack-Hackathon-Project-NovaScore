import React from 'react';
import { BarChart3, PieChart, TrendingUp, Activity, Users, MapPin } from 'lucide-react';

interface DataVisualizationProps {
  data: any[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  // Calculate distributions for visualizations
  const genderDist = data.reduce((acc, item) => {
    acc[item.gender] = (acc[item.gender] || 0) + 1;
    return acc;
  }, {});

  const locationDist = data.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {});

  // Age groups
  const ageGroups = data.reduce((acc, item) => {
    const group = item.age < 30 ? '18-29' : 
                  item.age < 40 ? '30-39' :
                  item.age < 50 ? '40-49' :
                  item.age < 60 ? '50-59' : '60+';
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  // Risk score distribution
  const creditGroups = data.reduce((acc, item) => {
    const group = item.credit_score >= 740 ? 'Excellent (740-850)' :
                  item.credit_score >= 670 ? 'Good (670-739)' :
                  item.credit_score >= 580 ? 'Fair (580-669)' : 'Poor (<580)';
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  const createBarChart = (data: { [key: string]: number }, title: string, color: string) => {
    const maxValue = Math.max(...Object.values(data));
    const entries = Object.entries(data);
    
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      purple: 'from-purple-400 to-purple-600',
      orange: 'from-orange-400 to-orange-600',
      red: 'from-red-400 to-red-600',
      indigo: 'from-indigo-400 to-indigo-600'
    };
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 bg-gradient-to-r ${colorMap[color]} rounded-lg`}>
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-4">
          {entries.map(([key, value]) => (
            <div key={key} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{key}</span>
                <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                  {value.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${colorMap[color]} h-3 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                  style={{ width: `${(value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const createPieChart = (data: { [key: string]: number }, title: string, colors: string[]) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const entries = Object.entries(data);
    
    const gradientColors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600'
    ];
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        {/* Animated Pie Chart Representation */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
              {entries.map(([key, value], index) => {
                const percentage = (value / total) * 100;
                const rotation = entries.slice(0, index).reduce((acc, [, v]) => acc + (v / total) * 360, 0);
                return (
                  <div
                    key={key}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientColors[index % gradientColors.length]} opacity-80`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + percentage * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + percentage * 3.6) * Math.PI / 180)}%, 50% 50%)`,
                      transform: `rotate(${rotation}deg)`
                    }}
                  />
                );
              })}
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Total</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {entries.map(([key, value], index) => {
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradientColors[index % gradientColors.length]} shadow-lg`}
                  ></div>
                  <span className="text-sm font-semibold text-gray-700">{key}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{percentage}%</div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{value.toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Advanced Data Visualizations
          </h3>
          <p className="text-gray-600 mt-1">Interactive charts with real-time animations and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-purple-600 animate-pulse" />
          <span className="text-sm text-purple-600 font-medium">Live Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {createBarChart(genderDist, 'Gender Distribution', 'blue')}
        {createPieChart(locationDist, 'Location Distribution', ['#3B82F6', '#10B981'])}
        {createBarChart(ageGroups, 'Age Group Distribution', 'green')}
        {createPieChart(creditGroups, 'Credit Score Distribution', ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'])}
      </div>

      {/* Correlation Insights */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-xl shadow-xl border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Data Intelligence & Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="h-5 w-5 text-blue-600" />
              <h4 className="font-bold text-blue-900">Gender Distribution</h4>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              {((genderDist['Male'] / data.length) * 100).toFixed(1)}% Male, {((genderDist['Female'] / data.length) * 100).toFixed(1)}% Female distribution
            </p>
            <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <h4 className="font-bold text-green-900">Geographic Analysis</h4>
            </div>
            <p className="text-sm text-green-800 leading-relaxed">
              Urban vs Rural population shows {locationDist['Urban'] > locationDist['Rural'] ? 'urban dominance' : 'balanced distribution'}
            </p>
            <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="h-5 w-5 text-purple-600" />
              <h4 className="font-bold text-purple-900">Risk Assessment</h4>
            </div>
            <p className="text-sm text-purple-800 leading-relaxed">
              {((creditGroups['Excellent (740-850)'] / data.length) * 100).toFixed(1)}% excellent credit score holders
            </p>
            <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;