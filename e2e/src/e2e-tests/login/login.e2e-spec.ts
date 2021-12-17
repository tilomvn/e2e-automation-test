//import { Workbook, Worksheet } from 'exceljs';
import { browser, By, logging, protractor } from 'protractor';
import { LoginPage } from '../../page-objects/login.po';
import { LoginSessionPage } from '../../page-objects/loginsession.po';

describe('DD#01-Login Page', () => {
  var loginPage: LoginPage;
  var loginSessionPage: LoginSessionPage;

  beforeAll(() => {
    // set implicit time to 30 seconds
    //browser.manage().timeouts().implicitlyWait(30000);
    browser.waitForAngularEnabled(false);
    browser.driver.manage().window().maximize();
    loginPage = new LoginPage();
    loginSessionPage = new LoginSessionPage();
  });

  it('Test case 1: Load Login Page', () => {
    loginPage.get();
    browser.sleep(3000);

    expect(browser.driver.getCurrentUrl()).toEqual(browser.baseUrl + "login");
    expect(loginPage.getAuthenticityToken()).toContain("==");
  });

  it('Test case 2: Login Failed', () => {
    loginPage.get();
    browser.sleep(2000);

    loginPage.setUserName("userName");
    browser.sleep(1000);
    loginPage.setPassword("password");
    browser.sleep(1000);

    loginPage.doLogin();
    browser.sleep(2000);

    expect(loginSessionPage.getError()).toContain("Incorrect username or password.");
  });

  afterAll(async () => {
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
