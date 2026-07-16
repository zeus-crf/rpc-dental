export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface StatsBannerData {
  stats: StatItem[];
}
