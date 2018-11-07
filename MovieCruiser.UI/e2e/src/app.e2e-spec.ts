import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('movie-cruiser-angular-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('Movie Cruiser');  	
  });

  it('should be redirected to /login url on load', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be redirected to register route', () => {
    browser.element(by.css('.register-button')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  it('should be able to register user', () => {
    browser.element(by.id('firstname')).sendKeys('test user 1');
    browser.element(by.id('lastname')).sendKeys('test user 1');
    browser.element(by.id('userId')).sendKeys('usertest7');
    browser.element(by.id('password')).sendKeys('password');
    browser.element(by.id('btnregsubmit')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be able to login user and navigate to popular movies', () => {
    browser.element(by.id('userId')).sendKeys('usertest1');
    browser.element(by.id('password')).sendKeys('password');
    browser.element(by.css('.login-button')).click();
    expect(browser.getCurrentUrl()).toContain('/movies/popular');
  });

  it('should search movie', () => {
    browser.element(by.id('txtSearch')).sendKeys('best');
    browser.element(by.id('btnSearch')).click();
    expect(browser.getCurrentUrl()).toContain('/movies/search');
    

    // const count = element.all(by.css('.mat-card-title')).count();
    // expect(count).toBe(20);
    // for(let i = 0; i < 20; i++) {
    //   expect(element.all(by.css('.mat-card-title')).get(i).getText()).toContain('best');
    // }
  });

  // it('adding movie to watch list', async () => {
  //   browser.driver.manage().window().maximize();
  //   browser.driver.sleep(1000);
  //   browser.element(by.css('.topRated')).click();
  //   const count = element.all(by.css('.card')).count();
  //   expect(count).toBe(20);
  //   element.all(by.css('.card')).get(0).element(by.css('.addButton')).click();
  //   //element(by.css('.addButton')).click();
  // })
});