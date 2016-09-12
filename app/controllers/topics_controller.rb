class TopicsController < ApplicationController
  wrap_parameters format: [:json]

  def index
    topics = Topic.all
    ruby_topics = []

    topics.each do | topic |
      ruby_hash = Hash.new
      ruby_hash[:id] = topic[:id]
      ruby_hash[:name] = topic[:name]
      ruby_hash[:count] = topic.users.count
      ruby_hash[:verbs] = topic[:verbs]
      ruby_topics << ruby_hash
    end
    p ruby_topics
    render json: { topics: ruby_topics }
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
    answer = topics.map { |topic| topic = {"name": topic.name, "count": topic.users.count, "id": topic.id} }
    answer.sort_by! {| topic_hash | -topic_hash.count }.reverse!
    render json: {mahZip: answer.take(10)}
  end

  def topic_params
    params.require(:topic).permit(:id, :zip_code)
  end
end