class UsersController < ApplicationController
  wrap_parameters User, include: [:email, :password,:fb_id,:username]

  def index
    render json: { hello: "fuck u"}
  end

  def create
    User.find_or_create_by(user_params)
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id)
  end

end
