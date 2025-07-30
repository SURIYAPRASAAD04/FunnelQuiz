import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmailRegistrationForm = ({ 
  onStartQuiz, 
  isLoading = false,
  className = "" 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (nameError && value) {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError && value) {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let hasErrors = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasErrors = true;
    } else if (!validateName(name)) {
      setNameError('Name must be at least 2 characters long');
      hasErrors = true;
    }
    
    if (!email.trim()) {
      setEmailError('Email address is required');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim()
    };
    
    onStartQuiz?.(userData);
  };

  const isFormValid = name.trim() && email.trim() && !nameError && !emailError;

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="space-y-2">
        <Input
          type="text"
          label="Enter your Name"
          placeholder="Enter your full name"
          value={name}
          onChange={handleNameChange}
          error={nameError}
          required
          disabled={isLoading}
          className="glass-card"
        />
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email to start"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          required
          disabled={isLoading}
          className="glass-card"
        />
        <p className="text-xs text-muted-foreground flex items-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Your email is only used for this quiz session</span>
        </p>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid}
        iconName="Play"
        iconPosition="left"
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
      >
        {isLoading ? 'Preparing Quiz...' : 'Start Quiz'}
      </Button>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground animate-pulse">
          <Icon name="Download" size={16} />
          <span>Fetching fresh trivia questions...</span>
        </div>
      )}
    </form>
  );
};

export default EmailRegistrationForm;