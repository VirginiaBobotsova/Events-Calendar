/**
 * Created by user on 3/24/2016.
 */
(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var requester = app.requester.load(
            'kid_ZJBIQ1FelZ',
            'f61634a82b2344f7aee67b5d5372ea33',
            'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var eventViewBag = app.eventViewBag.load();

        var userModel = app.userModel.load(requester);
        var eventModel = app.eventModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var eventController = app.eventController.load(eventViewBag, eventModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $('#menu').html(templ);
                });
            } else {
                $.get('templates/menu-home.html', function (templ) {
                    $('#menu').html(templ);
                });
            }
        });

        this.get('#/', function() {
            if(!sessionStorage['sessionId']) {
                homeController.loadWelcomePage(selector);
            } else {
                homeController.loadHomePage(selector);
            }
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });
        
        this.get('#/calendar/list/', function () {
            eventController.loadAllEvents(selector);
        });
        
        this.get('#/calendar/my/', function () {
            eventController.loadMyEvents(selector);
        });

        this.get('#/calendar/add/', function () {
            eventController.loadAddEvent(selector);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addEvent', function (ev, data) {
            eventController.addEvent(data);
        });

        this.bind('showEditEvent', function (ev, data) {
            eventController.loadEditEvent(selector, data);
        });

        this.bind('editEvent', function (ev, data) {
            eventController.editEvent(data);
        });

        this.bind('showDeleteEvent', function (ev, data) {
            eventController.loadDeleteEvent(selector, data);
        });

        this.bind('deleteEvent', function (ev, data) {
            eventController.deleteEvent(data._id);
        });
    });

    router.run('#/');
}());
