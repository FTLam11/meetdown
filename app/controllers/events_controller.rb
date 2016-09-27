class EventsController < ApplicationController
  wrap_parameters format: [:json]

  def create
    event = Event.new
    event.name = params[:name]
    event.location = params[:location]
    event.description = params[:description]
    hmac_secret = 'bluballs'
    event.hosts << User.find(params[:user]) if (JWT.decode params[:token], hmac_secret, true, { :algorithm => 'HS256' })
    event.attendees << User.find(params[:user]) if (JWT.decode params[:token], hmac_secret, true, { :algorithm => 'HS256' })
    if event.save
      render json: {event: event}
    end
  end

  def s3_access_token
    render json: {
      key: unique_name.to_s + params[:key].gsub(/\s+/, ""),
      policy: s3_upload_policy,
      signature: s3_upload_signature,
      AWSAccessKeyId: ENV["AWS_SECRET_KEY_ID"]
    }
  end

  def userEventList
    user = User.find(params[:id])
    hostings = user.hosted_events
    attendings = user.attended_events
    render json: {attendings: attendings, hostings: hostings}
  end

  def cancelAttend
    event = Event.find(params[:event_id])
    user = User.find(params[:user_id])
    Attending.find_by(user: user, event: event).destroy
  end

  def createAttend
    event = Event.find(params[:event_id])
    event.attendees << User.find(params[:user_id])
    render json: {attendees: event.attendees}
  end

  def showAttendees
    event = Event.find(params[:id])
    render json: {attendees: event.attendees, hosts: event.hosts}
  end
    
  def update
    if (JWT.decode params[:token], Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' })
      event = Event.find(params[:id])
      event.picture = params[:picture]
      event.save
      render json: {event: event}
    else
      render json: {error: "You're not authorized to perform this action"}
    end
  end

  def show
    event = Event.find(params[:id])
    render json: {event: event}
  end

  def hostCreate
  end

  def attendeeCreate
  end

  private

  def unique_name
    User.find(params[:id]).id
  end

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end

end