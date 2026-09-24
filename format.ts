import { site } from '@/data/site';

const money = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => money.format(value);
