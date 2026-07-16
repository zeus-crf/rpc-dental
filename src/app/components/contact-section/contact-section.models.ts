export interface BusinessHour {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface ContactSectionData {
  sealText: string;
  eyebrow: string;
  title: string;
  body: string;
  whatsappLabel: string;
  whatsappHref: string;
  callLabel: string;
  callHref: string;
  phones: string[];
  hoursTitle: string;
  hours: BusinessHour[];
  locationTitle: string;
  locationBody: string;
  locationLabel: string;
}
