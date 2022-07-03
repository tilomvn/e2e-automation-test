import { browser, By, element } from 'protractor';

export class LoginSessionPage {
  loginError = element.all(By.className("px-2")).last();
  loginButton = element(By.name('commit'));

  getError = () => {
    return this.loginError.getText() as Promise<string>;
  };

  doLogin = () => {
    return this.loginButton.submit() as Promise<void>;
  };
};
