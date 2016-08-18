class UsersController < ApplicationController
  def index
    render json: { hello: "fuck u"}
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      respond_with(@user)
    else
      respond_with(@user.errors.full_messages)
    end
  end

  def user_params
    params.require(:details).permit(:email, :username, :password_digest, :zip_code, :age, :fb_id)
  end
end
