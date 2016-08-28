class UsersController < ApplicationController
  wrap_parameters User

  def index
    render json: { hello: "fuck u"}
  end

  def create
    return User.find_or_create_by(user_params) if user_params[:fb_id]
    
    puts "Devise has its own invisible controller that overrides Users Controller"
    @user = User.new(user_params)

    if @user.save
      render json: {user: @user}
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id)
  end

end
