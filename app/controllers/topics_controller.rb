class TopicsController < ApplicationController
  def index
    topic = Topic.all
    render json: { topics: topic }
  end

  def show
    topic = Topic.find(params[:id])
    render json: { topic: topic }
  end

  def zipCount
  	topic = Topic.find(params[:id])
  	a = topic.users.group(:zip_code).count
  	render json: {zip_codes: a}
  end

  def topic_params
    params.permit(:id)
  end

end