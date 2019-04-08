$(function() {
  console.log('event.js is loaded...')
  getNewEvent()
  getEvents()
  getEventShow()
});

function getNewEvent(){
  $('form').submit(function(event) {
    //prevent form from submitting the default way
    event.preventDefault();
    let values = $(this).serialize();
      $.post(`${this.action}`, values).done(function(data) {
        console.log(data)
        $('#app-container').html('')
        const newEvent = new Event(data)
        const htmlToAdd = newEvent.renderHTML()
        $("#app-container").html(htmlToAdd)
    });
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
      $('#app-container').html('')
      response.map(event => {
        let myEvent = new Event(event)
        let myEventHtml = myEvent.renderHTML()
        document.getElementById('app-container').innerHTML += myEventHtml

      })
    })
  })
}

class Event {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.location = obj.location
    this.description = obj.description
    this.guests = obj.guests
    // this.renderHTML = function () {
    //     return(`
    //       <div>
    //       <p>${this.name}</p>
    //       <p>${this.description}</p>
    //       </div>
    //     `)
    // };
  };
}

Event.prototype.renderHTML = function () {
  let guests = this.guests.map(guest => {
    return (`
      <p>${guest.user.name}</p>
      <p>${guest.user.email}</p>
`)
  }).join('')
	return (`
			<h3>${this.name}</h3>
      <p>${this.location}</p>
			<p>${this.description}</p>
      <p>${guests}</p>
	`)
}


function getEventShow(id) {
  $(".get-event-show").one("click", function(e){
    console.log('you just hit an event show')
     e.preventDefault()
     $.ajax({
      method: "GET",
      url: `${this.href}.json`
    }).done(function(event){
        $('#app-container').html('')
      let myEvent = new Event(event)
      let myEventHtml = myEvent.renderHTML()
      document.getElementById('app-container').innerHTML += myEventHtml

      })
    })
  }
