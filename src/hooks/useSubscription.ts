import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SubscriptionPlan } from '../store/slices/subscriptionSlice';

export type Feature = 'POS' | 'INVENTORY' | 'REPORTS' | 'ANALYTICS' | 'MULTI_BRANCH';

const PLAN_FEATURES: Record<SubscriptionPlan, Feature[]> = {
  BASIC: ['POS', 'INVENTORY'],
  PRO: ['POS', 'INVENTORY', 'REPORTS'],
  ELITE: ['POS', 'INVENTORY', 'REPORTS', 'ANALYTICS', 'MULTI_BRANCH'],
};

export const useSubscription = () => {
  const plan = useSelector((state: RootState) => state.subscription.plan);

  const hasFeature = (feature: Feature) => {
    return PLAN_FEATURES[plan].includes(feature);
  };

  return { plan, hasFeature };
};
