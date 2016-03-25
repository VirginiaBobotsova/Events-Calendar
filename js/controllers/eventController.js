/**
 * Created by user on 3/24/2016.
 */
var app = app || {};

app.eventController = (function () {
	function EventController(viewBag, model) {
		this._viewBag = viewBag;
        this._model = model;
	}

    EventController.prototype.loadAllEvents = function (selector) {
       var _this = this;
        this._model.getAllEvents()
            .then(function (data) {
                    //var result = {
                       // events : []
                    //};
                    //data.forEach(function (event) {
                        //result.events.push({
                           // title : event.title,
                           // start : event.start,
                            //end : event.end,
                            //id : event._id
                        //})
                    //});
                    _this._viewBag.showEvents(selector, data);
                },
                function (error) {
                    $.noty.error('A problem occurred while trying to get all events!');
                }).done();
    };

    EventController.prototype.loadMyEvents = function (selector) {
        var _this = this,
            userId = sessionStorage['userId'];
        this._model.getUserEvents(userId)
            .then(function (data) {
                    var result = {
                        events : []
                    };
                    data.forEach(function (event) {
                        result.events.push({
                            title : event.title,
                            start : event.start,
                            end : event.end,
                            id : event._id
                        })
                    });
    
                    _this._viewBag.showEvents(selector, result);
                },
                function (error) {
                    $.noty.error('A problem occurred while trying to get your events!')
                }).done();
    };

    EventController.prototype.loadAddEvent = function (selector) {
        this._viewBag.showAddEvent(selector);
    };

    EventController.prototype.addEvent = function (data) {
        var result = {
            title : data.title,
            start : data.start,
            end : data.end
        };
        this._model.addEvent(result)
            .then(function () {
                    $.noty.success('Event successfully added.');
                    Sammy(function () {
                        this.trigger('redirectUrl', {url : '#/calendar/my/'})
                    })
                },
                function (error) {
                    $.noty.error('A problem occurred while trying to add your event!')
                }).done();
    };

    EventController.prototype.loadEditEvent = function (selector, data) {
        this._viewBag.showEditEvent(selector, data);
    };

    EventController.prototype.editEvent = function (data) {
        data.author = sessionStorage['username'];
        this._model.editEvent(data)
            .then(function () {
                    $.noty.success('Event successfully edited.');
                    Sammy(function () {
                        this.trigger('redirectUrl', {url : '#/calendar/my/'})
                    });
                },
                function (error) {
                    $.noty.error('A problem occurred while trying to edit event!');
                }).done();
    };

    EventController.prototype.loadDeleteEvent = function (selector, data) {
        this._viewBag.showDeleteEvent(selector, data);
    };

    EventController.prototype.deleteEvent = function (eventId) {
        this._model.deleteEvent(eventId)
            .then(function () {
                //window.location.reload();
                    $.noty.success('Event successfully deleted.');
                    Sammy(function () {
                        this.trigger('redirectUrl', {url : '#/calendar/my/'})
                    });
                },
                function (error) {
                    $.noty.error('A problem occurred while trying to delete event!')
                }).done();
    };

    return {
        load : function (viewBag, model) {
            return new EventController(viewBag, model);
        }
    }
}());