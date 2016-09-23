class EventsController < ApplicationController
  wrap_parameters format: [:json]

  def create
    event = Event.new
    event.name = params[:name]
    event.location = params[:location]
    event.address = params[:address]
    event.description = params[:description]
    event.host = User.find(params[:user]) if (JWT.decode params[:token], hmac_secret, true, { :algorithm => 'HS256' })
    event.attendees << User.find(params[:user]) if (JWT.decode params[:token], hmac_secret, true, { :algorithm => 'HS256' })
    if event.save
      render json: {event: event}
    end
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