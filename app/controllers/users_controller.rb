class UsersController < ApplicationController
  def index
    p "yoo"
    render json: { hello: "fuck u"}
  end

  def create
    p "AGEAGEASADAFWA"
    p user_params
    @user = User.find_or_create_by(user_params)

    if @user.errors.empty?
      render json: {user_details: @user}
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  def user_params
    p "hello"
    params.require(:user).permit(:email, :username, :password_digest, :zip_code, :age, :fb_id)
  end

end
