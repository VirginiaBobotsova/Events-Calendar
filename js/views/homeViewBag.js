/**
 * Created by user on 3/24/2016.
 */
app.homeViewBag = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome-guest.html', function(templ) {
            $(selector).html(templ);
        })
    }

    function showHomePage(selector, data) {
        $.get('templates/welcome-user.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage,
                showHomePage: showHomePage
            }
        }
    }
}());