class InterestsController < ApplicationController
  def create
    interest = Interest.new(interest_params)
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end
end