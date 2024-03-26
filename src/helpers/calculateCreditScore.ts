import { Order } from '../orders/entities/order.entity';
import { Transaction } from '../transactions/entities/transaction.schema';

export function calculateCreditScore(
  orders: Order[],
  transactions: Transaction[],
): number {
  // Constants to represent the weights of each factor
  const weights = {
    paymentHistory: 0.35,
    debtLevel: 0.3,
    creditHistoryLength: 0.15,
    recentCreditActivity: 0.1,
  };

  // Calculate scores for each factor
  const paymentHistoryScore = calculatePaymentHistoryScore(transactions);
  const debtLevelScore = calculateDebtLevelScore(orders);
  const creditHistoryLengthScore = calculateCreditHistoryLengthScore(orders);
  const recentCreditActivityScore = calculateRecentCreditActivityScore(orders);

  // Compute weighted sum
  const weightedSum =
    paymentHistoryScore * weights.paymentHistory +
    debtLevelScore * weights.debtLevel +
    creditHistoryLengthScore * weights.creditHistoryLength +
    recentCreditActivityScore * weights.recentCreditActivity;

  return weightedSum;
}

// Helper functions to calculate individual scores

function calculatePaymentHistoryScore(transactions: Transaction[]): number {
  // Calculate payment history score based on transaction data
  // Example: Percentage of on-time payments
  const onTimePayments = transactions.filter(
    (transaction) => transaction.credit === false,
  );
  const percentageOnTimePayments = onTimePayments.length / transactions.length;
  return percentageOnTimePayments * 100; // Return as percentage
}

function calculateDebtLevelScore(orders: Order[]): number {
  // Calculate debt level score based on order data
  // Example: Debt-to-income ratio
  const totalDebt = orders.reduce(
    (total, order) => total + order.totalAmount,
    0,
  );
  // Assuming income is not available, so using a constant value for debt-to-income ratio
  const debtToIncomeRatio = totalDebt / 50000; // Assuming income of $50,000
  return 100 - debtToIncomeRatio * 100; // Return as percentage
}

function calculateCreditHistoryLengthScore(orders: Order[]): number {
  // Calculate credit history length score based on order data
  // Example: Age of oldest account
  const oldestOrderDate = Math.min(
    ...orders.map((order) => order.timestamp.getTime()),
  );
  const currentDate = Date.now();
  const creditHistoryLength =
    (currentDate - oldestOrderDate) / (1000 * 3600 * 24 * 365); // Convert milliseconds to years
  return creditHistoryLength / 10; // Return as percentage (scaled down)
}

function calculateRecentCreditActivityScore(orders: Order[]): number {
  // Calculate recent credit activity score based on order data
  // Example: Number of new accounts opened in the last year
  const currentDate = Date.now();
  const oneYearAgo = currentDate - 1000 * 3600 * 24 * 365; // One year ago
  const recentOrders = orders.filter(
    (order) => order.timestamp.getTime() > oneYearAgo,
  );
  return Math.min(recentOrders.length * 10, 100); // Return as percentage (scaled down)
}

// export default calculateCreditScore;
