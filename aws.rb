require 'aws-sdk'

s3 = Aws::S3::Resource.new(
  credentials: Aws::Credentials.new(ENV["AWS_SECRET_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"]),
  region: ENV["AWS_REGION"]
  )

obj = s3.bucket('media.meetdown.info').object('puck')
obj.upload_file('/home/fronk/Downloads/dota2_sticker___puck_by_chroneco-d7u405r.png', acl:'public-read')
# p obj.public_url