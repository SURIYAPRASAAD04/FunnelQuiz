import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import QuizStartScreen from "pages/quiz-start-screen";
import QuizQuestionScreen from "pages/quiz-question-screen";
import QuizResultsScreen from "pages/quiz-results-screen";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<QuizStartScreen />} />
        <Route path="/quiz-start-screen" element={<QuizStartScreen />} />
        <Route path="/quiz-question-screen" element={<QuizQuestionScreen />} />
        <Route path="/quiz-results-screen" element={<QuizResultsScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;