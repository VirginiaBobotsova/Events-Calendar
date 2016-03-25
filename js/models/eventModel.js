/**
 * Created by user on 3/24/2016.
 */
var app = app || {};
app.eventModel = (function () {
	function EventModel(requester) {
		this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/calendar/';
	}

    EventModel.prototype.getAllEvents = function () {
        var requestUrl = this.serviceUrl;
        this.requester.get(requestUrl, true);
    };

    EventModel.prototype.getUserEvents = function (userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        this.requester.get(requestUrl, true);
    };

    EventModel.prototype.addEvent = function (data) {
        var requestUrl = this.serviceUrl;
        this.requester.post(requestUrl, data, true);
    };

    EventModel.prototype.editEvent = function (data) {
        var requestUrl = this.serviceUrl + data._id;
        this.requester.put(requestUrl, data, true);
    };

    EventModel.prototype.deleteEvent = function (eventId) {
        var requestUrl = this.serviceUrl + 'delete/' + eventId;
        this.requester.delete(requestUrl, true);
    };

    return {
        load : function (requester) {
            return new EventModel(requester);
        }
    }
}());