import React from 'react';
import { Brain, Code, Palette, Github, Linkedin, Mail, Award, Star } from 'lucide-react';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Avadhesh Kumar Shah',
      role: 'AI/ML Engineer',
      description: 'Expert in machine learning algorithms, deep learning, and AI model optimization. Specializes in credit scoring models and predictive analytics.',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Data Science', 'AI Research'],
      achievements: ['92%+ Model Accuracy', '6 ML Algorithms', '50K+ Predictions']
    },
    {
      name: 'Sumit Raj Tiwari',
      role: 'Backend Developer',
      description: 'Full-stack backend specialist with expertise in scalable architectures, database optimization, and API development for high-performance systems.',
      icon: Code,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      skills: ['Node.js', 'Python', 'Database Design', 'API Development', 'Cloud Architecture', 'DevOps'],
      achievements: ['99.9% Uptime', 'Scalable APIs', 'Secure Systems']
    },
    {
      name: 'Rishav Ojha',
      role: 'Frontend Developer',
      description: 'Creative frontend developer focused on user experience, modern web technologies, and creating intuitive interfaces for complex data visualization.',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      skills: ['React', 'TypeScript', 'UI/UX Design', 'Data Visualization', 'Modern CSS', 'Responsive Design'],
      achievements: ['Interactive UI', 'Modern Design', 'User-Friendly']
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">Meet Our Team</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            The Minds Behind Nova Score
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of experts combines cutting-edge technology with deep industry knowledge to deliver the most accurate credit scoring system
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Brain, value: '15+', label: 'Years Combined Experience' },
            { icon: Award, value: '50K+', label: 'Successful Predictions' },
            { icon: Code, value: '6', label: 'ML Models Deployed' },
            { icon: Star, value: '4.9/5', label: 'Client Satisfaction' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team Members */}
        <div className="space-y-12">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                {/* Profile Card */}
                <div className="flex-1">
                  <div className={`bg-gradient-to-br ${member.bgColor} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-opacity-20`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 bg-gradient-to-r ${member.color} rounded-xl shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                        <p className={`text-lg font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Core Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {member.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 bg-gradient-to-r ${member.color} rounded-full`}></div>
                            <span className="text-gray-700 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex space-x-3">
                      <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50">
                        <Mail className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50">
                        <Linkedin className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50">
                        <Github className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-1 flex justify-center">
                  <div className={`relative w-80 h-80 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-2xl`}>
                    <div className="absolute inset-4 bg-white/10 rounded-full backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <Icon className="h-32 w-32 text-white/90" />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-10 right-10 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 left-10 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-5 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Values */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-blue-200">The principles that guide our work and innovation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <Award className="h-12 w-12 text-yellow-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Excellence</h3>
              <p className="text-blue-200">We strive for the highest standards in everything we do, from code quality to user experience.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <Brain className="h-12 w-12 text-blue-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p className="text-blue-200">We continuously push the boundaries of what's possible with AI and machine learning.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-xl p-6 mb-4 backdrop-blur-sm">
                <Star className="h-12 w-12 text-green-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Trust</h3>
              <p className="text-blue-200">We build secure, reliable systems that our clients can depend on for critical decisions.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the power of our team's expertise with Nova Score's advanced credit prediction system
          </p>
          <a
            href="/prediction"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Brain className="h-5 w-5" />
            <span>Try Nova Score Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;