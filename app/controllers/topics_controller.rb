class TopicsController < ApplicationController
  def index
    topic = Topic.all
    render json: { topics: topic }
  end

  def show
    topic = Topic.find(params[:id])
    render json: { topic: topic }
  end

  def sortbyzip
  	topic = Topic.find(params[:id])
  	a = topic.users.group(:zip_code).count
  	render json: a
  end
end