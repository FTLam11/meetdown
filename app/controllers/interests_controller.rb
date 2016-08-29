class InterestsController < ApplicationController
  wrap_parameters format: [:json]

  def create
    interest = Interest.new(interest_params)

    unless interest.save?
      render json: { errors: interest.errors.full_messages }
    end
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end
end