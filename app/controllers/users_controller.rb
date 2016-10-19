require 'base64'
require 'openssl'
require 'digest/sha1'

class UsersController < ApplicationController
  wrap_parameters format: [:json, :multipart_form]

  def show
    user = User.find(params[:id])
    render json: {user: user, topics: user.topics, hostings: user.hostings, attendings: user.attendings}
  end

  def create
    user = User.new(user_params)
    user.password = params[:password]
    if user.save
      payload = user.as_json
      jwt = JWT.encode payload, Rails.application.secrets.hmac_secret, 'HS256'
      render json: {token: jwt}
    else
      render json: {error: user.errors.full_messages}
    end
  end

  def fbcreate
    @oauth = Koala::Facebook::OAuth.new(Rails.application.secrets.fb_client_id, Rails.application.secrets.fb_secret_key, "http://ruby-pg-env.vnmyh7yq7h.us-east-1.elasticbeanstalk.com/")
    oauthtoken = @oauth.get_access_token(params[:code])
    @graph = Koala::Facebook::API.new(oauthtoken)
    profile = @graph.get_object("me")
    payload = User.find_or_create_by(username: profile["name"], fb_id: profile["id"]).as_json
    jwt = JWT.encode payload, Rails.application.secrets.hmac_secret, 'HS256'
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
        AWSAccessKeyId: Rails.application.secrets.aws_secret_key_id
      }
    else
      render json: {error: "You are not authorized to perform this action"}
    end
  end

  def new_session
    user = User.find_by(email: user_params[:email])
    if user && user.is_password?(params[:password])
      payload = user.as_json
      jwt = JWT.encode payload, Rails.application.secrets.hmac_secret, 'HS256'
      render json: {token: jwt}
    else
      render json: {error: "Invalid email and/or password combination."}
    end 
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :zip_code, :age, :fb_id, :id, :code, :token, :key, :AWSAccessKeyId, :acl, :success_action_redirect, :policy, :signature, "Content-Type", :file, :picture)
  end
end
