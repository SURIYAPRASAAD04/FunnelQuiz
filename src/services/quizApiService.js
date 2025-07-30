
export const fetchQuizQuestions = async (amount = 15) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=18`);
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
      incorrect_answers: question.incorrect_answers.map(answer => decodeHTMLEntities(answer)),
      userAnswer: null,
      visited: false
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

const decodeHTMLEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};