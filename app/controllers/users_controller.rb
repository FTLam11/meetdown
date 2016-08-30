class UsersController < ApplicationController
  wrap_parameters format: [:json]

  def index
    render json: { hello: "fuck u"}
  end

  def create
    user = User.find_or_create_by(user_params)
    render json: {user: user}
  end

  def update
    render json: {text: "fuck yeah"}
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id)
  end
end
