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
    p event
    if event.save
      render json: {event: event}
    end
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

  def showHostings
    user = User.find(params[:user])
    hostings = user.hosted_events
    render json: {hostings: hostings}
  end

  def showAttendings
    user = User.find(params[:user])
    attendings = user.attended_events
    render json: {attendings: attendings}
  end
    
  def update
  end

  def hostCreate
  end

  def attendeeCreate
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end

end