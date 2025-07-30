import React, { useMemo } from 'react';
import GlassmorphismContainer from '../../../components/ui/GlassmorphismContainer';

const QuestionDisplay = ({ 
  question = {},
  currentQuestionNumber = 1,
  totalQuestions = 15,
  selectedAnswer = null,
  onAnswerSelect,
  className = ""
}) => {
  const { question: questionText, correct_answer, incorrect_answers = [], type, difficulty, category } = question;
  
  const allAnswers = React.useMemo(() => {
    if (!correct_answer || !incorrect_answers.length) return [];
    
    const answers = [correct_answer, ...incorrect_answers];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }, [correct_answer, incorrect_answers]);

  const handleAnswerClick = (answer) => {
    if (onAnswerSelect) {
      onAnswerSelect(answer);
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Question Header */}
      <GlassmorphismContainer variant="elevated" className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
              {category || 'General Knowledge'}
            </span>
            <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium capitalize">
              {difficulty || 'medium'}
            </span>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionNumber} of {totalQuestions}
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
          {decodeHtml(questionText || 'Loading question...')}
        </h2>
      </GlassmorphismContainer>

      {/* Answer Options */}
      <div className="space-y-3">
        {allAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const optionLabel = String.fromCharCode(65 + index); 
          
          return (
            <button
              key={`${answer}-${index}`}
              onClick={() => handleAnswerClick(answer)}
              className={`
                w-full p-4 md:p-6 rounded-xl border-2 text-left transition-all duration-200 ease-out
                hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50
                ${isSelected 
                  ? 'bg-primary/20 border-primary text-primary shadow-lg' 
                  : 'glass-card border-white/20 hover:border-white/30 hover:bg-white/20'
                }
              `}
              aria-label={`Option ${optionLabel}: ${decodeHtml(answer)}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                  ${isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white/20 text-muted-foreground'
                  }
                `}>
                  {optionLabel}
                </div>
                <div className="flex-1 text-base md:text-lg font-medium">
                  {decodeHtml(answer)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Question Type Indicator */}
      {type && (
        <div className="flex justify-center">
          <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-white/10">
            {type === 'boolean' ? 'True/False' : 'Multiple Choice'}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;