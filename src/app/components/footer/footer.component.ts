import { Component, Input } from "@angular/core";
import { FooterData } from "./footer.models";

@Component({
    selector: 'app-footer',
    standalone: true,
     template: `
    <footer class="bg-brand-dark px-16 py-11 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-white/50 text-[13px] font-body">{{ data.copyright }}</div>
      <ul class="flex gap-7 list-none p-0 m-0">
        @for (link of data.links; track link.label) {
          <li>
            <a [href]="link.href" class="text-white/60 hover:text-white text-[13px] font-body no-underline transition-colors">
              {{ link.label }}
            </a>
          </li>
        }
      </ul>
    </footer>
  `,

})
 export class FooterComponent {
    @Input({ required: true }) data!: FooterData;
 }