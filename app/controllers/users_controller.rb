class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def index
    @users = User.all
    # respond_to do |format|
    #   format.html {render :index}
    #   format.json  { render json: @users}
    # end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.name.downcase
    @user.save
    # every user created also gets a host id and guest id
    @user.host = Host.create
    @user.guest = Guest.create

    if @user && @user.save
      session[:user_id] = @user.id
      flash[:success] = "You've successfully created an account!"
      redirect_to user_path(@user)
    else
      flash[:danger] = "Please enter a valid email & valid password"
      render :new #error; show user the form again
    end
  end

  def show
    # @user = User.find(current_user.id)
    # redirect_to root_path unless session[:user_id]
    @user = User.find(current_user.id)
    # render json: @user, status: 200

  end

# user will not be able to delete their profile because they have been invited to an event
  # def destroy
  #   if current_user.id == @user.id
  #     @event_guests = EventGuest.find_by(guest_id: current_user.guest.id)
  #     @user.destroy
  #   end
  #   redirect_to root_path, flash: {success: "Your account has been deleted!"}
  # end


private

  def set_user
    @user = User.find_by(id: params[:id])
  end


  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :email)
  end

end
