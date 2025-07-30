import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuestionReviewCard = ({ 
  question = {}, 
  questionNumber = 1, 
  isExpanded = false, 
  onToggle 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (onToggle) {
      setIsAnimating(true);
      onToggle();
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const isCorrect = question.userAnswer === question.correctAnswer;
  
  const getStatusIcon = () => {
    if (question.userAnswer === null || question.userAnswer === undefined) {
      return { name: "Minus", color: "var(--color-muted-foreground)" };
    }
    return isCorrect 
      ? { name: "CheckCircle", color: "var(--color-success)" }
      : { name: "XCircle", color: "var(--color-error)" };
  };

  const statusIcon = getStatusIcon();

  const formatAnswerText = (answer) => {
    if (!answer) return "Not answered";
    const textarea = document.createElement('textarea');
    textarea.innerHTML = answer;
    return textarea.value;
  };

  const formatQuestionText = (text) => {
    if (!text) return "";
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  return (
    <div className={`glass-card transition-all duration-300 ${isAnimating ? 'scale-[0.98]' : 'scale-100'}`}>
      {/* Question Header */}
      <button
        onClick={handleToggle}
        className="w-full p-4 text-left hover:bg-white/5 transition-colors duration-150 rounded-t-xl"
        aria-expanded={isExpanded}
        aria-controls={`question-${questionNumber}-content`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{questionNumber}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                Question {questionNumber}
              </h3>
              <p className="text-xs text-muted-foreground">
                {question.category || "General Knowledge"} • {question.difficulty || "Medium"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon 
              name={statusIcon.name} 
              size={20} 
              color={statusIcon.color} 
            />
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground transition-transform duration-200"
            />
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div 
          id={`question-${questionNumber}-content`}
          className="px-4 pb-4 animate-slide-up"
        >
          <div className="border-t border-white/10 pt-4">
            {/* Question Text */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Question:</h4>
              <p className="text-foreground leading-relaxed">
                {formatQuestionText(question.question)}
              </p>
            </div>

            {/* Answer Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* User Answer */}
              <div className="glass-card p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Your Answer</span>
                </div>
                <div className={`p-3 rounded-lg border-2 ${
                  question.userAnswer === null || question.userAnswer === undefined
                    ? 'bg-muted/20 border-muted/30 text-muted-foreground'
                    : isCorrect 
                      ? 'bg-success/10 border-success/30 text-success' :'bg-error/10 border-error/30 text-error'
                }`}>
                  <p className="text-sm font-medium">
                    {formatAnswerText(question.userAnswer)}
                  </p>
                </div>
              </div>

              {/* Correct Answer */}
              <div className="glass-card p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-muted-foreground">Correct Answer</span>
                </div>
                <div className="p-3 rounded-lg border-2 bg-success/10 border-success/30">
                  <p className="text-sm font-medium text-success">
                    {formatAnswerText(question.correctAnswer)}
                  </p>
                </div>
              </div>
            </div>

            {/* All Options (if available) */}
            {question.allOptions && question.allOptions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">All Options:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {question.allOptions.map((option, index) => {
                    const isUserChoice = option === question.userAnswer;
                    const isCorrectChoice = option === question.correctAnswer;
                    
                    return (
                      <div
                        key={index}
                        className={`p-2 rounded-lg border text-sm ${
                          isCorrectChoice
                            ? 'bg-success/10 border-success/30 text-success'
                            : isUserChoice && !isCorrectChoice
                              ? 'bg-error/10 border-error/30 text-error' :'bg-white/5 border-white/10 text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {isCorrectChoice && <Icon name="Check" size={14} />}
                          {isUserChoice && !isCorrectChoice && <Icon name="X" size={14} />}
                          <span>{formatAnswerText(option)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Explanation (if available) */}
            {question.explanation && (
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Lightbulb" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Explanation</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewCard;