class TopicsController < ApplicationController
  wrap_parameters format: [:json]

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

  def zipTopics
    topics = User.where(zip_code: params[:id]).map { |user| user = user.topics }.flatten.uniq
    answer = topics.map { |topic| topic = {"topic": topic.name, "count": topic.users.count} }
    render json: {mahZip: answer}
  end

  def topic_params
    params.require(:topic).permit(:id, :zip_code)
  end
end