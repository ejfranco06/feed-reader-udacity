/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('have url', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0)

      });
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

     it('have name', function() {
       allFeeds.forEach(function(feed) {
         expect(feed.name).toBeDefined();
         expect(feed.name.length).not.toBe(0)

       });
     });
  });


  /* This test suit does test on "The menu" */
  describe('The menu', function() {
    const bodyEl = document.getElementsByTagName('body')[0];

    /* This test spec ensures the menu element is
    * hidden by default.
    */
    it('is initially hidden', function() {
      const classList = bodyEl.classList;
      expect(classList.contains('menu-hidden')).toBe(true);

    });


    /* This test spec  ensures the menu changes
    * visibility when the menu icon is clicked.
    */

    it('toggle view', function() {
      const classList = bodyEl.classList;
      const menuButton = document.getElementsByClassName('menu-icon-link')[0];

      menuButton.click();
      expect(classList.contains('menu-hidden')).toBe(false);

      menuButton.click();
      expect(classList.contains('menu-hidden')).toBe(true);

    });
  });


  /* This test suite does test on "Initial Entries" */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* This test spec  ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */
    it('has at least a single entry', function() {
      const feedEl = document.getElementsByClassName('feed')[0];
      expect(feedEl.children.length > 0).toBe(true);
    });

  });


  /* This test suite does test on "New Feed Selection" */
  describe('New Feed Selection', function() {
    const feedEl = document.getElementsByClassName('feed')[0];
    let oldFeed;
    let newFeed;

    beforeEach(function(done) {
      loadFeed(1, function() {
        oldFeed = feedEl.innerHTML;
      });

      loadFeed(0, function() {
        newFeed = feedEl.innerHTML;
        done();
      });
    });

    /* This test spec ensures when a new feed is loaded
    * by the loadFeed function and that the content actually changes.
    */
    it('content changed', function() {
      expect(oldFeed).not.toBe(newFeed);
    });

  });
}());
