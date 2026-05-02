import { Transaction, Category } from '../types';

let _id = 0;
const id = () => `txn-${++_id}`;

// Month 1: Feb 2026, Month 2: Mar 2026, Month 3: Apr 2026 (most recent, overspending in dining)
function d(month: number, day: number): string {
  return `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Helper to create multiple transactions
function tx(date: string, merchant: string, category: Category, amount: number): Transaction {
  return { id: id(), date, merchant, category, amount: Math.round(amount * 100) / 100 };
}

export function generateTransactions(): Transaction[] {
  _id = 0;
  const transactions: Transaction[] = [];

  // === MONTH 1: February 2026 ===
  // Income
  transactions.push(tx(d(2, 25), 'SALARY - TECHVISTA PTE LTD', 'Income', -5500));

  // Housing
  transactions.push(tx(d(2, 1), 'GIRO HDB RENTAL', 'Housing', 2200));
  transactions.push(tx(d(2, 5), 'SP GROUP UTILITIES', 'Utilities', 118.50));
  transactions.push(tx(d(2, 8), 'SINGTEL MOBILE PLAN', 'Subscriptions', 40.20));
  transactions.push(tx(d(2, 10), 'M1 BROADBAND', 'Utilities', 45.00));

  // Groceries
  transactions.push(tx(d(2, 3), 'NTUC FAIRPRICE ANG MO KIO', 'Groceries', 87.30));
  transactions.push(tx(d(2, 9), 'COLD STORAGE TAMPINES MALL', 'Groceries', 62.40));
  transactions.push(tx(d(2, 14), 'NTUC FAIRPRICE BISHAN', 'Groceries', 95.60));
  transactions.push(tx(d(2, 18), 'SHENG SIONG HOUGANG', 'Groceries', 43.20));
  transactions.push(tx(d(2, 22), 'NTUC FAIRPRICE JURONG', 'Groceries', 78.90));
  transactions.push(tx(d(2, 27), 'COLD STORAGE GREAT WORLD', 'Groceries', 55.10));

  // Dining - normal month
  transactions.push(tx(d(2, 2), 'HAWKER CHAN SMITH STREET', 'Dining', 5.50));
  transactions.push(tx(d(2, 4), 'MAXWELL FOOD CENTRE', 'Dining', 6.00));
  transactions.push(tx(d(2, 6), 'GRAB FOOD - DIN TAI FUNG', 'Dining', 22.80));
  transactions.push(tx(d(2, 7), 'TIAN TIAN HAINANESE CHICKEN', 'Dining', 5.50));
  transactions.push(tx(d(2, 9), 'LIAO FAN HAWKER CHAN', 'Dining', 4.50));
  transactions.push(tx(d(2, 11), 'GRAB FOOD - MCDONALDS', 'Dining', 16.90));
  transactions.push(tx(d(2, 13), 'OLD TOWN ROAD WHITE BEE HOON', 'Dining', 7.00));
  transactions.push(tx(d(2, 15), 'SUSHI TEI TAMPINES', 'Dining', 38.50));
  transactions.push(tx(d(2, 17), 'HAWKER CENTRE BEDOK', 'Dining', 5.00));
  transactions.push(tx(d(2, 19), 'GRAB FOOD - PASTAMANIA', 'Dining', 18.50));
  transactions.push(tx(d(2, 21), 'SAKURA YUHUA', 'Dining', 32.00));
  transactions.push(tx(d(2, 23), 'ZAM ZAM RESTAURANT', 'Dining', 8.00));
  transactions.push(tx(d(2, 25), 'GRAB FOOD - KOUFU', 'Dining', 15.20));
  transactions.push(tx(d(2, 27), 'HAI BAA LAKSA', 'Dining', 4.50));

  // Transport
  transactions.push(tx(d(2, 1), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(2, 2), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(2, 3), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(2, 5), 'GRAB RIDE', 'Transport', 12.50));
  transactions.push(tx(d(2, 7), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(2, 8), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(2, 10), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(2, 12), 'COMFORTDELGRO', 'Transport', 18.00));
  transactions.push(tx(d(2, 14), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(2, 16), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(2, 18), 'GRAB RIDE', 'Transport', 9.80));
  transactions.push(tx(d(2, 20), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(2, 22), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(2, 24), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(2, 26), 'GRAB RIDE', 'Transport', 15.30));
  transactions.push(tx(d(2, 28), 'SIMPLYGO MRT', 'Transport', 2.10));

  // Subscriptions
  transactions.push(tx(d(2, 1), 'SPOTIFY PREMIUM', 'Subscriptions', 11.98));
  transactions.push(tx(d(2, 1), 'NETFLIX', 'Subscriptions', 17.98));
  transactions.push(tx(d(2, 15), 'ANYTIME FITNESS', 'Subscriptions', 135.00));

  // Shopping
  transactions.push(tx(d(2, 5), 'UNIQLO JURONG POINT', 'Shopping', 59.90));
  transactions.push(tx(d(2, 12), 'SHOPEE - PHONE CASE', 'Shopping', 12.90));
  transactions.push(tx(d(2, 20), 'KINOKUNIYA ORCHARD', 'Shopping', 34.50));
  transactions.push(tx(d(2, 26), 'LAZADA - EARPHONES', 'Shopping', 29.90));

  // Healthcare
  transactions.push(tx(d(2, 8), 'GUARDIAN PHARMACY', 'Healthcare', 18.50));
  transactions.push(tx(d(2, 22), 'Raffles Medical', 'Healthcare', 35.00));

  // Other
  transactions.push(tx(d(2, 14), 'MEDISHIELD LIFE PREMIUM', 'Other', 68.00));
  transactions.push(tx(d(2, 28), 'WATSONS PERSONAL CARE', 'Other', 22.50));

  // === MONTH 2: March 2026 ===
  transactions.push(tx(d(3, 25), 'SALARY - TECHVISTA PTE LTD', 'Income', -5500));

  // Housing
  transactions.push(tx(d(3, 1), 'GIRO HDB RENTAL', 'Housing', 2200));
  transactions.push(tx(d(3, 5), 'SP GROUP UTILITIES', 'Utilities', 122.30));
  transactions.push(tx(d(3, 8), 'SINGTEL MOBILE PLAN', 'Subscriptions', 40.20));
  transactions.push(tx(d(3, 10), 'M1 BROADBAND', 'Utilities', 45.00));

  // Groceries
  transactions.push(tx(d(3, 2), 'NTUC FAIRPRICE WOODLANDS', 'Groceries', 92.10));
  transactions.push(tx(d(3, 8), 'COLD STORAGE VIVOCITY', 'Groceries', 71.30));
  transactions.push(tx(d(3, 13), 'NTUC FAIRPRICE TAMPINES', 'Groceries', 88.40));
  transactions.push(tx(d(3, 17), 'SHENG SIONG SERANGOON', 'Groceries', 39.80));
  transactions.push(tx(d(3, 21), 'NTUC FAIRPRICE BUKIT BATOK', 'Groceries', 82.50));
  transactions.push(tx(d(3, 26), 'COLD STORAGE PLAZA SINGAPURA', 'Groceries', 48.90));

  // Dining - slightly elevated
  transactions.push(tx(d(3, 1), 'HAWKER CHAN SMITH STREET', 'Dining', 5.50));
  transactions.push(tx(d(3, 3), 'MAXWELL FOOD CENTRE', 'Dining', 6.00));
  transactions.push(tx(d(3, 5), 'GRAB FOOD - JUMBO SEAFOOD', 'Dining', 28.50));
  transactions.push(tx(d(3, 6), 'TIAN TIAN HAINANESE', 'Dining', 5.50));
  transactions.push(tx(d(3, 8), 'GRAB FOOD - SUSHI DELI', 'Dining', 19.80));
  transactions.push(tx(d(3, 10), 'HILL STREET BRIYANI', 'Dining', 7.50));
  transactions.push(tx(d(3, 12), 'GRAB FOOD - KFC', 'Dining', 17.90));
  transactions.push(tx(d(3, 14), 'ICHIBAN BOSHI VIVOCITY', 'Dining', 42.00));
  transactions.push(tx(d(3, 16), 'HAWKER BEDOK 85', 'Dining', 6.00));
  transactions.push(tx(d(3, 18), 'GRAB FOOD - PHO STREET', 'Dining', 21.30));
  transactions.push(tx(d(3, 20), 'BURNING BIRYANI', 'Dining', 9.00));
  transactions.push(tx(d(3, 22), 'GRAB FOOD - SUBWAY', 'Dining', 14.50));
  transactions.push(tx(d(3, 24), 'PEPPER LUNCH JURONG', 'Dining', 12.80));
  transactions.push(tx(d(3, 26), 'GRAB FOOD - BREADTALK', 'Dining', 16.20));
  transactions.push(tx(d(3, 28), 'HAWKER NEWTON', 'Dining', 5.50));

  // Transport
  transactions.push(tx(d(3, 1), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(3, 2), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(3, 4), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(3, 6), 'GRAB RIDE', 'Transport', 14.20));
  transactions.push(tx(d(3, 8), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(3, 10), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(3, 12), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(3, 14), 'GRAB RIDE', 'Transport', 11.50));
  transactions.push(tx(d(3, 16), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(3, 18), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(3, 20), 'COMFORTDELGRO', 'Transport', 22.00));
  transactions.push(tx(d(3, 22), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(3, 24), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(3, 26), 'GRAB RIDE', 'Transport', 16.80));
  transactions.push(tx(d(3, 28), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(3, 30), 'SIMPLYGO BUS', 'Transport', 1.29));

  // Subscriptions
  transactions.push(tx(d(3, 1), 'SPOTIFY PREMIUM', 'Subscriptions', 11.98));
  transactions.push(tx(d(3, 1), 'NETFLIX', 'Subscriptions', 17.98));
  transactions.push(tx(d(3, 15), 'ANYTIME FITNESS', 'Subscriptions', 135.00));

  // Shopping
  transactions.push(tx(d(3, 7), 'UNIQLO BUGIS JUNCTION', 'Shopping', 79.90));
  transactions.push(tx(d(3, 14), 'SHOPEE - ORGANIZER', 'Shopping', 15.90));
  transactions.push(tx(d(3, 21), 'KINOKUNIYA TAKASHIMAYA', 'Shopping', 42.80));
  transactions.push(tx(d(3, 28), 'LAZADA - STAND DESK', 'Shopping', 89.00));

  // Healthcare
  transactions.push(tx(d(3, 10), 'GUARDIAN PHARMACY', 'Healthcare', 24.30));
  transactions.push(tx(d(3, 25), 'NTUC UNITY', 'Healthcare', 15.80));

  // Other
  transactions.push(tx(d(3, 14), 'MEDISHIELD LIFE PREMIUM', 'Other', 68.00));
  transactions.push(tx(d(3, 30), 'WATSONS PERSONAL CARE', 'Other', 19.90));

  // === MONTH 3: April 2026 — OVERSPENDING IN DINING ===
  transactions.push(tx(d(4, 25), 'SALARY - TECHVISTA PTE LTD', 'Income', -5500));

  // Housing
  transactions.push(tx(d(4, 1), 'GIRO HDB RENTAL', 'Housing', 2200));
  transactions.push(tx(d(4, 5), 'SP GROUP UTILITIES', 'Utilities', 125.80));
  transactions.push(tx(d(4, 8), 'SINGTEL MOBILE PLAN', 'Subscriptions', 40.20));
  transactions.push(tx(d(4, 10), 'M1 BROADBAND', 'Utilities', 45.00));

  // Groceries
  transactions.push(tx(d(4, 3), 'NTUC FAIRPRICE PUNGGOL', 'Groceries', 85.60));
  transactions.push(tx(d(4, 9), 'COLD STORAGE TAMPINES', 'Groceries', 68.20));
  transactions.push(tx(d(4, 14), 'NTUC FAIRPRICE SERANGOON', 'Groceries', 91.30));
  transactions.push(tx(d(4, 18), 'SHENG SIONG ANG MO KIO', 'Groceries', 47.50));
  transactions.push(tx(d(4, 22), 'NTUC FAIRPRICE CLEMENTI', 'Groceries', 76.80));
  transactions.push(tx(d(4, 27), 'COLD STORAGE HOLLAND V', 'Groceries', 52.40));

  // Dining — SIGNIFICANTLY ELEVATED (this is the overspending month)
  transactions.push(tx(d(4, 1), 'HAWKER CHAN SMITH STREET', 'Dining', 5.50));
  transactions.push(tx(d(4, 2), 'GRAB FOOD - DIN TAI FUNG', 'Dining', 32.50));
  transactions.push(tx(d(4, 3), 'MAXWELL FOOD CENTRE', 'Dining', 6.00));
  transactions.push(tx(d(4, 4), 'GRAB FOOD - JUMBO SEAFOOD', 'Dining', 45.80));
  transactions.push(tx(d(4, 5), 'HILL STREET BRIYANI', 'Dining', 7.50));
  transactions.push(tx(d(4, 6), 'GRAB FOOD - SUSHI TEI', 'Dining', 28.90));
  transactions.push(tx(d(4, 7), 'TIAN TIAN HAINANESE', 'Dining', 5.50));
  transactions.push(tx(d(4, 8), 'GRAB FOOD - PASTAMANIA', 'Dining', 24.50));
  transactions.push(tx(d(4, 9), 'HAWKER NEWTON', 'Dining', 6.00));
  transactions.push(tx(d(4, 10), 'BURNING BIRYANI', 'Dining', 9.00));
  transactions.push(tx(d(4, 11), 'GRAB FOOD - MCDONALDS', 'Dining', 18.90));
  transactions.push(tx(d(4, 12), 'ICHIBAN BOSHI ORCHARD', 'Dining', 48.00));
  transactions.push(tx(d(4, 13), 'HAWKER BEDOK 85', 'Dining', 6.00));
  transactions.push(tx(d(4, 14), 'GRAB FOOD - KOUFU', 'Dining', 19.50));
  transactions.push(tx(d(4, 15), 'SAKURA TAMPINES', 'Dining', 35.00));
  transactions.push(tx(d(4, 16), 'GRAB FOOD - SUBWAY', 'Dining', 15.80));
  transactions.push(tx(d(4, 17), 'ZAM ZAM RESTAURANT', 'Dining', 8.00));
  transactions.push(tx(d(4, 18), 'GRAB FOOD - PHO STREET', 'Dining', 22.30));
  transactions.push(tx(d(4, 19), 'HAWKER CHINATOWN', 'Dining', 5.50));
  transactions.push(tx(d(4, 20), 'GRAB FOOD - KFC', 'Dining', 19.90));
  transactions.push(tx(d(4, 21), 'PEPPER LUNCH VIVOCITY', 'Dining', 14.80));
  transactions.push(tx(d(4, 22), 'GRAB FOOD - BREADTALK', 'Dining', 17.20));
  transactions.push(tx(d(4, 23), 'HAI BAA LAKSA', 'Dining', 4.50));
  transactions.push(tx(d(4, 24), 'GRAB FOOD - JUMBO SEAFOOD', 'Dining', 52.00));
  transactions.push(tx(d(4, 25), 'OLD TOWN ROAD BEE HOON', 'Dining', 7.00));
  transactions.push(tx(d(4, 26), 'GRAB FOOD - DIN TAI FUNG', 'Dining', 35.80));
  transactions.push(tx(d(4, 27), 'HAWKER AMOY STREET', 'Dining', 6.00));
  transactions.push(tx(d(4, 28), 'GRAB FOOD - SUSHI DELI', 'Dining', 26.50));
  transactions.push(tx( d(4, 29), 'HAWKER LAU PA SAT', 'Dining', 8.50));

  // Transport
  transactions.push(tx(d(4, 1), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(4, 2), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(4, 4), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(4, 6), 'GRAB RIDE', 'Transport', 18.50));
  transactions.push(tx(d(4, 8), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(4, 10), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(4, 12), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(4, 14), 'GRAB RIDE', 'Transport', 13.80));
  transactions.push(tx(d(4, 16), 'SIMPLYGO MRT', 'Transport', 1.85));
  transactions.push(tx(d(4, 18), 'SIMPLYGO BUS', 'Transport', 1.29));
  transactions.push(tx(d(4, 20), 'COMFORTDELGRO', 'Transport', 25.00));
  transactions.push(tx(d(4, 22), 'SIMPLYGO MRT', 'Transport', 2.10));
  transactions.push(tx(d(4, 24), 'SIMPLYGO BUS', 'Transport', 1.55));
  transactions.push(tx(d(4, 26), 'GRAB RIDE', 'Transport', 19.50));
  transactions.push(tx(d(4, 28), 'SIMPLYGO MRT', 'Transport', 1.85));

  // Subscriptions
  transactions.push(tx(d(4, 1), 'SPOTIFY PREMIUM', 'Subscriptions', 11.98));
  transactions.push(tx(d(4, 1), 'NETFLIX', 'Subscriptions', 17.98));
  transactions.push(tx(d(4, 15), 'ANYTIME FITNESS', 'Subscriptions', 135.00));

  // Shopping
  transactions.push(tx(d(4, 6), 'UNIQLO JURONG POINT', 'Shopping', 69.90));
  transactions.push(tx(d(4, 13), 'SHOPEE - CABLE ORGANIZER', 'Shopping', 8.90));
  transactions.push(tx(d(4, 20), 'KINOKUNIYA ORCHARD', 'Shopping', 38.50));
  transactions.push(tx(d(4, 27), 'LAZADA - DESK LAMP', 'Shopping', 45.90));

  // Healthcare
  transactions.push(tx(d(4, 10), 'GUARDIAN PHARMACY', 'Healthcare', 21.40));
  transactions.push(tx(d(4, 22), 'RAFFLES MEDICAL', 'Healthcare', 45.00));

  // Other
  transactions.push(tx(d(4, 14), 'MEDISHIELD LIFE PREMIUM', 'Other', 68.00));
  transactions.push(tx(d(4, 28), 'WATSONS PERSONAL CARE', 'Other', 25.60));

  return transactions;
}
