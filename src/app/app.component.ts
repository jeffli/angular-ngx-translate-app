import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  minutes = 0;
  message = '';
  when = 'TIME.JUST_NOW';

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translateMessage();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.translateMessage();
    this.inc(0);
  }

  inc(i: number) {
    let message = 'TIME.JUST_NOW';
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
    if (this.minutes === 1) {
      message = 'TIME.ONE_MINUTE';
    } else {
      message = 'TIME.MINUTES_AGO';
    }

    this.translate.get(message, {minute: this.minutes}).subscribe((translated: string) => {
      this.when = translated;
    });
  }

  translateMessage(){
    this.translate.get('MESSAGE.HELLO_WORLD', { subject: 'World!' }).subscribe((translated: string) => {
      this.message = translated;
    });
  }
}
