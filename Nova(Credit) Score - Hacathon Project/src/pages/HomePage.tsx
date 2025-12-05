import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Shield, Award, BarChart3, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Accurate Predictions',
      description: 'Advanced ML algorithms with 92%+ accuracy for reliable Nova Score predictions',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level security with encrypted data processing and privacy protection',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Detailed insights and recommendations to improve your Nova Score',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Industry Standard',
      description: 'Recognized by financial institutions and business partners nationwide',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Predictions Made', icon: Target },
    { value: '92.8%', label: 'Accuracy Rate', icon: TrendingUp },
    { value: '1,200+', label: 'Business Partners', icon: Users },
    { value: '4.9/5', label: 'User Rating', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold">Professional Credit Assessment</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              Nova Score
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              The most advanced AI-powered credit score prediction system for small businesses and entrepreneurs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/prediction"
                className="group flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <Target className="h-5 w-5" />
                <span>Get Your Nova Score</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nova Score?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced machine learning platform provides the most accurate and reliable credit score predictions in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Nova Score Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and accurate in just 3 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Input Your Data',
                description: 'Provide basic business and personal information through our secure form',
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced ML algorithms analyze your data using 6 different models',
                color: 'from-purple-500 to-purple-600'
              },
              {
                step: '03',
                title: 'Get Your Score',
                description: 'Receive your Nova Score with detailed insights and improvement recommendations',
                color: 'from-green-500 to-green-600'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} rounded-full text-white text-2xl font-bold mb-6 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Your Nova Score?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of businesses who trust Nova Score for their credit assessment needs
          </p>
          <Link
            to="/prediction"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <Target className="h-5 w-5" />
            <span>Start Prediction Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;