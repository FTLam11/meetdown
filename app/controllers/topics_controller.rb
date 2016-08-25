class TopicsController < ApplicationController
  def show
    topic = Topic.find(params[:topic_id])
    render json: { topic: topic }
  end
end