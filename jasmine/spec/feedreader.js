/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("have url defined and not empty", function() {
        for (feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toEqual("");
        }
      });

      it("have name defined and not empty", function() {
        for (feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toEqual("");
        }
      });
    });

    describe("The menu", function() {
      var body = document.body;

      it("is hidden by default", function() {
        expect(body.classList.contains("menu-hidden")).toBeTruthy();
      });

      it("shows and hides when menu icon is clicked", function() {
        document.getElementsByClassName("menu-icon-link")[0].click();
        expect(body.classList.contains("menu-hidden")).toBeFalsy();
        document.getElementsByClassName("menu-icon-link")[0].click();
        expect(body.classList.contains("menu-hidden")).toBeTruthy();
      });
    });

    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("are loaded", function(done) {
        expect($(".feed .entry").length).toBeGreaterThan(0);
        done();
      });
    });

    describe("New Feed Selection", function() {
      let initialFeed, finalFeed;
      let feed = $(".feed");

      beforeEach(function(done) {
        loadFeed(0, function() {
          initialFeed = feed.text();

          loadFeed(1, function() {
            finalFeed = feed.text();
            done();
          });
        });
      });

      it("changes page content", function(done) {
        expect(finalFeed).not.toEqual(initialFeed);
        done();
      });
    });
  })()
);
