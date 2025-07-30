import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResultsActionPanel = ({ 
  score = 0, 
  totalQuestions = 15, 
  accuracy = 0,
  onRetakeQuiz,
  onNewQuiz 
}) => {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleRetakeQuiz = () => {
    if (onRetakeQuiz) {
      onRetakeQuiz();
    } else {
      navigate('/quiz-start-screen');
    }
  };

  const handleNewQuiz = () => {
    if (onNewQuiz) {
      onNewQuiz();
    } else {
      navigate('/quiz-start-screen');
    }
  };

  const handleShareResults = async () => {
    setIsSharing(true);

    const shareText = `I just completed a FunnelQuiz and scored ${score}/${totalQuestions} (${accuracy}%)! 🎯\n\nTry it yourself at FunnelQuiz!`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My FunnelQuiz Results',
          text: shareText,
          url: window.location.origin
        });
        setShareSuccess(true);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
      }
    } catch (error) {
      console.log('Sharing failed:', error);
    } finally {
      setIsSharing(false);
      if (shareSuccess) {
        setTimeout(() => setShareSuccess(false), 3000);
      }
    }
  };

  const handleDownloadResults = () => {
    const resultsData = {
      score: `${score}/${totalQuestions}`,
      accuracy: `${accuracy}%`,
      completedAt: new Date().toLocaleDateString(),
      quiz: 'FunnelQuiz Trivia'
    };

    const dataStr = JSON.stringify(resultsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          What's Next?
        </h3>
        <p className="text-sm text-muted-foreground">
          Continue your learning journey or challenge yourself again
        </p>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="RotateCcw"
          iconPosition="left"
          onClick={handleRetakeQuiz}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          Retake Quiz
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={handleNewQuiz}
        >
          New Quiz
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="ghost"
          size="default"
          fullWidth
          iconName="Share2"
          iconPosition="left"
          loading={isSharing}
          onClick={handleShareResults}
          className={shareSuccess ? 'text-success' : ''}
        >
          {shareSuccess ? 'Shared!' : 'Share Results'}
        </Button>
        
        <Button
          variant="ghost"
          size="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
          onClick={handleDownloadResults}
        >
          Download Results
        </Button>
      </div>

      {/* Performance Insights */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          Performance Insights
        </h4>
        
        <div className="space-y-2">
          {accuracy >= 90 && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="TrendingUp" size={16} />
              <span>Exceptional performance! You're a trivia master!</span>
            </div>
          )}
          
          {accuracy >= 70 && accuracy < 90 && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <Icon name="Target" size={16} />
              <span>Great job! A few more correct answers for excellence.</span>
            </div>
          )}
          
          {accuracy >= 50 && accuracy < 70 && (
            <div className="flex items-center space-x-2 text-sm text-warning">
              <Icon name="BookOpen" size={16} />
              <span>Good effort! More practice will improve your score.</span>
            </div>
          )}
          
          {accuracy < 50 && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="RefreshCw" size={16} />
              <span>Keep trying! Every attempt makes you better.</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{totalQuestions - score}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsActionPanel;