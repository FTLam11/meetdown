require 'aws-sdk'

p ENV["AWS_REGION"]
p ENV["AWS_SECRET_KEY_ID"]
p ENV["AWS_SECRET_ACCESS_KEY"]

s3 = Aws::S3::Resource.new(
  credentials: Aws::Credentials.new(ENV["AWS_SECRET_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"]),
  region: ENV["AWS_REGION"]
  )

obj = s3.bucket('media.meetdown.info').object('puck')
obj.upload_file('/home/fronk/Downloads/dota2_sticker___puck_by_chroneco-d7u405r.png', acl:'public-read')
# p obj.public_url

require 'base64'
require 'openssl'
require 'digest/sha1'

def s3_access_token
  render json: {
    policy:    s3_upload_policy,
    signature: s3_upload_signature,
    key:       ENV[:aws_key]
  }
end

protected

  def s3_upload_policy
    @policy ||= create_s3_upload_policy
  end

  def create_s3_upload_policy
    Base64.encode64(
      {
        "expiration" => 1.hour.from_now.utc.xmlschema,
        "conditions" => [
          { "bucket" =>  ENV[:aws_bucket] },
          [ "starts-with", "$key", "" ],
          { "acl" => "public-read" },
          [ "starts-with", "$Content-Type", "" ],
          [ "content-length-range", 0, 10 * 1024 * 1024 ]
        ]
      }.to_json).gsub(/\n/,'')
  end

  def s3_upload_signature
    Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'), ENV[:aws_secret], s3_upload_policy)).gsub("\n","")
  end