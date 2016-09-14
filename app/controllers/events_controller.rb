class EventsController < ApplicationController
  wrap_parameters format: [:json]

  def create
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