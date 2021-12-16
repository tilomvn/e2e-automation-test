import { browser, By, element } from 'protractor';

export class LoginPage {
  userNameInput = element(By.id('login_field'));
  passwordInput = element(By.id('password'));
  authenticityToken = element(By.name('authenticity_token'));
  loginButton = element(By.name('commit'));

  get = async () => {
    await browser.get(browser.baseUrl + "login");
  };

  getAuthenticityToken = () => {
    return this.authenticityToken.getAttribute('value');
  };

  setUserName = (username) => {
    this.userNameInput.sendKeys(username);
  };

  setPassword = (password) => {
    this.passwordInput.sendKeys(password);
  };

  doLogin = async () => {
    this.loginButton.submit();
  };
};
