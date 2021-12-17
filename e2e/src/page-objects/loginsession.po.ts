import { browser, By, element } from 'protractor';

export class LoginSessionPage {
  loginError = element(By.className("container-lg px-2"));

  getError = () => {
    return this.loginError.getText() as Promise<string>;
  };
};
