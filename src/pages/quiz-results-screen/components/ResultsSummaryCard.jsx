import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsSummaryCard = ({ 
  score = 0, 
  totalQuestions = 15, 
  timeSpent = 0,  
  accuracy = 0 
}) => {
  const formatTime = (seconds) => {
    const secs = Number(seconds) || 0;
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    if (accuracy >= 80) return 'text-success';
    if (accuracy >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Excellent work! Outstanding performance!";
    if (accuracy >= 80) return "Great job! You did very well!";
    if (accuracy >= 70) return "Good work! Room for improvement.";
    if (accuracy >= 60) return "Not bad! Keep practicing.";
    return "Keep trying! Practice makes perfect.";
  };

  const getPerformanceIcon = () => {
    if (accuracy >= 80) return "Trophy";
    if (accuracy >= 60) return "Award";
    return "Target";
  };

  const isFastCompletion = timeSpent < 1200; 

  return (
    <div className="glass-card p-6 mb-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary">
          <Icon name={getPerformanceIcon()} size={32} color="white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Quiz Complete!
        </h1>
        <p className="text-muted-foreground">
          {getPerformanceMessage()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="CheckCircle" size={20} className="text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Score</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {score}/{totalQuestions}
          </div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Target" size={20} className="text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {accuracy}%
          </div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Clock" size={20} className="text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Time</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatTime(timeSpent)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-foreground">{accuracy}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              accuracy >= 80 ? 'bg-gradient-to-r from-success to-success/80' :
              accuracy >= 60 ? 'bg-gradient-to-r from-warning to-warning/80': 'bg-gradient-to-r from-error to-error/80'
            }`}
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {accuracy === 100 && (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-success/20 border border-success/30">
            <Icon name="Crown" size={16} color="var(--color-success)" />
            <span className="text-xs font-medium text-success">Perfect Score</span>
          </div>
        )}
        {accuracy >= 80 && (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
            <Icon name="Star" size={16} color="var(--color-primary)" />
            <span className="text-xs font-medium text-primary">High Achiever</span>
          </div>
        )}
        {isFastCompletion && (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30">
            <Icon name="Zap" size={16} color="var(--color-secondary)" />
            <span className="text-xs font-medium text-secondary">Speed Demon</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSummaryCard;