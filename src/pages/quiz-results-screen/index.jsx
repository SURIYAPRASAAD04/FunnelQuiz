import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ResultsSummaryCard from './components/ResultsSummaryCard';
import QuestionReviewCard from './components/QuestionReviewCard';
import ResultsActionPanel from './components/ResultsActionPanel';
import ScrollToTopButton from './components/ScrollToTopButton';
import FooterDisclaimer from '../quiz-start-screen/components/FooterDisclaimer';
import Icon from '../../components/AppIcon';
import GlassmorphismContainer from '../../components/ui/GlassmorphismContainer';

const UserInfoCard = ({ userName, userEmail }) => {
  return (
    <div className="glass-card p-4 sm:p-6 mb-6 animate-fade-in">
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary">
            <Icon name="User" size={20} color="white" strokeWidth={2} />
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 border border-success/30">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" strokeWidth={2} />
          </div>
        </div>
        
        {/* User details stacked */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">
            {userName || 'Quiz Taker'}
          </h3>
          <div className="flex items-start">
            <Icon name="Mail" size={14} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground break-all">
              {userEmail || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= sm) */}
      <div className="hidden sm:flex sm:items-center sm:space-x-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary">
          <Icon name="User" size={32} color="white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground mb-2">
            {userName || 'Quiz Taker'}
          </h3>
          <p className="text-muted-foreground flex items-center">
            <Icon name="Mail" size={16} className="text-primary mr-2 flex-shrink-0" />
            <span className="truncate">
              {userEmail || 'Not provided'}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/20 border border-success/30">
          <Icon name="CheckCircle" size={24} color="var(--color-success)" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

const QuizResultsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [showAllExpanded, setShowAllExpanded] = useState(false);
  const [results, setResults] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const disableBackNavigation = () => {
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, null, window.location.pathname);
      });
    };

    disableBackNavigation();

    return () => {
      window.removeEventListener('popstate', () => {
        window.history.pushState(null, null, window.location.pathname);
      });
    };
  }, []);

  useEffect(() => {
    const loadResults = () => {
      try {
        if (location.state?.results) {
          setResults(location.state.results);
          if (location.state?.userInfo) {
            setUserInfo(location.state.userInfo);
          }
          return;
        }

        const savedResults = localStorage.getItem('quizResults');
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults);
          setResults(parsedResults);
          
          const savedUserInfo = localStorage.getItem('userInfo');
          if (savedUserInfo) {
            const parsedUserInfo = JSON.parse(savedUserInfo);
            setUserInfo(parsedUserInfo);
          }
          return;
        }

        navigate('/quiz-start-screen');
      } catch (error) {
        console.error('Error loading results:', error);
        navigate('/quiz-start-screen');
      }
    };

    loadResults();
  }, [location.state, navigate]);

  const calculateScore = (questions) => {
    return questions.filter(q => q.userAnswer === q.correct_answer).length;
  };

  const formatCompletionTime = (isoString) => {
    if (!isoString) return 'Just now';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const processResults = (rawResults) => {
    if (!rawResults) return null;
    
    const score = calculateScore(rawResults.questions);
    const totalQuestions = rawResults.questions.length;
    const accuracy = Math.round((score / totalQuestions) * 100);
    const timeSpent = typeof rawResults.timeSpent === 'number' ? rawResults.timeSpent : 0;
    const completionTime = formatCompletionTime(rawResults.completedAt);

    return {
      score,
      totalQuestions,
      accuracy,
      timeSpent,
      completionTime,
      questions: rawResults.questions.map((q, index) => ({
        id: q.id || index + 1,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        correctAnswer: q.correct_answer,
        userAnswer: q.userAnswer,
        allOptions: q.type === 'boolean' ? 
          ['True', 'False'] : 
          [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        isCorrect: q.userAnswer === q.correct_answer
      }))
    };
  };

  const quizResults = processResults(results);

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleAllQuestions = () => {
    if (showAllExpanded) {
      setExpandedQuestions(new Set());
    } else {
      setExpandedQuestions(new Set(quizResults?.questions.map(q => q.id) || []));
    }
    setShowAllExpanded(!showAllExpanded);
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz-start-screen', { state: { retake: true } });
  };

  const handleNewQuiz = () => {
    navigate('/quiz-start-screen');
  };

  if (!quizResults) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <GlassmorphismContainer variant="elevated" className="p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-lg sm:text-xl font-bold text-indigo-600 mb-2">Loading Results</h2>
            <p className="text-sm sm:text-base text-gray-600">Please wait while we prepare your quiz results...</p>
          </GlassmorphismContainer>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quiz Results - FunnelQuiz</title>
        <meta name="description" content="Review your quiz performance and see detailed results for each question." />
      </Helmet>

      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Mobile-responsive header */}
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md">
                  <Icon name="Award" size={24} color="white" strokeWidth={2} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Quiz Results
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Completed: {quizResults.completionTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end sm:justify-start">
                <button
                  onClick={toggleAllQuestions}
                  className="glass-button px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium flex items-center hover:bg-white/20 transition-colors duration-150"
                >
                  <Icon 
                    name={showAllExpanded ? "Minimize2" : "Maximize2"} 
                    size={14} 
                    className="mr-2 sm:w-4 sm:h-4" 
                  />
                  <span className="hidden sm:inline">
                    {showAllExpanded ? "Collapse All" : "Expand All"}
                  </span>
                  <span className="sm:hidden">
                    {showAllExpanded ? "Collapse" : "Expand"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <UserInfoCard 
            userName={userInfo.name} 
            userEmail={userInfo.email} 
          />

          <ResultsSummaryCard
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            timeSpent={quizResults.timeSpent}
            accuracy={quizResults.accuracy}
            className="mb-6 sm:mb-8"
          />

          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
              <Icon name="List" className="mr-2" size={18} />
              <span>Question Review</span>
              <span className="ml-auto text-xs sm:text-sm font-normal text-muted-foreground">
                {quizResults.questions.length} questions
              </span>
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {quizResults.questions.map((question, index) => (
                <QuestionReviewCard
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  isExpanded={expandedQuestions.has(question.id)}
                  onToggle={() => toggleQuestion(question.id)}
                />
              ))}
            </div>
          </div>

          <ResultsActionPanel
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            accuracy={quizResults.accuracy}
            onRetakeQuiz={handleRetakeQuiz}
            onNewQuiz={handleNewQuiz}
          />

          <ScrollToTopButton />

          <div className="mt-6 sm:mt-8">
            <FooterDisclaimer />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultsScreen;