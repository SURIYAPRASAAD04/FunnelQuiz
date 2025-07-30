import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizFeatures = ({ className = "" }) => {
  const features = [
    {
      icon: "Shuffle",
      title: "Randomized Questions",
      description: "Fresh questions from OpenTDB API every time"
    },
    {
      icon: "Navigation",
      title: "Easy Navigation",
      description: "Jump to any question with visual progress tracking"
    },
    {
      icon: "BarChart3",
      title: "Detailed Results",
      description: "See correct answers and track your performance"
    },
    {
      icon: "Smartphone",
      title: "Mobile Optimized",
      description: "Perfect experience across all devices"
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground text-center mb-4">
        What Makes FunnelQuiz Special?
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="glass-card p-4 hover:bg-white/20 transition-all duration-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Icon 
                  name={feature.icon} 
                  size={16} 
                  color="var(--color-primary)" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizFeatures;