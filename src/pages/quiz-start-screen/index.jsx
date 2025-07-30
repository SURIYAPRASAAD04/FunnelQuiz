import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import EmailRegistrationForm from './components/EmailRegistrationForm';
import QuizFeatures from './components/QuizFeatures';
import QuizInstructions from './components/QuizInstructions';
import FooterDisclaimer from './components/FooterDisclaimer';
import GlassmorphismContainer from '../../components/ui/GlassmorphismContainer';
import Icon from '../../components/AppIcon';

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const PreFullscreenWarning = ({ onAcknowledge, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Warning Modal */}
      <div className="relative z-10 max-w-md mx-4 sm:max-w-lg">
        <GlassmorphismContainer variant="elevated" className="p-6 sm:p-8">
          <div className="text-center space-y-6">
            {/* Warning Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Icon name="AlertTriangle" size={32} className="text-amber-600" />
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Entering Fullscreen Mode
              </h2>
              <p className="text-sm sm:text-base text-white">
                Important instructions before starting the quiz
              </p>
            </div>
            
            {/* Instructions */}
            <div className="text-left space-y-4 bg-amber-50/80 rounded-lg p-4 border border-amber-200">
              <h3 className="font-semibold text-amber-800 flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                Please ensure the following:
              </h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start gap-2">
                  <Icon name="X" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Close all other browser tabs and applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Turn off notifications and distractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Volume2" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Ensure stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Monitor" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>The quiz will run in fullscreen mode</span>
                </li>
              </ul>
            </div>
            
            {/* Warning Message */}
            <div className="bg-red-50/80 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-red-700 font-medium">
                 Warning: Switching tabs, minimizing the window, or exiting fullscreen 
                will automatically terminate the quiz and submit your current answers.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 
                         rounded-lg font-medium transition-colors duration-200"
              >
                Cancel & Go Back
              </button>
              <button
                onClick={onAcknowledge}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white 
                         rounded-lg font-medium transition-colors duration-200 
                         shadow-lg hover:shadow-xl"
              >
                I Acknowledge & Proceed
              </button>
            </div>
            
            
          </div>
        </GlassmorphismContainer>
      </div>
    </div>
  );
};

const QuizStartScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreFullscreenWarning, setShowPreFullscreenWarning] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);

  const fetchQuizQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15&category=18');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      return data.results.map((question, index) => ({
        id: index + 1,
        type: question.type,
        difficulty: question.difficulty,
        category: question.category,
        question: decodeHTMLEntities(question.question),
        correct_answer: decodeHTMLEntities(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(answer => 
          decodeHTMLEntities(answer)
        ),
        userAnswer: null,
        visited: false
      }));
    } catch (err) {
      console.error('Error fetching questions:', err);
      throw err;
    }
  };

  const handleStartQuiz = async (userData) => {
    try {
      if (!userData?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (!userData?.name || userData.name.trim().length < 2) {
        throw new Error('Please enter a name with at least 2 characters');
      }

      setPendingUserData(userData);
      setShowPreFullscreenWarning(true);
    } catch (err) {
      setError(err.message || 'Please check your details and try again.');
    }
  };

  const handlePreFullscreenAcknowledge = async () => {
    setIsLoading(true);
    setError('');
    setShowPreFullscreenWarning(false);

    try {
      const questions = await fetchQuizQuestions();
      
      // Clear any existing quiz data
      localStorage.removeItem('quizProgress');
      localStorage.removeItem('quizResults');
      
      const quizData = {
        questions,
        currentQuestion: 1,
        timeRemaining: 1800,
        startedAt: new Date().toISOString(),
        userEmail: pendingUserData.email,
        userName: pendingUserData.name,
        needsFullscreen: true // Flag to trigger fullscreen on next page
      };
      
      localStorage.setItem('quizProgress', JSON.stringify(quizData));
      localStorage.setItem('userInfo', JSON.stringify({
        name: pendingUserData.name,
        email: pendingUserData.email
      }));
      
      navigate('/quiz-question-screen');
    } catch (err) {
      setError(err.message || 'Failed to start quiz. Please try again.');
      console.error('Error starting quiz:', err);
      setPendingUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreFullscreenCancel = () => {
    setShowPreFullscreenWarning(false);
    setPendingUserData(null);
    setError('');
  };

  useEffect(() => {
    const existingData = localStorage.getItem('quizProgress');
    if (existingData) {
      try {
        const data = JSON.parse(existingData);
        const startedAt = new Date(data.startedAt);
        const hoursSinceStart = (Date.now() - startedAt) / (1000 * 60 * 60);
        
        if (hoursSinceStart < 2) {
          if (window.confirm('You have an unfinished quiz. Would you like to continue?')) {
            navigate('/quiz-question-screen');
          } else {
            localStorage.removeItem('quizProgress');
          }
        } else {
          localStorage.removeItem('quizProgress');
        }
      } catch (e) {
        console.error('Error parsing quiz data:', e);
        localStorage.removeItem('quizProgress');
      }
    }
  }, [navigate]);

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-4 transition-all duration-300 ${showPreFullscreenWarning ? 'blur-sm' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <GlassmorphismContainer variant="elevated" size="full" className="mb-6 sm:mb-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-6 sm:space-y-8">
                <WelcomeHeader />
                
                <EmailRegistrationForm 
                  onStartQuiz={handleStartQuiz}
                  isLoading={isLoading}
                />

                {error && (
                  <div className="glass-card p-4 border-error/30 bg-error/10">
                    <div className="flex items-center space-x-2 text-error">
                      <Icon name="AlertCircle" size={16} />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6 sm:space-y-8">
                <QuizInstructions />
              </div>
            </div>
          </GlassmorphismContainer>

          <div className="mb-6 sm:mb-8">
            <GlassmorphismContainer variant="elevated" size="full">
              <QuizFeatures />
            </GlassmorphismContainer>
          </div>

          <FooterDisclaimer />
        </div>
      </div>

      {/* Pre-Fullscreen Warning Modal */}
      {showPreFullscreenWarning && (
        <PreFullscreenWarning
          onAcknowledge={handlePreFullscreenAcknowledge}
          onCancel={handlePreFullscreenCancel}
        />
      )}
    </>
  );
};

export default QuizStartScreen;