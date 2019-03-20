class EventsController < ApplicationController
  before_action :set_event, only: [:index, :show, :edit, :update, :destroy]
  before_action :set_user, only: [:index, :create, :show, :edit, :update, :destroy]
  # skip_before_action :set_host, only: [:test]
  before_action :set_host, only: [:show, :edit]

  def test
    @events = Event.all
  end

  def index
    @event = Event.new
    @users = User.all
    @invites = @user.guest.events.sort_by { |obj| obj.created_at }
    @events = @user.host.events
  #     respond_to do |format|
  #     #  format.html {render :index}
  #       format.json  { render :json => {:events => @events, :invites => @invites}}
  #     end
  # @events = Event.find(params[:user_id]) if current_user
  # render json: @events
     respond_to do |format|
        format.html {render :index}
        format.json  { render json: @events}
      end


  end


  def new
    @event = Event.new
    @users = User.all
  end

  def create
      @event = Event.create(event_params)
      @event.host = current_user.host
      @users = User.all

      # @event.guest_ids = params[:event][:guest]
      if !params[:event][:guest].blank?
          params[:event][:guest].each do |id|
            #finds guests and adds them to event's guest list
            @event.guests << Guest.find_or_create_by(user_id: id)
            @event.save
            @user.host.events << @event
          end
          redirect_to user_events_path, flash: {success: "#{@event.name} is created!"}
      else
        render :new, flash: {danger: "Please enter all fields."}
      end
    end

  def show
    @event = Event.find(params[:id])
    @guests = @event.event_guests
    @invites = @user.guest.events
    @eventguest = EventGuest.find_by(guest_id: current_user.guest.id, event_id: params[:id])
    @truehost = @host.user.id == current_user.id
    respond_to do |format|
      format.html {render :show}
      format.json  { render :json => {:event => @event, :guests => @guests}}
    end
  end

  def edit
    @guests = @event.guests
    if @host.user.id != @user.id
      redirect_to user_path, flash: {danger: "Only the host is able to edit."}
    end
  end

  def update
    # binding.pry
    if @event.update(event_params)
      redirect_to user_event_path(@user, @event), flash: {success: "#{@event.name} was updated!"}
    elsif @event.event_guests.update
      redirect_to user_event_path(@user, @event), flash: {success: "#{@event.name} was updated!"}
    else
      render :edit, flash: {danger: "Please login first!"}
    end
  end

  def destroy
    @event.event_guests.destroy_all
    @event.delete
    redirect_to user_events_path, flash: {success: "'#{@event.name}' was deleted!"}
  end


  private

  def set_host
    # binding.pry
    @host = Host.find(current_user.host.id)
  end

  def set_user
    @user = current_user
  end

  def set_event
    @event = Event.find_by(id: params[:id])
  end

  def eventguest_params
    @eventguest = EventGuest.find_by(guest_id: current_user.guest.id, event_id: params[:id])
    @rsvp = @eventguest.rsvp
  end

  def event_params
    # binding.pry
    params.require(:event).permit(
        :name,
        :location,
        :date,
        :description,
        :guests
      )
  end

end
