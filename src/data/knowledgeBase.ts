/**
 * Singapore Financial Knowledge Base
 *
 * IMPORTANT: All rates, figures, and product details are illustrative and based on
 * publicly available information as of early 2025. Users should verify current rates
 * via official sources (MAS, MoneySense, CPF Board, bank websites).
 *
 * This is for educational purposes only and does not constitute financial advice.
 */

export const SG_KNOWLEDGE_BASE = {
  disclaimer:
    'All rates and product details are illustrative. Verify current rates via MAS, MoneySense, CPF Board, or the respective bank websites.',

  savingsBonds: {
    name: 'Singapore Savings Bonds (SSB)',
    issuer: 'Government of Singapore',
    description:
      'A special type of Singapore Government Securities that individuals can invest in. Interest is paid every 6 months and steps up over time — the longer you hold, the higher the effective yield.',
    currentYieldRange: '~2.5% to ~3.2% p.a. (10-year average, illustrative)',
    minimum: '$500',
    maximum: '$200,000 (lifetime limit)',
    tenure: 'Up to 10 years, redeemable monthly with no penalty',
    issuance: 'Monthly, applications via DBS/POSB, OCBC, or UOB ATMs/internet banking',
    keyFeatures: [
      'Step-up interest: increases the longer you hold',
      'Can redeem early with no penalty (interest paid up to redemption date)',
      'Backed by the Singapore Government — very low risk',
      'Interest paid semi-annually',
      'Apply monthly; allotment is pro-rated if oversubscribed',
    ],
    sources: ['MAS SSB page', 'MoneySense'],
  },

  tbills: {
    name: 'Singapore Treasury Bills (T-bills)',
    issuer: 'Government of Singapore',
    description:
      'Short-term government securities issued at a discount to face value. Available in 6-month and 1-year tenures.',
    currentYieldRange: '~3.5% to ~3.8% p.a. (illustrative, varies by auction)',
    minimum: '$1,000',
    tenure: '6 months or 1 year',
    issuance: 'Auctioned by MAS every 2 weeks (6-month) or monthly (1-year)',
    keyFeatures: [
      'Issued at a discount, redeemed at face value',
      'Auction-based — yield determined by market demand',
      'Can apply via bank ATMs/internet banking or CPFIS',
      'Low risk — backed by Singapore Government',
      'Shorter commitment than SSB',
    ],
    sources: ['MAS T-bills page', 'MoneySense'],
  },

  highYieldSavings: {
    name: 'High-Yield Savings Accounts',
    description:
      'Singapore banks offer bonus interest on savings when you meet certain conditions like salary credit, credit card spend, or bill payments. Base interest is low (~0.05%), but bonus tiers can bring effective rates significantly higher.',
    products: [
      {
        name: 'DBS Multiplier',
        generalMechanics:
          'Earn bonus interest when you credit salary and transact in multiple categories (credit card spend, home loan instalments, insurance, investments). Higher transaction volume unlocks higher tiers.',
        typicalBonusRange: 'Up to ~3.8% p.a. on first $100k (illustrative)',
        keyCondition: 'Salary credit + transactions in at least 1 other category',
      },
      {
        name: 'OCBC 360',
        generalMechanics:
          'Bonus interest for salary credit, credit card spend, GIRO payments, and wealth/insurance purchases. Each category adds a bonus layer.',
        typicalBonusRange: 'Up to ~4.1% p.a. on first $100k (illustrative)',
        keyCondition: 'Salary credit + spend in bonus categories',
      },
      {
        name: 'UOB One',
        generalMechanics:
          'Bonus interest based on monthly card spend thresholds and GIRO payments. Simpler structure — spend $500+/month on eligible cards to unlock tiers.',
        typicalBonusRange: 'Up to ~3.85% p.a. on first $100k (illustrative)',
        keyCondition: 'Min $500 card spend/month + salary credit or 3 GIRO debits',
      },
    ],
    note: 'Rates change frequently. Always check the bank\'s current promotional rates. Bonus interest typically applies only to the first $100k.',
    sources: ['Respective bank websites', 'MoneySense comparisons'],
  },

  cpf: {
    name: 'Central Provident Fund (CPF)',
    description:
      "Singapore's mandatory savings scheme for retirement, healthcare, and housing. Contributions from both employee and employer go into three accounts.",
    accounts: [
      {
        name: 'Ordinary Account (OA)',
        interestRate: '2.5% p.a.',
        uses: 'Housing, education, investment (CPFIS-OA)',
      },
      {
        name: 'Special Account (SA)',
        interestRate: '4.0% p.a.',
        uses: 'Retirement, investment (CPFIS-SA)',
      },
      {
        name: 'MediSave Account (MA)',
        interestRate: '4.0% p.a. (minimum)',
        uses: 'Healthcare, MediShield Life, Integrated Shield Plans',
      },
    ],
    topUpBenefits: [
      'Voluntary SA top-ups earn 4% p.a. (up to the Full Retirement Sum)',
      'Tax relief of up to $8,000/year for cash top-ups to SA',
      'Additional $8,000 tax relief for top-ups to family members\' SA/MA',
      'SA funds compound at 4% — powerful for long-term retirement growth',
    ],
    retirementSum: {
      BRS: '~$102,000 (Basic Retirement Sum, illustrative)',
      FRS: '~$205,000 (Full Retirement Sum, illustrative)',
      ERS: '~$307,500 (Enhanced Retirement Sum, illustrative)',
    },
    sources: ['CPF Board website', 'MoneySense'],
  },

  etfs: {
    name: 'SGX-Listed ETFs',
    description:
      'Exchange-traded funds listed on the Singapore Exchange that provide broad market exposure. Two commonly referenced ones:',
    products: [
      {
        name: 'STI ETF (e.g., Nikko AM Singapore STI ETF, SPDR STI ETF)',
        description:
          'Tracks the Straits Times Index — the 30 largest companies listed on SGX. Provides exposure to the Singapore equity market.',
        typicalYield: 'Dividend yield ~3-4% (varies, illustrative)',
        risk: 'Equity market risk — value fluctuates with the stock market',
      },
      {
        name: 'Nikko AM REIT ETF',
        description:
          'Tracks Singapore REITs — provides exposure to the real estate sector. Higher yield potential but more volatile.',
        typicalYield: 'Dividend yield ~4-6% (varies, illustrative)',
        risk: 'REIT sector risk — sensitive to interest rates and property market',
      },
    ],
    note: 'ETFs carry market risk. Past performance does not guarantee future results.',
    sources: ['SGX website', 'MoneySense'],
  },

  moneyMarketFunds: {
    name: 'Money Market Funds',
    description:
      'Unit trusts that invest in short-term, low-risk instruments like T-bills, commercial paper, and deposits. Offered by various fund managers in Singapore.',
    typicalYield: '~3-3.5% p.a. (illustrative, varies)',
    keyFeatures: [
      'Low risk, high liquidity — typically no lock-in',
      'Better returns than savings accounts base rate',
      'Available via fund platforms (e.g., FSMOne, Endowus, Syfe)',
      'Not capital-guaranteed — very low but non-zero risk',
    ],
    sources: ['MoneySense', 'Fund platforms'],
  },

  budgetingGuidance: {
    name: 'MoneySense Budgeting Framework',
    description:
      "Singapore's national financial education programme (MoneySense) recommends a 50/30/20 guideline for budgeting.",
    framework: {
      needs: '50% — Housing, utilities, groceries, transport, insurance',
      wants: '30% — Dining, entertainment, shopping, subscriptions',
      savings: '20% — Emergency fund, investments, debt repayment',
    },
    emergencyFund: '3-6 months of expenses as an emergency buffer',
    sources: ['MoneySense (moneysense.gov.sg)'],
  },
};

export const KNOWLEDGE_BASE_SUMMARY = JSON.stringify(SG_KNOWLEDGE_BASE, null, 2);
