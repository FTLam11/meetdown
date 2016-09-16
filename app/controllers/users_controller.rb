class UsersController < ApplicationController
  wrap_parameters format: [:json]

  def index
    render json: { hello: "fuck u"}
  end

  def show
    user = User.find(params[:id])
    render json: {user: user}
  end

  def fbcreate
    p " Ywaewaead"
    @oauth = Koala::Facebook::OAuth.new("239604083106199", "1eecc231349d28d509386646978591a2", "")
    token = @oauth.get_access_token(params[:code])
    p "YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
    p token
    @graph = Koala::Facebook::API.new(token)
    profile = @graph.get_object("me")
    
    p profile
    user = User.find_or_create_by(fb_id: profile)
    render json: {user: user}
  end

  def update
    user = User.find(user_params[:id])
    user.zip_code= user_params[:zip_code]
    user.age = user_params[:age]
    user.save
    render json: {user: user}
  end

  def user_topics
    user = User.find(params[:id])
    render json: {user_topics: user.topics}
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id,:id, :code)
  end
end
