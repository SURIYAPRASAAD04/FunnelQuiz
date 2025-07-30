import React from 'react';
import Icon from '../AppIcon';

const QuestionNavigationPanel = ({ 
  questions = [],
  currentQuestion = 1,
  onQuestionSelect,
  className = ""
}) => {
  const getQuestionStatus = (questionIndex) => {
    const question = questions[questionIndex - 1];
    if (!question) return 'unanswered';
    
    if (questionIndex === currentQuestion) return 'current';
    if (question.userAnswer !== undefined && question.userAnswer !== null) return 'answered';
    if (question.visited) return 'visited';
    return 'unanswered';
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'current':
        return 'bg-primary text-primary-foreground border-2 border-primary shadow-lg ring-2 ring-primary/30';
      case 'answered':
        return 'bg-success text-white border-2 border-success/80 hover:bg-success/90';
      case 'visited':
        return 'bg-warning text-white border-2 border-warning/80 hover:bg-warning/90';
      case 'unanswered':
      default:
        return 'bg-white/10 text-muted-foreground border-2 border-white/30 hover:bg-white/20 hover:text-foreground hover:border-white/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return <Icon name="Play" size={12} className="text-primary-foreground" />;
      case 'answered':
        return <Icon name="Check" size={12} className="text-white" />;
      case 'visited':
        return <Icon name="Eye" size={12} className="text-white" />;
      default:
        return null;
    }
  };

  const handleQuestionClick = (questionNumber) => {
    if (onQuestionSelect) {
      onQuestionSelect(questionNumber);
    }
  };

  return (
    <div className={`glass-card p-6 ${className} `}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Question Navigation
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Navigation" size={16} />
          <span>Jump to any question</span>
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-5 gap-3 mb-6">
        {Array.from({ length: questions.length || 15 }, (_, index) => {
          const questionNumber = index + 1;
          const status = getQuestionStatus(questionNumber);
          const statusIcon = getStatusIcon(status);
          
          return (
            <button
              key={questionNumber}
              onClick={() => handleQuestionClick(questionNumber)}
              className={`
                relative flex items-center justify-center h-12 w-full rounded-lg
                transition-all duration-200 ease-out font-bold text-sm
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50
                ${getStatusStyles(status)}
              `}
              aria-label={`Go to question ${questionNumber} - ${status}`}
            >
              <span className="font-mono">{questionNumber}</span>
              {statusIcon && (
                <div className="absolute -top-1 -right-1 bg-white/20 backdrop-blur-sm rounded-full p-1">
                  {statusIcon}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="sm:hidden mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: questions.length || 15 }, (_, index) => {
            const questionNumber = index + 1;
            const status = getQuestionStatus(questionNumber);
            const statusIcon = getStatusIcon(status);
            
            return (
              <button
                key={questionNumber}
                onClick={() => handleQuestionClick(questionNumber)}
                className={`
                  relative flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg
                  transition-all duration-200 ease-out font-bold text-sm
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50
                  ${getStatusStyles(status)}
                `}
                aria-label={`Go to question ${questionNumber} - ${status}`}
              >
                <span className="font-mono text-xs">{questionNumber}</span>
                {statusIcon && (
                  <div className="absolute -top-1 -right-1 bg-white/20 backdrop-blur-sm rounded-full p-1">
                    {statusIcon}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 rounded-lg pl-0">
        <div className="hidden sm:grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-3  rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-primary border-2 border-primary flex items-center justify-center flex-shrink-0">
              <Icon name="Play" size={14} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Current</div>
              <div className="text-xs text-muted-foreground">Active question</div>
            </div>
          </div>

          <div className="flex items-center space-x-3  rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-success border-2 border-success/80 flex items-center justify-center flex-shrink-0">
              <Icon name="Check" size={14} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Answered</div>
              <div className="text-xs text-muted-foreground">Response saved</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-lg bg-warning border-2 border-warning/80 flex items-center justify-center flex-shrink-0">
              <Icon name="Eye" size={14} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Visited</div>
              <div className="text-xs text-muted-foreground">Seen but not answered</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 rounded-lg bg-white/5 bottom-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border-2 border-white/30 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Unanswered</div>
              <div className="text-xs text-muted-foreground">Not yet attempted</div>
            </div>
          </div>
        </div>

        <div className="sm:hidden space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Icon name="Play" size={10} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Current</span>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-success flex items-center justify-center">
                <Icon name="Check" size={10} className="text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Answered</span>
            </div>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-warning flex items-center justify-center">
                <Icon name="Eye" size={10} className="text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Visited</span>
            </div>
            <div className="w-2 h-2 bg-warning rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-foreground">Unanswered</span>
            </div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigationPanel;