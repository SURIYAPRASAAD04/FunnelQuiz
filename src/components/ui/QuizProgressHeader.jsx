import React from 'react';
import Icon from '../AppIcon';

const QuizProgressHeader = ({ 
  currentQuestion = 1, 
  totalQuestions = 15, 
  timeRemaining = 1800, 
  onMenuToggle,
  showMenu = false 
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const isTimeWarning = timeRemaining <= 300; 
  const isTimeCritical = timeRemaining <= 60; 

  return (
    <header className="fixed top-0 left-0 right-0 z-100 glass-card border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon name="Brain" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FunnelQuiz
              </h1>
            </div>
          </div>

          {/* Progress Section - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-muted-foreground">
                Question
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-medium text-lg text-foreground">
                  {currentQuestion}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="font-mono text-muted-foreground">
                  {totalQuestions}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Timer and Mobile Progress */}
          <div className="flex items-center space-x-4">
            {/* Mobile Progress */}
            <div className="md:hidden flex items-center space-x-2">
              <span className="font-mono text-sm font-medium">
                {currentQuestion}/{totalQuestions}
              </span>
            </div>

            {/* Timer */}
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg glass transition-colors duration-150 ${
              isTimeCritical 
                ? 'bg-error/20 border-error/30' 
                : isTimeWarning 
                  ? 'bg-warning/20 border-warning/30' :'bg-white/10 border-white/20'
            }`}>
              <Icon 
                name="Clock" 
                size={18} 
                color={isTimeCritical ? 'var(--color-error)' : isTimeWarning ? 'var(--color-warning)' : 'var(--color-primary)'} 
              />
              <span className={`font-mono font-medium ${
                isTimeCritical 
                  ? 'text-error' 
                  : isTimeWarning 
                    ? 'text-warning' :'text-foreground'
              }`}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onMenuToggle}
              className="md:hidden glass-button p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              <Icon name={showMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden pb-3">
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default QuizProgressHeader;