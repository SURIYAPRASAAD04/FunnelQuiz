import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizProgressHeader from '../../components/ui/QuizProgressHeader';
import QuestionNavigationPanel from '../../components/ui/QuestionNavigationPanel';
import FlowTransitionControls from '../../components/ui/FlowTransitionControls';
import GlassmorphismContainer from '../../components/ui/GlassmorphismContainer';
import QuestionDisplay from './components/QuestionDisplay';
import QuizTimer from './components/QuizTimer';
import QuizMobileMenu from './components/QuizMobileMenu';

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const QuizQuestionScreen = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Fullscreen error:', err));
    }
  };

  const terminateQuiz = (reason) => {
    const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || {});
    const results = {
      questions: questions.map(q => ({
        ...q,
        userAnswer: q.userAnswer || null
      })),
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent || (1800 - timeRemaining),
      totalQuestions: questions.length,
      terminated: true,
      terminationReason: reason,
      userName: quizProgress.userName,
      userEmail: quizProgress.userEmail
    };
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    localStorage.removeItem('quizProgress');
    navigate('/quiz-results-screen');
  };

  const handleBeforeUnload = useCallback((e) => {
    terminateQuiz('Page refresh/close during quiz');
    e.preventDefault();
    return e.returnValue = 'Are you sure you want to leave? Your quiz will be submitted.';
  }, [questions, timeRemaining, timeSpent]);

  const handlePopState = useCallback(() => {
    terminateQuiz('Attempted navigation during quiz');
    window.history.pushState(null, null, window.location.pathname);
  }, [questions, timeRemaining, timeSpent]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) terminateQuiz('Switched tabs/windows during quiz');
  }, [questions, timeRemaining, timeSpent]);

  useEffect(() => {
    enterFullscreen();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        terminateQuiz('Exited fullscreen mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleBeforeUnload, handlePopState, handleVisibilityChange]);

  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const savedProgress = localStorage.getItem('quizProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress.questions?.length > 0) {
          setQuestions(progress.questions);
          setCurrentQuestion(progress.currentQuestion || 1);
          setTimeRemaining(progress.timeRemaining || 1800);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch('https://opentdb.com/api.php?amount=15&category=18');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.response_code !== 0) throw new Error('API returned error code');
      
      const formattedQuestions = data.results.map((question, index) => ({
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
        visited: index === 0
      }));

      setQuestions(formattedQuestions);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      const progress = {
        questions,
        currentQuestion,
        timeRemaining,
        timestamp: Date.now()
      };
      localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
  }, [questions, currentQuestion, timeRemaining]);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestions(prev => prev.map((q, index) => 
        index === currentQuestion - 1 ? { ...q, visited: true } : q
      ));
    }
  }, [currentQuestion, questions.length]);

  const handleAnswerSelect = (answer) => {
    setQuestions(prev => prev.map((q, index) => 
      index === currentQuestion - 1 ? { ...q, userAnswer: answer } : q
    ));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber);
  };

  const handleTimeUp = () => {
    const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || {});
    const results = {
      questions,
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent || 1800,
      totalQuestions: questions.length,
      terminated: true,
      terminationReason: 'timeUp',
      userName: quizProgress.userName,
      userEmail: quizProgress.userEmail
    };
    localStorage.setItem('quizResults', JSON.stringify(results));
    localStorage.removeItem('quizProgress');
    navigate('/quiz-results-screen');
  };

  const handleSubmitQuiz = () => {
    setIsLoading(true);
    const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || {});
    const results = {
      questions,
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent || (1800 - timeRemaining),
      totalQuestions: questions.length,
      terminated: false,
      userName: quizProgress.userName,
      userEmail: quizProgress.userEmail
    };
    localStorage.setItem('quizResults', JSON.stringify(results));
    localStorage.removeItem('quizProgress');
    navigate('/quiz-results-screen');
  };

  const handleMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    fetchQuestions();
  };

  if (!isFullscreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Fullscreen Required</h2>
          <p className="text-gray-700 mb-4">The quiz must be taken in fullscreen mode. Please click below to continue.</p>
          <button 
            onClick={enterFullscreen}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Enter Fullscreen Now
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-lg font-medium text-indigo-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
            <button 
              onClick={() => terminateQuiz('User chose to go home')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mb-4">
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No Questions Available</h2>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <QuizProgressHeader
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        onMenuToggle={handleMenuToggle}
        showMenu={showMobileMenu}
      />

      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <QuestionDisplay
                question={currentQuestionData}
                currentQuestionNumber={currentQuestion}
                totalQuestions={questions.length}
                selectedAnswer={currentQuestionData?.userAnswer}
                onAnswerSelect={handleAnswerSelect}
              />

              <div className="lg:hidden">
                <GlassmorphismContainer variant="minimal">
                  <QuizTimer
                    initialTime={1800}
                    timeRemaining={timeRemaining}
                    setTimeRemaining={setTimeRemaining}
                    onTimeUp={handleTimeUp}
                    isActive={!isLoading}
                    setTimeSpent={setTimeSpent}
                  />
                </GlassmorphismContainer>
              </div>

              <FlowTransitionControls
                currentScreen="question"
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                canGoNext={currentQuestion < questions.length}
                canGoPrevious={currentQuestion > 1}
                isLoading={isLoading}
                onNextQuestion={handleNextQuestion}
                onPreviousQuestion={handlePreviousQuestion}
                onSubmitQuiz={handleSubmitQuiz}
              />
            </div>

            <div className="hidden lg:block space-y-6">
              <QuizTimer
                initialTime={1800}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                onTimeUp={handleTimeUp}
                isActive={!isLoading}
                setTimeSpent={setTimeSpent}
              />

              <QuestionNavigationPanel
                questions={questions}
                currentQuestion={currentQuestion}
                onQuestionSelect={handleQuestionSelect}
              />

              <GlassmorphismContainer variant="minimal" className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Progress Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Answered:</span>
                    <span className="font-medium text-green-600">
                      {questions.filter(q => q.userAnswer !== null).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Visited:</span>
                    <span className="font-medium text-yellow-600">
                      {questions.filter(q => q.visited && q.userAnswer === null).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-medium text-gray-600">
                      {questions.filter(q => !q.visited).length}
                    </span>
                  </div>
                </div>
              </GlassmorphismContainer>
            </div>
          </div>
        </div>
      </div>

      <QuizMobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        onTimeUp={handleTimeUp}
        onSubmitQuiz={handleSubmitQuiz}
        onQuestionSelect={handleQuestionSelect}
        questions={questions}
      />
    </div>
  );
};

export default QuizQuestionScreen;