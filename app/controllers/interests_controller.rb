class InterestsController < ApplicationController
  wrap_parameters :interest, include: [:user_id, :topic_id]

  def create
    if (JWT.decode params[:token], Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' })
      Interest.create(interest_params)
    else
      render json: {error: "You are not authorized to perform this action"}
    end
  end

  def destroy
    if (JWT.decode params[:token], Rails.application.secrets.hmac_secret, true, { :algorithm => 'HS256' })
      Interest.find_by(topic_id: interest_params[:topic_id], user_id: interest_params[:user_id]).destroy
    else
      render json: {error: "You are not authorized to perform this action"}
    end
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :topic_id)
  end
end