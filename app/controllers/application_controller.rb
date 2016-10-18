class ApplicationController < ActionController::Base
  protect_from_forgery

  after_action :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def angular
    render 'layouts/application'
  end

  protected

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  def unique_name
    User.find(user_params[:id]).id
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
      Rails.application.secrets.aws_secret_access_key,
      s3_upload_policy)).gsub(/\n/, "")
  end
end
