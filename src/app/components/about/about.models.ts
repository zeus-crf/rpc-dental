export interface AboutTitleLine {
  text: string;
  accent: boolean;
}

export interface AboutData {
  eyebrow: string;
  titleLines: AboutTitleLine[];
  body: string;
  manifestoLabel: string;
  manifestoQuote: string;
  manifestoAuthor: string;
  sealText: string;
  yearsLabel: string;
  yearsValue: string;
  yearsBig: string;
  yearsNote: string;
  visitLabel: string;
  visitTitle: string;
  visitLocation: string;
  visitHref: string;
}
