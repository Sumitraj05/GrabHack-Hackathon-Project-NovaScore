import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, RefreshCw, Upload, FileText, CheckCircle } from 'lucide-react';
import { generateDataset } from '../utils/dataGenerator';
import DataVisualization from './DataVisualization';

interface DataStats {
  totalRecords: number;
  genderDistribution: { [key: string]: number };
  locationDistribution: { [key: string]: number };
  avgAge: number;
  avgEarnings: number;
  avgRating: number;
  avgAccidentRate: number;
}

const DataExploration: React.FC = () => {
  const [dataset, setDataset] = useState<any[]>([]);
  const [stats, setStats] = useState<DataStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    setLoading(true);
    setTimeout(() => {
      const data = generateDataset(10000);
      setDataset(data);
      calculateStats(data);
      setLoading(false);
    }, 1000);
  };

  const calculateStats = (data: any[]) => {
    const genderDist = data.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {});

    const locationDist = data.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {});

    const avgAge = data.reduce((sum, item) => sum + item.age, 0) / data.length;
    const avgEarnings = data.reduce((sum, item) => sum + item.monthly_earnings, 0) / data.length;
    const avgRating = data.reduce((sum, item) => sum + item.avg_rating, 0) / data.length;
    const avgCreditScore = data.reduce((sum, item) => sum + item.credit_score, 0) / data.length;

    setStats({
      totalRecords: data.length,
      genderDistribution: genderDist,
      locationDistribution: locationDist,
      avgAge: Math.round(avgAge * 100) / 100,
      avgEarnings: Math.round(avgEarnings * 100) / 100,
      avgRating: Math.round(avgRating * 100) / 100,
      avgCreditScore: Math.round(avgCreditScore * 100) / 100
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    setUploadMessage('Processing your dataset...');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Validate headers
        const expectedHeaders = ['gender', 'age', 'location', 'monthly_earnings', 'trip_frequency', 'avg_rating', 'consistency', 'credit_score'];
        const hasValidHeaders = expectedHeaders.every(header => headers.includes(header));
        
        if (!hasValidHeaders) {
          throw new Error('Invalid CSV format. Please ensure your CSV has the required columns.');
        }

        const data = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const row: any = {};
          
          headers.forEach((header, i) => {
            if (header === 'gender' || header === 'location') {
              row[header] = values[i];
            } else {
              const numValue = parseFloat(values[i]);
              if (isNaN(numValue)) {
                throw new Error(`Invalid numeric value in row ${index + 2}, column ${header}`);
              }
              row[header] = numValue;
            }
          });
          
          // Calculate credit score if not provided (though it should be our target)
          if (!row.credit_score) {
            row.credit_score = calculateCreditScore(row);
          }
          
          return row;
        });

        if (data.length === 0) {
          throw new Error('No data rows found in the CSV file.');
        }

        setDataset(data);
        calculateStats(data);
        setUploadStatus('success');
        setUploadMessage(`Successfully loaded ${data.length} records from your dataset!`);
        setLoading(false);
        
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
      } catch (error) {
        setUploadStatus('error');
        setUploadMessage(error instanceof Error ? error.message : 'Failed to process the file');
        console.error('File upload error:', error);
      }
    };

    reader.onerror = () => {
      setUploadStatus('error');
      setUploadMessage('Failed to read the file');
    };

    reader.readAsText(file);
  };

  const calculateCreditScore = (features: any): number => {
    let score = 650;
    
    if (features.age < 25) score -= 30;
    else if (features.age > 65) score -= 20;
    else if (features.age >= 35 && features.age <= 50) score += 25;
    
    if (features.gender === 'Male') score += 5;
    if (features.location === 'Urban') score += 15;
    
    if (features.monthly_earnings < 2000) score -= 40;
    else if (features.monthly_earnings > 3500) score += 30;
    
    if (features.avg_rating < 3.5) score -= 35;
    else if (features.avg_rating > 4.5) score += 25;
    
    score -= features.consistency * 60;
    
    if (features.trip_frequency > 120) score += 10;
    else if (features.trip_frequency < 90) score -= 15;
    
    score += (Math.random() - 0.5) * 40;
    
    return Math.max(300, Math.min(850, Math.round(score)));
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const downloadData = () => {
    const csvContent = [
      'gender,age,location,monthly_earnings,trip_frequency,avg_rating,accident_rate,consistency,credit_score,risk_score',
      ...dataset.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk_prediction_dataset.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Exploring dataset...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Data Exploration & Analytics
          </h2>
          <p className="text-gray-600 mt-1">Comprehensive analysis of the risk prediction dataset with advanced visualizations</p>
        </div>
        <div className="flex space-x-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={triggerFileUpload}
            disabled={uploadStatus === 'uploading'}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Upload className="h-4 w-4" />
            <span>{uploadStatus === 'uploading' ? 'Uploading...' : 'Upload CSV'}</span>
          </button>
          <button
            onClick={downloadData}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus !== 'idle' && (
        <div className={`p-4 rounded-lg border-l-4 ${
          uploadStatus === 'success' ? 'bg-green-50 border-green-400' :
          uploadStatus === 'error' ? 'bg-red-50 border-red-400' :
          'bg-blue-50 border-blue-400'
        } transition-all duration-300 animate-pulse`}>
          <div className="flex items-center space-x-2">
            {uploadStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
            {uploadStatus === 'error' && <FileText className="h-5 w-5 text-red-600" />}
            {uploadStatus === 'uploading' && <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />}
            <span className={`font-medium ${
              uploadStatus === 'success' ? 'text-green-800' :
              uploadStatus === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {uploadMessage}
            </span>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-700">Total Records</span>
            </div>
            <p className="text-3xl font-bold text-blue-900 mt-3">{stats.totalRecords.toLocaleString()}</p>
            <div className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Avg Age</span>
            </div>
            <p className="text-3xl font-bold text-green-900 mt-3">{stats.avgAge}</p>
            <div className="mt-2 h-1 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-purple-700">Avg Earnings</span>
            </div>
            <p className="text-3xl font-bold text-purple-900 mt-3">${stats.avgEarnings}</p>
            <div className="mt-2 h-1 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-orange-700">Avg Rating</span>
            </div>
            <p className="text-3xl font-bold text-orange-900 mt-3">{stats.avgRating}/5.0</p>
            <div className="mt-2 h-1 bg-orange-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-500 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-red-700">Avg Credit Score</span>
            </div>
            <p className="text-3xl font-bold text-red-900 mt-3">{Math.round(stats.avgCreditScore)}</p>
            <div className="mt-2 h-1 bg-red-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-indigo-700">Features</span>
            </div>
            <p className="text-3xl font-bold text-indigo-900 mt-3">9</p>
            <div className="mt-2 h-1 bg-indigo-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Data Sample */}
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Dataset Preview</span>
          </h3>
          <p className="text-gray-600 mt-1">First 10 records from your dataset with interactive features</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Credit Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataset.slice(0, 10).map((row, index) => (
                  <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${row.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                        {row.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{row.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${row.location === 'Urban' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {row.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${row.monthly_earnings}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{row.avg_rating}</span>
                        <div className="flex space-x-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-3 h-3 rounded-full ${star <= row.avg_rating ? 'bg-yellow-400' : 'bg-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-lg">{row.credit_score}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.credit_score >= 740 ? 'bg-green-100 text-green-800' :
                          row.credit_score >= 670 ? 'bg-blue-100 text-blue-800' :
                          row.credit_score >= 580 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {row.credit_score >= 740 ? 'Excellent' :
                           row.credit_score >= 670 ? 'Good' :
                           row.credit_score >= 580 ? 'Fair' : 'Poor'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <DataVisualization data={dataset} />

      {/* CSV Format Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>CSV Upload Format Guide</span>
        </h3>
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-600 mb-2">Your CSV file should have the following columns (in any order):</p>
          <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
            gender,age,location,monthly_earnings,trip_frequency,avg_rating,consistency,credit_score
          </code>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
            <div>• <strong>gender:</strong> Male/Female</div>
            <div>• <strong>age:</strong> 18-80</div>
            <div>• <strong>location:</strong> Urban/Rural</div>
            <div>• <strong>monthly_earnings:</strong> Numeric</div>
            <div>• <strong>trip_frequency:</strong> Numeric</div>
            <div>• <strong>avg_rating:</strong> 1.0-5.0</div>
            <div>• <strong>consistency:</strong> 0.0-1.0</div>
            <div>• <strong>credit_score:</strong> 300-850 (Target)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExploration;