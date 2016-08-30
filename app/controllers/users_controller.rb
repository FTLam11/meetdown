class UsersController < ApplicationController
  wrap_parameters format: [:json]

  def index
    render json: { hello: "fuck u"}
  end

  def show
    user = User.find(params[:id])
    render json: {user: user}
  end

  def create
    user = User.find_or_create_by(user_params)
    render json: {user: user}
  end

  def update
    p params
    user = User.find(user_params[:id])
    user.zip_code= user_params[:zip_code]
    user.age = user_params[:age]
    user.save
    render json: {user: user}
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id,:id)
  end
end
