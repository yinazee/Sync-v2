Event.prototype.newEventForm = function() {
  return ('
  <strong>New Event</strong>
  <form>
    <input id='event-name' type='text' name='name'></input><br>
    <input type='text' name='description'></input><br>
    <input type='submit'/>
    </form>
  ')
}
