export interface TestimonialsTitleLine {
  text: string;
  accent: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  tenure: string;
  initials: string;
  rating: number;
}

export interface TestimonialsData {
  eyebrow: string;
  titleLines: TestimonialsTitleLine[];
  testimonials: Testimonial[];
}
