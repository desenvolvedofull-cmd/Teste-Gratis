import React from 'react';
import { StepProps } from '../types';

const StepCard: React.FC<StepProps> = ({ number, title, description, icon, action }) => {
  return (
    <div className="relative flex flex-col items-start p-6 bg-dark-800 rounded-xl border border-dark-700 hover:border-primary shadow-lg transition-all duration-300 group">
      <div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center bg-primary rounded-full text-white font-bold text-lg shadow-lg z-10 ring-4 ring-dark-900">
        {number}
      </div>
      <div className="mb-4 p-3 bg-dark-700/50 rounded-lg text-primary-hover group-hover:text-primary transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-4 flex-grow">{description}</p>
      {action && (
        <div className="mt-auto w-full">
          {action}
        </div>
      )}
    </div>
  );
};

export default StepCard;