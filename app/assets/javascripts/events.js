$(() => {
  console.log('event.js is loaded...')
  listenForNewAjaxEventClick()
  getEvents()
  getEventShow()
});


//AJAX LINK For New Form//
function listenForNewAjaxEventClick() {
  $('#ajax-new-event').on('click', function(event) {
    event.preventDefault()
    $('#new-event-modal').modal('show');
  });
}

function getEvents() {
  $("#get-ajax-events").on("click", function(e) {
  console.log('you just hit events')
   e.preventDefault()
   $(this).off('click');
    $.ajax({
     method: "GET",
     url: `${this.href}.json`
    }).done(function(response){
      // console.log('the data is: ', response)
      response.map(event => {
        let myEvent = new Event(event)
        let myEventHtml = myEvent.renderHTML()
        document.getElementById('ajax-events').innerHTML += myEventHtml

      })
    })
  })
}

class Event {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.guests = obj.guests
    this.renderHTML = function () {
        return(`
          <div>
          <p>${this.name}</p>
          <p>${this.description}</p>
          </div>
        `)
    };
  };
}



function getEventShow(id) {
  $(".get-event-show").one("click", function(e){
    console.log('you just hit an event show')
     e.preventDefault()
     $.ajax({
      method: "GET",
      url: `${this.href}.json`
    }).done(function(response){

      response.guests.map(function(guest) {
        // console.log(guest.user.name)
          let myGuest = new Guest(guest.user)
          let myGuestHtml = myGuest.renderHTML()
          document.getElementById('event-show').innerHTML += myGuestHtml
      })
    })
  })
}

class Guest{
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.email = obj.email
    this.renderHTML = function () {
        return(`
          <div>
          <p>${this.name}</p>
          <p>${this.email}</p>
          </div>
        `)
    };
  };
}

Guest.prototype.renderHTML = function () {

	return (`
			<h3>${this.name}</h3>
			<p>${this.email}</p>
	`)
}


        // $('#event-show').html('')
        // const parent = this.el.parentElement;
        // console.log(parent.children);
        // Array.prototype.forEach.call(parent.children, child => {
        //   console.log(child)
        // });
