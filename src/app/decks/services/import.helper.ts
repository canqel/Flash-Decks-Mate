import { FlashCardEntry, Language } from '../state/decks.models';

/**
 * Generates flash card entries for input data containing every
 * word/sentence in a separate line (one line for lang1, next line for lang2).
 * Easy to use with cards from memrise.com
 * 
 * Example:
 * Football
 * Piłka nożna
 * Voleyball
 * Siatkówka
 */
export function generateFlashCardEntries(inputData: string, side1Lang: Language,
  side2Lang: Language): FlashCardEntry[] {

  if (inputData == null) return [];

  const results: FlashCardEntry[] = [];
  const lines = inputData.split(/[\r\n]+/);

  for (let loopIndex = 0; loopIndex < lines.length; loopIndex += 2) {
    const side1 = lines[loopIndex];
    const side2 = lines[loopIndex + 1];

    const entry = new FlashCardEntry(side1Lang, side2Lang);
    entry.setValues(side1, side2);
    results.push(entry);
  }

  return results;
}
