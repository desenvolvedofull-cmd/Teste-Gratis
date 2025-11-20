import React from 'react';

export interface StepProps {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}