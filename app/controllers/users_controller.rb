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
    "returning a token yo"
  end

  def fbcreate
    @oauth = Koala::Facebook::OAuth.new("239604083106199", "1eecc231349d28d509386646978591a2", "http://localhost:3000/")
    oauthtoken = @oauth.get_access_token(params[:code])
    @graph = Koala::Facebook::API.new(oauthtoken)
    profile = @graph.get_object("me")
    payload = {user: User.find_or_create_by(fb_id: profile["id"])}

    hmac_secret = 'bluballs'
    jwtToken = JWT.encode payload, hmac_secret, 'HS256'
    p decoded_token = JWT.decode token, hmac_secret, true, { :algorithm => 'HS256' }
    render json: {token: jwtToken}
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
