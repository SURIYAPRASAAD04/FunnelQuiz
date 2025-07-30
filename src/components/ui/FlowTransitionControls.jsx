import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const FlowTransitionControls = ({ 
  currentScreen = 'start',
  currentQuestion = 1,
  totalQuestions = 15,
  canGoNext = true,
  canGoPrevious = true,
  isLoading = false,
  onStartQuiz,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitQuiz,
  onRetakeQuiz,
  onGoHome,
  className = ""
}) => {
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.warn('Could not exit full screen:', err);
      });
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else if (document.msFullscreenElement) {
      document.msExitFullscreen();
    }
  };

  const handleSubmitClick = () => {
    if (currentQuestion < totalQuestions) {
      setShowSubmitConfirm(true);
    } else {
      exitFullScreen();
      onSubmitQuiz?.();
    }
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    exitFullScreen();
    onSubmitQuiz?.();
  };

  const handleCancelSubmit = () => {
    setShowSubmitConfirm(false);
  };


  if (currentScreen === 'start') {
    return (
      <div className={`glass-card p-4 sm:p-6 ${className}`}>
        <div className="flex flex-col space-y-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="Play"
            iconPosition="left"
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 min-h-[48px] sm:min-h-[52px]"
          >
            Start Quiz
          </Button>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>30 minutes • 15 questions</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'question') {
    return (
      <>
        <div className={`glass-card p-4 sm:p-6 ${className}`}>
          {/* Mobile Layout - Stack all buttons vertically */}
          <div className="flex flex-col gap-3 sm:hidden">
            {/* Next/Submit Button - Primary action first on mobile */}
            {currentQuestion < totalQuestions ? (
              <Button
                variant="default"
                size="lg"
                disabled={!canGoNext || isLoading}
                loading={isLoading}
                iconName="ChevronRight"
                iconPosition="right"
                onClick={onNextQuestion}
                className="w-full min-h-[48px]"
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="success"
                size="lg"
                disabled={isLoading}
                loading={isLoading}
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handleSubmitClick}
                className="w-full min-h-[48px]"
              >
                Submit Quiz
              </Button>
            )}

            {/* Previous Button */}
            <Button
              variant="outline"
              size="lg"
              disabled={!canGoPrevious || isLoading}
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={onPreviousQuestion}
              className="w-full min-h-[48px]"
            >
              Previous
            </Button>

            {/* Early Submit Button */}
            {currentQuestion < totalQuestions && (
              <Button
                variant="ghost"
                size="lg"
                disabled={isLoading}
                iconName="Send"
                iconPosition="left"
                onClick={handleSubmitClick}
                className="w-full min-h-[48px] mt-2 border border-dashed border-muted-foreground/30"
              >
                Submit Early
              </Button>
            )}
          </div>

          {/* Desktop/Tablet Layout - Horizontal layout */}
          <div className="hidden sm:flex flex-row gap-4">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="lg"
              disabled={!canGoPrevious || isLoading}
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={onPreviousQuestion}
              className="min-w-[120px]"
            >
              Previous
            </Button>

            {/* Next/Submit Button */}
            {currentQuestion < totalQuestions ? (
              <Button
                variant="default"
                size="lg"
                disabled={!canGoNext || isLoading}
                loading={isLoading}
                iconName="ChevronRight"
                iconPosition="right"
                onClick={onNextQuestion}
                className="flex-1 min-w-[140px]"
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="success"
                size="lg"
                disabled={isLoading}
                loading={isLoading}
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handleSubmitClick}
                className="flex-1 min-w-[140px]"
              >
                Submit Quiz
              </Button>
            )}

            {/* Early Submit Button */}
            {currentQuestion < totalQuestions && (
              <Button
                variant="ghost"
                size="lg"
                disabled={isLoading}
                iconName="Send"
                iconPosition="left"
                onClick={handleSubmitClick}
                className="min-w-[120px]"
              >
                Submit Early
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="BarChart3" size={16} />
            <span className="text-center">
              Question {currentQuestion} of {totalQuestions} 
              <span className="hidden xs:inline">
                ({Math.round((currentQuestion / totalQuestions) * 100)}% complete)
              </span>
            </span>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass-card p-4 sm:p-6 max-w-md w-full animate-scale-in mx-4">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground text-white">
                    Submit Quiz Early?
                  </h3>
                  <p className="text-sm text-muted-foreground text-white">
                    You still have {totalQuestions - currentQuestion} questions remaining.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 text-white">
                Are you sure you want to submit your quiz now? You won't be able to change your answers after submission.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 sm:gap-0">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleCancelSubmit}
                  className="w-full sm:flex-1 min-h-[44px]"
                >
                  Continue Quiz
                </Button>
                <Button
                  variant="warning"
                  size="default"
                  onClick={handleConfirmSubmit}
                  iconName="Send"
                  iconPosition="left"
                  className="w-full sm:flex-1 min-h-[44px]"
                >
                  Submit Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (currentScreen === 'results') {
    return (
      <div className={`glass-card p-4 sm:p-6 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRetakeQuiz}
            className="w-full sm:flex-1 min-h-[48px] sm:min-h-[52px]"
          >
            Retake Quiz
          </Button>
          
          <Button
            variant="default"
            size="lg"
            iconName="Home"
            iconPosition="left"
            onClick={onGoHome}
            className="w-full sm:flex-1 min-h-[48px] sm:min-h-[52px]"
          >
            New Quiz
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Trophy" size={16} />
          <span className="text-center">Quiz completed successfully!</span>
        </div>
      </div>
    );
  }

  return null;
};

export default FlowTransitionControls;