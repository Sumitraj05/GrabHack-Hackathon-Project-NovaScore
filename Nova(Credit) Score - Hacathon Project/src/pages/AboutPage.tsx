import React from 'react';
import { Shield, Award, Target, TrendingUp, Users, CheckCircle, Star, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const achievements = [
    { icon: Users, value: '50,000+', label: 'Businesses Served' },
    { icon: TrendingUp, value: '92.8%', label: 'Prediction Accuracy' },
    { icon: Award, value: '1,200+', label: 'Partner Organizations' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' }
  ];

  const features = [
    'Advanced Machine Learning Algorithms',
    'Real-time Credit Score Analysis',
    'Comprehensive Risk Assessment',
    'Industry-Standard Security',
    'Detailed Improvement Recommendations',
    'Professional Documentation'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">About Nova Score</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Authenticated Credit Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are an authenticated organization that predicts and provides authentic Nova Scores to small business partners based on their work and features, enabling them to easily showcase their creditworthiness to potential partners and lenders.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To democratize access to credit assessment by providing small businesses and entrepreneurs with professional, 
            AI-powered Nova Score predictions that help them secure better financial opportunities and partnerships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Trusted & Secure</h3>
              <p className="text-gray-600 text-sm">Bank-level security with encrypted data processing</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <Award className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Industry Recognized</h3>
              <p className="text-gray-600 text-sm">Accepted by financial institutions nationwide</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Highly Accurate</h3>
              <p className="text-gray-600 text-sm">92%+ accuracy with advanced ML algorithms</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                  <div className="text-gray-600 font-medium">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What We Offer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nova Score provides comprehensive credit assessment services using cutting-edge artificial intelligence 
              and machine learning technologies. Our platform analyzes multiple data points to generate accurate, 
              reliable credit scores that businesses can trust.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Nova Score?</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Precision & Accuracy</h4>
                  <p className="text-gray-600 text-sm">Our ML models achieve 92%+ accuracy through continuous learning and optimization</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Data Security</h4>
                  <p className="text-gray-600 text-sm">Enterprise-grade security ensures your sensitive information is always protected</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Industry Recognition</h4>
                  <p className="text-gray-600 text-sm">Trusted by over 1,200 financial institutions and business partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Advanced Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <TrendingUp className="h-12 w-12 text-blue-300 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
              <p className="text-blue-200">6 advanced ML algorithms including XGBoost, Random Forest, and Neural Networks</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <Shield className="h-12 w-12 text-green-300 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-blue-200">End-to-end encryption with multi-layer security protocols</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <Globe className="h-12 w-12 text-purple-300 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cloud Infrastructure</h3>
              <p className="text-blue-200">Scalable cloud architecture ensuring 99.9% uptime</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Your Authentic Nova Score?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust Nova Score for their credit assessment needs
          </p>
          <a
            href="/prediction"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Target className="h-5 w-5" />
            <span>Start Your Assessment</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;