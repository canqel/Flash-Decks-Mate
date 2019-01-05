import { DictionariesService } from "./dictionaries.service";

describe('DeckExporterService', () => {
  let service: DictionariesService;
  beforeEach(() => { service = new DictionariesService(); });

  it('#generateUrlForDiki() should return null when phrase is null or empty', () => {
    const result1 = service.generateUrlForDiki(null);
    const result2 = service.generateUrlForDiki('');

    expect(result1).toEqual(null);
    expect(result2).toEqual(null);
  });

  it('#generateUrlForDiki() should return valid url when phrase consists of a single word', () => {
    const result = service.generateUrlForDiki('Keks');

    expect(result).toEqual('https://www.diki.pl/slownik-niemieckiego?q=Keks');
  });

  it('#generateUrlForDiki() should return valid url when phrase contains whitespaces', () => {
    const result = service.generateUrlForDiki('der Keks');

    expect(result).toEqual('https://www.diki.pl/slownik-niemieckiego?q=der%20Keks');
  });

  it('#generateUrlForGoogleTranslate() should return null when phrase is null or empty', () => {
    const result1 = service.generateUrlForGoogleTranslate(null);
    const result2 = service.generateUrlForGoogleTranslate('');

    expect(result1).toEqual(null);
    expect(result2).toEqual(null);
  });

  it('#generateUrlForGoogleTranslate() should return valid url when phrase consists of a single word', () => {
    const result = service.generateUrlForGoogleTranslate('Keks');

    expect(result).toEqual('https://translate.google.pl/#view=home&op=translate&sl=de&tl=pl&text=Keks');
  });

  it('#generateUrlForGoogleTranslate() should return valid url when phrase contains whitespaces', () => {
    const result = service.generateUrlForGoogleTranslate('der Keks');

    expect(result).toEqual('https://translate.google.pl/#view=home&op=translate&sl=de&tl=pl&text=der%20Keks');
  });
});