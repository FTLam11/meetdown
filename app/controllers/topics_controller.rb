class TopicsController < ApplicationController
  def index
    topic = Topic.all
    render json: { topics: topic }
  end

  def show
    topic = Topic.find(params[:topic_id])
    render json: { topic: topic }
  end
end