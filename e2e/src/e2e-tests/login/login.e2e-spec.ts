//import { Workbook, Worksheet } from 'exceljs';
import { browser, By, logging, protractor } from 'protractor';
import { LoginPage } from '../../page-objects/login.po';

describe('DD#01-Login Page', () => {
  var loginPage: LoginPage;

  beforeEach(async () => {
    // set implicit time to 30 seconds
    //browser.manage().timeouts().implicitlyWait(30000);
    browser.waitForAngularEnabled(false);
    browser.driver.manage().window().maximize();
    loginPage = new LoginPage();
  });

  it('Test case 1: Load Login Page', async () => {
    loginPage.get();
    browser.sleep(1000);
    expect(browser.driver.getCurrentUrl()).toEqual(browser.baseUrl + "login");
    expect(loginPage.getAuthenticityToken()).toContain("==");
  });

  it('Test case 2: Login Failed', async () => {
    loginPage.get();
    browser.sleep(1000);

    loginPage.setUserName("userName");
    browser.sleep(1000);
    loginPage.setPassword("password");
    browser.sleep(1000);

    loginPage.doLogin();
    browser.sleep(1000);

    let loginError = browser.driver.findElement(By.className("container-lg px-2"));
    expect(loginError.getText()).toContain("Incorrect username or password.");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    await browser.manage().deleteAllCookies();
    await browser.executeScript('window.sessionStorage && window.sessionStorage.clear()');
    await browser.executeScript('window.localStorage && window.localStorage.clear()');
    await browser.actions().sendKeys(protractor.Key.CONTROL + protractor.Key.SHIFT + protractor.Key.DELETE).perform();

    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.ALL,
    } as logging.Entry));
  });
});
