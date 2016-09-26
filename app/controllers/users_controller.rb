require 'base64'
require 'openssl'
require 'digest/sha1'

class UsersController < ApplicationController
  wrap_parameters format: [:json, :multipart_form]

  def index
    render json: { hello: "fuck u"}
  end

  def show
    user = User.find(params[:id])
    render json: {user: user}
  end

  def create
    user = User.new(user_params)
    if user.save!
      payload = user.as_json
      jwt = JWT.encode payload, Rails.application.secret.hmac_secret, 'HS256'
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
      user.update!(user_params)
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
    if (JWT.decode params[:token], Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' })
      render json: {
        key: unique_name.to_s + params[:key].gsub(/\s+/, ""),
        policy: s3_upload_policy,
        signature: s3_upload_signature,
        AWSAccessKeyId: ENV["AWS_SECRET_KEY_ID"]
      }
    else
      render json: {error: "You are not authorized to perform this action"}
    end
  end

  def new_session
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(params[:password])
      payload = user.as_json
      jwt = JWT.encode payload, Rails.application.secret.hmac_secret, 'HS256'
      render json: {token: jwt}
    else
      render json: {error: "Invalid email and/or password combination."}
    end 
  end

  protected

  def unique_name
    user_id = User.find(user_params[:id]).id
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
        {"Content-Type" => "image/jpeg"},
        ["content-length-range", 0, 10 * 1024 * 1024]
      ]
      }.to_json).gsub(/\n/, "")
  end

  def s3_upload_signature
    Base64.encode64(OpenSSL::HMAC.digest(
      OpenSSL::Digest::Digest.new('sha1'),
      ENV["AWS_SECRET_ACCESS_KEY"],
      s3_upload_policy)).gsub(/\n/, "")
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id, :id, :code, :token, :key, :AWSAccessKeyId, :acl, :success_action_redirect, :policy, :signature, "Content-Type", :file, :picture)
  end
end
