import { browser } from 'protractor';

export class TestStorage {
  storage: any;
  constructor(storage) {
      // 'localStorage' or 'sessionStorage'
      this.storage = storage;
  }

  /**
   * get local/session storage as object
   * @returns storage value
   */
  async get() {
      // log(`${this.storage}.get()`);
      let keys: [];
      this.storage = {};

      keys = await browser.executeScript(`return Object.keys(window.${this.storage});`);
      keys.forEach(async (key) => {
          this.storage[key] = await browser.executeScript(`return window.${this.storage}.getItem('${key}');`);
      });

      return this.storage;
  }

  /**
   * Clear local/session storage
   * @returns null
   */
  async clear() {
      // log(`${this.storage}.clear()`);
      return browser.executeScript(`return window.${this.storage}.clear();`);
  }

  /**
   * Set a value of local/session storage
   * @param key name of item
   * @param value value of item
   * @returns null
   */
  async setValue(key, value) {
      // log(`${this.storage}.setValue(${key}, ${value})`);
      return browser.executeScript(`return window.${this.storage}.setItem('${key}', '${value}');`);
  }

  /**
   * Get value of a key of local/session storage
   * @param key name of item
   * @returns null
   */
  async getValue(key) {
      // log(`${this.storage}.getValue(${key})`);
      return browser.executeScript(`return window.${this.storage}.getItem('${key}');`);
  }

  async removeItem(key) {
      // log(`${this.storage}.removeItem(${key})`);
      return browser.executeScript(`return window.${this.storage}.removeItem('${key}');`);
  }
}
