/**
 * Climate Time-Series Regression & Predictive Trendline Utilities
 * Provides mathematical regression engines (Simple Linear & Quadratic Acceleration)
 * for climate observational datasets (Temperature, GHGs, Sea Level, Clean Energy, Disasters).
 */

export interface RegressionStats {
  slope: number;
  intercept: number;
  r2: number;
  equation: string;
  changePerDecade: number;
  predict: (year: number) => number;
}

export interface PolynomialStats {
  a: number;
  b: number;
  c: number;
  r2: number;
  equation: string;
  acceleration: number;
  predict: (year: number) => number;
}

export type RegressionModelType = 'linear' | 'quadratic';

/**
 * Calculates Simple Linear Regression (Ordinary Least Squares: y = mx + b)
 */
export function calculateLinearRegression(points: { x: number; y: number }[]): RegressionStats {
  const n = points.length;
  if (n < 2) {
    return {
      slope: 0,
      intercept: 0,
      r2: 0,
      equation: 'y = 0',
      changePerDecade: 0,
      predict: () => 0
    };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    const { x, y } = points[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) {
    return {
      slope: 0,
      intercept: sumY / n,
      r2: 0,
      equation: `y = ${(sumY / n).toFixed(2)}`,
      changePerDecade: 0,
      predict: () => sumY / n
    };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R² (Coefficient of determination)
  const yMean = sumY / n;
  let ssTot = 0;
  let ssRes = 0;

  for (let i = 0; i < n; i++) {
    const { x, y } = points[i];
    const yPred = slope * x + intercept;
    ssTot += (y - yMean) * (y - yMean);
    ssRes += (y - yPred) * (y - yPred);
  }

  const r2 = ssTot === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  const sign = intercept >= 0 ? '+' : '-';
  const equation = `y = ${slope >= 0 ? '+' : ''}${slope.toFixed(4)}x ${sign} ${Math.abs(intercept).toFixed(2)}`;

  return {
    slope,
    intercept,
    r2,
    equation,
    changePerDecade: slope * 10,
    predict: (year: number) => slope * year + intercept
  };
}

/**
 * Calculates 2nd-Degree Polynomial Regression (Quadratic: y = ax² + bx + c)
 * useful for accelerating climate trends such as clean energy exponential growth or recent warming surge
 */
export function calculateQuadraticRegression(points: { x: number; y: number }[]): PolynomialStats {
  const n = points.length;
  if (n < 3) {
    const lin = calculateLinearRegression(points);
    return {
      a: 0,
      b: lin.slope,
      c: lin.intercept,
      r2: lin.r2,
      equation: lin.equation,
      acceleration: 0,
      predict: lin.predict
    };
  }

  // Normalize x around mean for numerical stability
  let sumX = 0;
  for (let i = 0; i < n; i++) sumX += points[i].x;
  const meanX = sumX / n;

  // Solve 3x3 normal equations for y = a*u² + b*u + c where u = x - meanX
  let s0 = n;
  let s1 = 0;
  let s2 = 0;
  let s3 = 0;
  let s4 = 0;
  let sy = 0;
  let suy = 0;
  let su2y = 0;

  for (let i = 0; i < n; i++) {
    const u = points[i].x - meanX;
    const y = points[i].y;
    const u2 = u * u;
    s2 += u2;
    s3 += u2 * u;
    s4 += u2 * u2;
    sy += y;
    suy += u * y;
    su2y += u2 * y;
  }

  // Since s1 = sum(u) = 0:
  // [ s4   s3   s2 ] [ a' ] = [ su2y ]
  // [ s3   s2    0 ] [ b' ] = [ suy  ]
  // [ s2    0   s0 ] [ c' ] = [ sy   ]

  const det = s4 * (s2 * s0) - s3 * (s3 * s0) + s2 * (-s2 * s2);
  if (Math.abs(det) < 1e-12) {
    const lin = calculateLinearRegression(points);
    return {
      a: 0,
      b: lin.slope,
      c: lin.intercept,
      r2: lin.r2,
      equation: lin.equation,
      acceleration: 0,
      predict: lin.predict
    };
  }

  // Invert 3x3 symmetric matrix:
  const m11 = s2 * s0;
  const m12 = -s3 * s0;
  const m13 = -s2 * s2;

  const m21 = -s3 * s0;
  const m22 = s4 * s0 - s2 * s2;
  const m23 = s3 * s2;

  const m31 = -s2 * s2;
  const m32 = s3 * s2;
  const m33 = s4 * s2 - s3 * s3;

  const aPrime = (m11 * su2y + m21 * suy + m31 * sy) / det;
  const bPrime = (m12 * su2y + m22 * suy + m32 * sy) / det;
  const cPrime = (m13 * su2y + m23 * suy + m33 * sy) / det;

  // Convert u = x - meanX back to x:
  // a*u² + b*u + c = a(x - m)² + b(x - m) + c
  // = a(x² - 2mx + m²) + bx - bm + c
  // = a*x² + (b - 2am)*x + (a*m² - bm + c)
  const a = aPrime;
  const b = bPrime - 2 * a * meanX;
  const c = a * meanX * meanX - bPrime * meanX + cPrime;

  const predict = (year: number) => a * year * year + b * year + c;

  // R²
  const yMean = sy / n;
  let ssTot = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    const y = points[i].y;
    const yPred = predict(points[i].x);
    ssTot += (y - yMean) * (y - yMean);
    ssRes += (y - yPred) * (y - yPred);
  }
  const r2 = ssTot === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  const equation = `y = ${a.toFixed(5)}x² + ${b.toFixed(3)}x + ${c.toFixed(1)}`;

  return {
    a,
    b,
    c,
    r2,
    equation,
    acceleration: 2 * a,
    predict
  };
}

/**
 * Finds the future calendar year when the projected trend reaches or crosses a critical threshold.
 */
export function findThresholdCrossingYear(
  predictFn: (year: number) => number,
  threshold: number,
  startYear = 2025,
  maxYear = 2100,
  step = 0.5
): number | null {
  const startVal = predictFn(startYear);
  const isAscending = threshold >= startVal;

  for (let y = startYear; y <= maxYear; y += step) {
    const val = predictFn(y);
    if (isAscending && val >= threshold) {
      return Math.round(y * 10) / 10;
    } else if (!isAscending && val <= threshold) {
      return Math.round(y * 10) / 10;
    }
  }
  return null;
}

/**
 * Augments existing time-series datasets with predictive trendlines extending to targetYear.
 */
export function generatePredictiveTimeSeries<T extends { year: number }>(
  data: T[],
  keys: (keyof T | string)[],
  targetYear: number,
  fitStartYear?: number,
  modelType: RegressionModelType = 'linear'
): (T & Record<string, any> & { isForecast?: boolean })[] {
  if (!data || data.length === 0) return [];

  const maxHistoricalYear = Math.max(...data.map(d => d.year));
  const effectiveTargetYear = Math.max(targetYear, maxHistoricalYear);

  // Train regression models for each requested key
  const models: Record<string, (year: number) => number> = {};

  keys.forEach((key) => {
    const validPoints = data
      .filter(d => {
        const val = Number((d as any)[key]);
        const yearOk = fitStartYear ? d.year >= fitStartYear : true;
        return !isNaN(val) && val !== null && yearOk;
      })
      .map(d => ({ x: d.year, y: Number((d as any)[key]) }));

    if (validPoints.length >= 2) {
      if (modelType === 'quadratic' && validPoints.length >= 4) {
        const qStats = calculateQuadraticRegression(validPoints);
        models[key as string] = qStats.predict;
      } else {
        const lStats = calculateLinearRegression(validPoints);
        models[key as string] = lStats.predict;
      }
    }
  });

  // Map historical records
  const result: any[] = data.map((d) => {
    const augmented: any = { ...d, isForecast: false };
    keys.forEach((key) => {
      const predFn = models[key as string];
      if (predFn) {
        const trendVal = predFn(d.year);
        augmented[`${String(key)}_trend`] = Math.round(trendVal * 100) / 100;
      }
    });
    return augmented;
  });

  // If targetYear > maxHistoricalYear, generate projected future years
  if (effectiveTargetYear > maxHistoricalYear) {
    const lastPoint = data[data.length - 1];
    for (let yr = maxHistoricalYear + 1; yr <= effectiveTargetYear; yr++) {
      const forecastPoint: any = {
        ...lastPoint,
        year: yr,
        isForecast: true
      };

      // Clear historical observed values for forecast points so only trendlines render
      keys.forEach((key) => {
        forecastPoint[key] = undefined;
        const predFn = models[key as string];
        if (predFn) {
          const trendVal = predFn(yr);
          forecastPoint[`${String(key)}_trend`] = Math.round(trendVal * 100) / 100;
        }
      });

      result.push(forecastPoint);
    }
  }

  return result;
}
