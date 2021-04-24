import { Injectable } from '@angular/core';
import * as MESSAGES_DE from '../../constants/localization/messages.de';
import * as MESSAGES_EN from '../../constants/localization/messages.en';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  /*======================================*
   * FIELDS
   *======================================*/

  private readonly _localizationStrings;

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor() {
    this._localizationStrings = this.getCorrectLocalizationStrings();
  }

  /*======================================*
   * INITIALIZATION
   *======================================*/

  /**
   * Returns the MESSAGES_<locale> object to choose for the current session.
   * @private
   */
  private getCorrectLocalizationStrings() {

    // use English as default language
    const userLanguage = navigator.language;
    let localizationStrings = MESSAGES_EN;

    // use supported language if possible
    if (userLanguage.includes('de')) {
      localizationStrings = MESSAGES_DE;
    }

    // return the correct language strings
    return localizationStrings;
  }

  /*======================================*
   * GET LOCALIZED STRINGS
   *======================================*/

  /**
   * Returns the localized string for the given MESSAGES_ID value.
   * @param id a value from MESSAGES_ID
   */
  public localize(id: string) {
    return this.getLocalizedStringById(id);
  }

  /**
   * Returns the localized string for the given MESSAGES_ID value.
   * Therefore the ID needs to be split at the decimal points (".") if a nested value should be accessed.
   *
   * @param id a value from MESSAGES_ID
   * @private
   *
   * @see {@link https://stackoverflow.com/questions/33066787/access-a-nested-property-with-a-string Access a nested property with a string}
   */
  private getLocalizedStringById(id): string {
    return id.split('.').reduce((o, key) => {
      return o[key];
    }, this._localizationStrings);
  }
}
