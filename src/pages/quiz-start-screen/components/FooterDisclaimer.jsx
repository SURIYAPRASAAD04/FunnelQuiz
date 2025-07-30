import React from 'react';
import Icon from '../../../components/AppIcon';

const FooterDisclaimer = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={`text-center space-y-4 ${className}`}>
      {/* Data Source */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Database" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by CausalFunnel
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Questions are sourced from CausalFunnel, ensuring fresh and diverse content for every quiz session.
        </p>
      </div>

      {/* Privacy & Terms */}
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <button className="hover:text-primary transition-colors duration-150 flex items-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Privacy</span>
        </button>
        <span>•</span>
        <button className="hover:text-primary transition-colors duration-150 flex items-center space-x-1">
          <Icon name="FileText" size={12} />
          <span>Terms</span>
        </button>
        <span>•</span>
        <button className="hover:text-primary transition-colors duration-150 flex items-center space-x-1">
          <Icon name="HelpCircle" size={12} />
          <span>Help</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Copyright" size={12} />
        <span>
          {currentYear} FunnelQuiz. All rights reserved.
        </span>
      </div>

      {/* Version Info */}
      <div className="text-xs text-muted-foreground opacity-60">
        Version 1.0.0 • Built with React & Glassmorphism
      </div>
    </div>
  );
};

export default FooterDisclaimer;