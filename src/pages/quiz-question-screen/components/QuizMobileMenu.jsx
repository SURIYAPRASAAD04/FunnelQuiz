import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import QuizTimer from './QuizTimer';

const QuizMobileMenu = ({ 
  isOpen = false,
  onClose,
  currentQuestion = 1,
  totalQuestions = 15,
  timeRemaining = 1800,
  onTimeUp,
  onSubmitQuiz,
  onQuestionSelect,
  questions = [],
  className = ""
}) => {
  if (!isOpen) return null;

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
        return 'bg-primary text-primary-foreground border-2 border-primary shadow-lg scale-105';
      case 'answered':
        return 'bg-success text-white border-2 border-success/80';
      case 'visited':
        return 'bg-warning text-white border-2 border-warning/80';
      case 'unanswered':
      default:
        return 'bg-white/10 text-muted-foreground border-2 border-white/30 hover:bg-white/20';
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
    onQuestionSelect?.(questionNumber);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="absolute top-16 left-0 right-0 bottom-0 glass-card rounded-t-2xl animate-slide-up">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Quiz Menu</h3>
            <button
              onClick={onClose}
              className="glass-button p-2 rounded-lg"
              aria-label="Close menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <QuizTimer
              initialTime={1800}
              onTimeUp={onTimeUp}
              isActive={true}
            />
          </div>

          {/* Question Navigation */}
          <div className="flex-1 overflow-y-auto">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Jump to Question
            </h4>
            
            <div className="grid grid-cols-5 gap-3 mb-6">
              {Array.from({ length: totalQuestions }, (_, index) => {
                const questionNumber = index + 1;
                const status = getQuestionStatus(questionNumber);
                const statusIcon = getStatusIcon(status);
                
                return (
                  <button
                    key={questionNumber}
                    onClick={() => handleQuestionClick(questionNumber)}
                    className={`
                      relative h-12 rounded-lg font-medium text-sm transition-all duration-150
                      hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50
                      flex items-center justify-center
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

            {/* Improved Status Legend with proper alignment and visual indicators */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h5 className="text-sm font-medium text-foreground mb-4 text-center">Status Legend</h5>
              <div className="flex flex-col space-y-3">
                {/* Current Status */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-primary border-2 border-primary flex items-center justify-center">
                      <Icon name="Play" size={10} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground font-medium">Current Question</span>
                  </div>
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                </div>

                {/* Answered Status */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-success border-2 border-success/80 flex items-center justify-center">
                      <Icon name="Check" size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-foreground font-medium">Answered</span>
                  </div>
                  <div className="h-3 w-3 bg-success rounded-full"></div>
                </div>

                {/* Visited Status */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-warning border-2 border-warning/80 flex items-center justify-center">
                      <Icon name="Eye" size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-foreground font-medium">Visited</span>
                  </div>
                  <div className="h-3 w-3 bg-warning rounded-full"></div>
                </div>

                {/* Unanswered Status */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-white/10 border-2 border-white/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    </div>
                    <span className="text-sm text-foreground font-medium">Unanswered</span>
                  </div>
                  <div className="h-3 w-3 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-white/20">
            <Button
              variant="warning"
              size="lg"
              fullWidth
              iconName="Send"
              iconPosition="left"
              onClick={onSubmitQuiz}
            >
              Submit Quiz
            </Button>
            
            <Button
              variant="outline"
              size="default"
              fullWidth
              iconName="X"
              iconPosition="left"
              onClick={onClose}
            >
              Close Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMobileMenu;