// Simulate machine learning model training and evaluation
export interface ModelResult {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainTime: number;
  status: 'training' | 'completed' | 'error';
}

export async function trainModels(): Promise<ModelResult[]> {
  // Simulate training different ML models
  const models = [
    {
      name: 'Linear Regression',
      baseAccuracy: 0.78,
      baseTrainTime: 150,
    },
    {
      name: 'Random Forest',
      baseAccuracy: 0.89,
      baseTrainTime: 800,
    },
    {
      name: 'XGBoost',
      baseAccuracy: 0.94,
      baseTrainTime: 1000,
    },
    {
      name: 'Gradient Boosting',
      baseAccuracy: 0.92,
      baseTrainTime: 1200,
    },
    {
      name: 'Support Vector Machine',
      baseAccuracy: 0.85,
      baseTrainTime: 2000,
    },
    {
      name: 'Neural Network',
      baseAccuracy: 0.91,
      baseTrainTime: 3000,
    }
  ];

  return models.map(model => {
    // Add some randomness to simulate real training variation
    const accuracyVariation = (Math.random() - 0.5) * 0.06;
    const accuracy = Math.max(0.7, Math.min(0.98, model.baseAccuracy + accuracyVariation));
    
    // Generate correlated precision, recall, and F1 scores
    const precision = Math.max(0.65, accuracy + (Math.random() - 0.5) * 0.04);
    const recall = Math.max(0.65, accuracy + (Math.random() - 0.5) * 0.04);
    const f1Score = (2 * precision * recall) / (precision + recall);
    
    // Add some variation to training time
    const timeVariation = Math.random() * 200 - 100;
    const trainTime = Math.max(50, model.baseTrainTime + timeVariation);

    return {
      name: model.name,
      accuracy: Math.round(accuracy * 10000) / 10000,
      precision: Math.round(precision * 10000) / 10000,
      recall: Math.round(recall * 10000) / 10000,
      f1Score: Math.round(f1Score * 10000) / 10000,
      trainTime: Math.round(trainTime),
      status: 'completed' as const
    };
  });
}

export function preprocessData(data: any[]): any[] {
  // Simulate data preprocessing steps
  return data.map(item => {
    // Normalize numerical features
    const normalizedItem = { ...item };
    
    // Scale monthly_earnings (example normalization)
    normalizedItem.monthly_earnings_scaled = normalizedItem.monthly_earnings / 5000;
    
    // One-hot encode categorical variables
    normalizedItem.gender_male = item.gender === 'Male' ? 1 : 0;
    normalizedItem.gender_female = item.gender === 'Female' ? 1 : 0;
    normalizedItem.location_urban = item.location === 'Urban' ? 1 : 0;
    normalizedItem.location_rural = item.location === 'Rural' ? 1 : 0;
    
    // Feature engineering - create interaction terms
    normalizedItem.age_earnings_interaction = item.age * item.monthly_earnings / 100000;
    normalizedItem.rating_consistency_score = item.avg_rating * (1 - item.accident_rate);
    
    return normalizedItem;
  });
}

export function evaluateModel(predictions: number[], actual: number[]): {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
} {
  // Convert continuous predictions to classification for evaluation
  const predictionClasses = predictions.map(p => p > 50 ? 1 : 0);
  const actualClasses = actual.map(a => a > 50 ? 1 : 0);
  
  let truePositives = 0;
  let trueNegatives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  
  for (let i = 0; i < predictionClasses.length; i++) {
    if (predictionClasses[i] === 1 && actualClasses[i] === 1) truePositives++;
    else if (predictionClasses[i] === 0 && actualClasses[i] === 0) trueNegatives++;
    else if (predictionClasses[i] === 1 && actualClasses[i] === 0) falsePositives++;
    else falseNegatives++;
  }
  
  const accuracy = (truePositives + trueNegatives) / predictionClasses.length;
  const precision = truePositives / (truePositives + falsePositives) || 0;
  const recall = truePositives / (truePositives + falseNegatives) || 0;
  const f1Score = (2 * precision * recall) / (precision + recall) || 0;
  
  return { accuracy, precision, recall, f1Score };
}