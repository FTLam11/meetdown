class InterestsController < ApplicationController
  wrap_parameters :interest, include: [:user_id, :topic_id]

  def create
    interest_manager(Interest.create(interest_params))
  end

  def destroy
    interest_manager(Interest.find_by(topic_id: interest_params[:topic_id], user_id: interest_params[:user_id]).destroy)
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end
end