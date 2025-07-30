import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const QuizTimer = ({ 
  initialTime = 1800, 
  onTimeUp,
  isActive = true,
  className = "",
  setTimeSpent
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    // Reset timer when initialTime changes
    setTimeRemaining(initialTime);
    startTimeRef.current = Date.now();
    lastUpdateRef.current = Date.now();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastUpdateRef.current) / 1000);
      
      if (elapsedSeconds > 0) {
        lastUpdateRef.current = now;
        setTimeRemaining(prev => {
          const newTime = prev - elapsedSeconds;
          
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            onTimeUp?.();
            return 0;
          }
          return newTime;
        });

        // Update actual time spent
        const currentTimeSpent = Math.floor((now - startTimeRef.current) / 1000);
        setTimeSpent?.(currentTimeSpent);
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, onTimeUp, setTimeSpent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeStatus = () => {
    const percentage = (timeRemaining / initialTime) * 100;
    if (percentage <= 5) return 'critical';
    if (percentage <= 16.67) return 'warning';
    return 'normal';
  };

  const timeStatus = getTimeStatus();
  const progressPercentage = (timeRemaining / initialTime) * 100;

  const getStatusStyles = () => {
    switch (timeStatus) {
      case 'critical': return 'bg-error/20 border-error/30 text-error';
      case 'warning': return 'bg-warning/20 border-warning/30 text-warning';
      default: return 'bg-white/10 border-white/20 text-foreground';
    }
  };

  const getIconColor = () => {
    switch (timeStatus) {
      case 'critical': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <div className={`${className}`}>
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${getStatusStyles()}`}>
        <Icon 
          name={timeStatus === 'critical' ? 'AlertTriangle' : 'Clock'} 
          size={20} 
          color={getIconColor()} 
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Time Remaining</span>
            <span className="font-mono text-lg font-bold">
              {formatTime(timeRemaining)}
            </span>
          </div>
          
          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-linear ${
                timeStatus === 'critical' ? 'bg-error' : 
                timeStatus === 'warning' ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {timeStatus === 'critical' && (
        <div className="mt-2 text-center">
          <span className="text-xs text-error font-medium animate-pulse">
            ⚠️ Less than 1 minute remaining!
          </span>
        </div>
      )}
      
      {timeStatus === 'warning' && (
        <div className="mt-2 text-center">
          <span className="text-xs text-warning font-medium">
            🕐 5 minutes remaining
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizTimer;