import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizInstructions = ({ className = "" }) => {
  const instructions = [
    {
      step: 1,
      icon: "Play",
      title: "Start Your Quiz",
      description: "Click 'Start Quiz' to begin your 30-minute trivia challenge"
    },
    {
      step: 2,
      icon: "MousePointer",
      title: "Answer Questions",
      description: "Select your answer from multiple choice options for each question"
    },
    {
      step: 3,
      icon: "Navigation",
      title: "Navigate Freely",
      description: "Jump between questions anytime using the navigation panel"
    },
    {
      step: 4,
      icon: "CheckCircle",
      title: "Submit & Review",
      description: "Submit when ready and review your performance with detailed results"
    }
  ];

  const rules = [
    {
      icon: "Clock",
      title: "Auto-Submit on Timeout",
      description: "Quiz automatically submits when the 30-minute timer expires",
      color: "var(--color-warning)"
    },
    {
      icon: "Eye",
      title: "Tab Switching Prohibited",
      description: "Quiz will auto-submit if you switch tabs, press escape, or refresh the page",
      color: "var(--color-error)"
    }
  ];

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Info" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">
          How It Works
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {instructions.map((instruction) => (
          <div key={instruction.step} className="flex items-start space-x-4">
            {/* Step Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
              {instruction.step}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={instruction.icon} 
                  size={16} 
                  color="var(--color-secondary)" 
                />
                <h4 className="text-sm font-medium text-foreground">
                  {instruction.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {instruction.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Rules Section */}
      <div className="border-t border-white/10">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
          <h4 className="text-base font-semibold text-foreground">
            Important Rules
          </h4>
        </div>

        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start space-x-3  rounded-lg bg-white/5 border border-white/10">
              <Icon 
                name={rule.icon} 
                size={16} 
                color={rule.color}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-foreground mb-1">
                  {rule.title}
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timer Warning */}
      <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
        <div className="flex items-start space-x-2">
          <Icon name="Clock" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning mb-1">
              Time Management Tip
            </p>
            <p className="text-xs text-muted-foreground">
              You have 30 minutes total. That's about 2 minutes per question. Stay focused and avoid any actions that might trigger auto-submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;