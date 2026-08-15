import type { ThreatStats, LogEvent } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const fetchThreatStats = async (): Promise<ThreatStats> => {
  const response = await fetch(`${API_BASE_URL}/threats/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch threat stats');
  }
  return response.json();
};

export const fetchRecentActivity = async (): Promise<LogEvent[]> => {
  const response = await fetch(`${API_BASE_URL}/threats/recent?limit=100`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent activity');
  }
  return response.json();
};
