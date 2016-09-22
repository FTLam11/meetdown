require 'base64'
require 'openssl'
require 'digest/sha1'

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
    user = User.new(user_params)
    if user.save
      payload = user.as_json
      hmac_secret = 'bluballs'
      jwt = JWT.encode payload, hmac_secret, 'HS256'
      decoded_token = JWT.decode jwt, hmac_secret, true, { :algorithm => 'HS256' }
      p decoded_token
      render json: {token: jwt}
      else
      render json: {error: user.errors.full_messages}
    end
  end

  def fbcreate
    @oauth = Koala::Facebook::OAuth.new("239604083106199", "1eecc231349d28d509386646978591a2", "http://localhost:3000/")
    oauthtoken = @oauth.get_access_token(params[:code])
    @graph = Koala::Facebook::API.new(oauthtoken)
    profile = @graph.get_object("me")
    payload = User.find_or_create_by(fb_id: profile["id"]).as_json

    jwt = JWT.encode payload, Rails.application.secrets.hmac_secret, 'HS256'
    decoded_token = JWT.decode jwt, Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' }
    render json: {token: jwt}
  end

  def update
    if (JWT.decode params[:token], Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' })
      user = User.find(user_params[:id])
      user.zip_code= user_params[:zip_code]
      user.age = user_params[:age]
      user.save
      payload = user.as_json
      jwt = JWT.encode payload, Rails.application.secrets.hmac_secret, 'HS256'
      render json: {token: jwt}
    else
      render json: {error: "You're not authorized to perform this action"}
    end
  end

  def user_topics
    user = User.find(params[:id])
    render json: {user_topics: user.topics}
  end

  def s3_access_token
    render json: {
      policy: s3_upload_policy,
      signature: s3_upload_signature,
      key: ENV["AWS_SECRET_KEY_ID"]
    }
  end

  protected

  def unique_name
    ENV["counter"] += 1 #append user's unique column attribute
  end

  def s3_upload_policy
    @policy ||= create_s3_upload_policy
  end

  def create_s3_upload_policy
    Base64.encode64({
      expiration: 1.hour.from_now.utc.xmlschema,
      conditions: [
        {"bucket" => "media.meetdown.info"},
        ["starts-with", "$key",  ""],
        {"acl" => "public-read"},
        ["starts-with", "$Content-Type", "image/jpeg"],
        ["content-length-range", 0, 10 * 1024 * 1024]
      ]
      }.to_json).gsub(/\n/, "")
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id, :id, :code, :token)
  end
end
