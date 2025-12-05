// Utility to generate realistic dataset for machine learning
export interface DataPoint {
  gender: string;
  age: number;
  location: string;
  monthly_earnings: number;
  trip_frequency: number;
  avg_rating: number;
  consistency: number;
  credit_score: number;
}

export function generateDataset(size: number): DataPoint[] {
  const dataset: DataPoint[] = [];
  
  for (let i = 0; i < size; i++) {
    const dataPoint = generateDataPoint();
    dataset.push(dataPoint);
  }
  
  return dataset;
}

function generateDataPoint(): DataPoint {
  // Generate base features
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const age = Math.floor(Math.random() * 62) + 18; // 18-80
  const location = Math.random() > 0.6 ? 'Urban' : 'Rural';
  
  // Monthly earnings with some correlation to age and location
  let baseEarnings = 1500 + Math.random() * 2000;
  if (age > 30 && age < 55) baseEarnings += 500; // Peak earning years
  if (location === 'Urban') baseEarnings += 300;
  const monthly_earnings = Math.round(baseEarnings * 100) / 100;
  
  // Trip frequency
  const trip_frequency = Math.floor(Math.random() * 50) + 80; // 80-130
  
  // Average rating (slightly skewed towards higher ratings)
  const avg_rating = Math.round((3.0 + Math.random() * 2.0) * 100) / 100;
  
  // Accident rate (lower values more common)
  const consistency = Math.round(Math.random() * 0.4 * 100) / 100;
  
  // Calculate credit score based on features (this is our target variable)
  const credit_score = calculateCreditScore({
    gender,
    age,
    location,
    monthly_earnings,
    trip_frequency,
    avg_rating,
    consistency
  });
  
  return {
    gender,
    age,
    location,
    monthly_earnings,
    trip_frequency,
    avg_rating,
    consistency,
    credit_score
  };
}

function calculateCreditScore(features: Omit<DataPoint, 'credit_score'>): number {
  let score = 650; // Base credit score
  
  // Age factor
  if (features.age < 25) score -= 30;
  else if (features.age > 65) score -= 20;
  else if (features.age >= 35 && features.age <= 50) score += 25;
  
  // Gender factor (minimal impact on credit score)
  if (features.gender === 'Male') score += 5;
  
  // Location factor
  if (features.location === 'Urban') score += 15;
  
  // Earnings factor
  if (features.monthly_earnings < 2000) score -= 40;
  else if (features.monthly_earnings > 3500) score += 30;
  
  // Rating factor (indicates reliability)
  if (features.avg_rating < 3.5) score -= 35;
  else if (features.avg_rating > 4.5) score += 25;
  
  // Consistency factor
  score -= features.consistency * 60; // Lower consistency means lower credit score
  
  // Trip frequency factor
  if (features.trip_frequency > 120) score += 10; // Higher activity can indicate stability
  else if (features.trip_frequency < 90) score -= 15;
  
  // Add some randomness
  score += (Math.random() - 0.5) * 40;
  
  // Ensure credit score is between 300 and 850
  return Math.max(300, Math.min(850, Math.round(score)));
}