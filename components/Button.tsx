import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";
  
  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(37,99,235,0.6)] border border-transparent",
    
    secondary: "text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md",
    
    outline: "text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm",
    
    glow: "text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] border-transparent"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      {variant === 'glow' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md" />
      )}
    </button>
  );
};