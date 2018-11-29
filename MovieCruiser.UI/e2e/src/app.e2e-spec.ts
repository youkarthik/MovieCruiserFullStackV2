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

  it('should be able to register a new user', () => {
    var uniq =(new Date()).getTime();
    browser.element(by.id('firstname')).sendKeys('test user 1');
    browser.element(by.id('lastname')).sendKeys('test user 1');
    browser.element(by.id('userId')).sendKeys('usertest1');
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
    

    const count = element.all(by.css('.mat-card-title')).count();
    expect(count).toBe(20);
    for(let i = 0; i < 5; i++) {
      expect(element.all(by.css('.mat-card-title')).get(i).getText().then(x => x.toLowerCase())).toContain('best');
    }
  });

  it('should be able to add a movie to the watchlist', async () => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(1000);
    browser.element(by.css('.clsBtnTopRated')).click();
    // const count = element.all(by.css('.card')).count();
    // expect(count).toBe(20);
    element.all(by.css('.movie-thumbnail')).get(0).element(by.css('.clsAddButton')).click();
    browser.driver.sleep(2000);
    browser.element(by.id('watchlistDetailMovieComment')).clear();
    browser.element(by.id('watchlistDetailMovieComment')).sendKeys('sample test comment for the watch list movie');
    
    browser.element(by.css('.clsAddWatchlistsBtn')).click();
    browser.driver.sleep(1000);
    browser.element(by.css('.clsCloseBtn')).click();
    //element(by.css('.addButton')).click();
  })

  
  it('should be able to view the movie added to watchlist', async () => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(1000);
    browser.element(by.css('.clsBtnWatchlist')).click();
    const count = element.all(by.css('.movie-thumbnail')).count();
    expect(count).toBe(1);
    //element(by.css('.addButton')).click();
  })

  it('updating comments in watchlist movie and verification', async () => {
    var comment = 'updated sample test comment for the watch list movie';
    browser.driver.manage().window().maximize();
    browser.driver.sleep(100);
    element.all(by.css('.movie-thumbnail')).get(0).element(by.css('.clsUpdateButton')).click();
    browser.element(by.id('watchlistMovieComment')).clear();
    browser.element(by.id('watchlistMovieComment')).sendKeys(comment);
    browser.element(by.css('.clsSaveCommentsBtn')).click();
    browser.driver.sleep(500);
    expect(element.all(by.css('.movie-overview')).get(0).getText()).toContain(comment);
    //element(by.css('.addButton')).click();
  })

  it('should be able to delete watchlist movie and verify', async () => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(100);
    element.all(by.css('.movie-thumbnail')).get(0).element(by.css('.clsRemoveButton')).click();
    browser.driver.sleep(500);
    const count = element.all(by.css('.mat-card-title')).count();
    expect(count).toBe(0);
    //element(by.css('.clsBtnLogout')).click();
  })

  it ('should be able to log out of the application', async() => {
    element(by.css('.clsBtnLogout')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
    
  })
  
  browser.driver.sleep(2000);
});