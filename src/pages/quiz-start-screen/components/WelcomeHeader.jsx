import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ className = "" }) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      {/* App Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
          <Icon name="Brain" size={32} color="white" strokeWidth={2.5} />
        </div>
      </div>

      {/* App Title */}
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
        FunnelQuiz
      </h1>

      {/* Welcome Message */}
      <div className="space-y-3">
        <p className="text-lg text-foreground font-medium">
          Welcome to the Ultimate Trivia Experience
        </p>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Test your knowledge with 15 carefully curated questions. You'll have 30 minutes to complete the quiz and see how you stack up!
        </p>
      </div>

      {/* Quiz Info Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto">
        <div className="glass-card p-4 text-center">
          <Icon name="Clock" size={20} color="var(--color-primary)" className="mx-auto mb-2" />
          <div className="text-sm font-medium text-foreground">30 Minutes</div>
          <div className="text-xs text-muted-foreground">Time Limit</div>
        </div>
        <div className="glass-card p-4 text-center">
          <Icon name="HelpCircle" size={20} color="var(--color-secondary)" className="mx-auto mb-2" />
          <div className="text-sm font-medium text-foreground">15 Questions</div>
          <div className="text-xs text-muted-foreground">Mixed Topics</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;