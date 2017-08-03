import { DevSrcPage } from './app.po';

describe('dev-src App', function() {
  let page: DevSrcPage;

  beforeEach(() => {
    page = new DevSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
