import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {

  generateUrlForDiki(phrase: string): string {
    return this.generateUrl('https://www.diki.pl/slownik-niemieckiego?q=', phrase);
  }

  generateUrlForGoogleTranslate(phrase: string): string {
    return this.generateUrl('https://translate.google.pl/#view=home&op=translate&sl=de&tl=pl&text=', phrase);
  }

  generateUrlForDeepL(phrase: string): string {
    return this.generateUrl('https://www.deepl.com/translator#de/pl/', phrase);
  }

  private generateUrl(base: string, parameter: string): string {
    if (!parameter || parameter.length === 0) return null;

    const encodedParameter = encodeURIComponent(parameter);

    return base + encodedParameter;
  }
}
