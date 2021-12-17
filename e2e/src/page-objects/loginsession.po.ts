import { browser, By, element } from 'protractor';

export class LoginSessionPage {
  loginError = element(By.className("container-lg px-2"));
  loginButton = element(By.name('commit'));

  getError = () => {
    return this.loginError.getText() as Promise<string>;
  };

  doLogin = () => {
    return this.loginButton.submit() as Promise<void>;
  };
};
