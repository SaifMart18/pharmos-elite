import React from 'react';
import { useSubscription, Feature } from '../hooks/useSubscription';

interface FeatureGuardProps {
  feature: Feature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({ feature, children, fallback = null }) => {
  const { hasFeature } = useSubscription();

  if (!hasFeature(feature)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
