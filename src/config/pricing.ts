export const pricingPlans = {
  free: {
    id: "free",
    readingsLimit: 1,
    features: [
      "1_free_reading",
      "basic_chart_overview",
      "ai_interpretation",
      "three_languages",
    ],
  },
  premiumMonthly: {
    id: "premium_monthly",
    priceId: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    amount: 9.99,
    currency: "usd",
    interval: "month",
    readingsLimit: Infinity,
    features: [
      "unlimited_readings",
      "advanced_chart_analysis",
      "trend_visualizations",
      "export_as_image",
      "daily_fortune",
      "priority_ai_model",
    ],
  },
  premiumYearly: {
    id: "premium_yearly",
    priceId: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID,
    amount: 89.99,
    currency: "usd",
    interval: "year",
    readingsLimit: Infinity,
    features: [
      "unlimited_readings",
      "advanced_chart_analysis",
      "trend_visualizations",
      "export_as_image",
      "daily_fortune",
      "priority_ai_model",
    ],
  },
} as const;
