/**
 * Created by user on 3/24/2016.
 */
var app = app || {};

app.eventViewBag = (function () {
	function showEvents(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ. data);
            $(selector).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            //TODO: redirect to add event page
                            location.href = '#/calendar/add/';
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editEvent').on('click', function() {
                            //TODO: redirect to edit event page
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/edit/' + calEvent._id})
                            });
                        });
                        $('#deleteEvent').on('click', function() {
                            //TODO: redirect to delete event page
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + calEvent._id})
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        });
	}

   function showAddEvent(selector) {
       $.get('templates/add-event.html', function (templ) {
           $(selector).html(templ);
           $('#addEvent').on('click', function () {
               var title = $('#title').val(),
                   start = $('#start').val(),
                   end = $('#end').val();

               Sammy(function () {
                   this.trigger('addEvent', {title : title, start : start, end : end});
               });
           });
       });
   }

    function showEditEvent(selector, data) {
        $.get('templates/edit-event.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editEvent').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    id = $(this).parent().attr('data-id');

                Sammy(function () {
                    this.trigger('editEvent', {title : title, start : start, end : end, _id : id});

                })
            })
        })
    }

    function showDeleteEvent(selector, data) {
        $.get('templates/delete-event.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteEvent').on('click', function () {
                var id = $(this).parent().attr('data-id');

                Sammy(function () {
                    this.trigger('deleteEvent', {id : _id});
                })
            })
        })
    }

    return {
        load : function () {
            return {
                showEvents : showEvents,
                showAddEvent : showAddEvent,
                showEditEvent : showEditEvent,
                showDeleteEvent : showDeleteEvent
            }
        }
    }
}());