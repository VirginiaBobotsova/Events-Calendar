/**
 * Created by user on 3/24/2016.
 */
app.homeController = (function() {
    function HomeController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomePage = function(selector) {
        this.viewBag.showWelcomePage(selector);
    };

    HomeController.prototype.loadHomePage = function(selector) {
        var data = {
            username: sessionStorage['username']
        };

        this.viewBag.showHomePage(selector, data);
    };

    return {
        load: function(viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
}());