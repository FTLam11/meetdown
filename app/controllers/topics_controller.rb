class TopicsController < ApplicationController
  wrap_parameters format: [:json]

  def index
    topics = Topic.all
    ruby_topics = Array.new

    topics.each do | topic |
      ruby_hash = Hash.new
      ruby_hash[:id] = topic[:id]
      ruby_hash[:name] = topic[:name]
      ruby_hash[:count] = topic.users.count
      ruby_hash[:verbs] = topic[:verbs]
      ruby_topics << ruby_hash
    end

    render json: { topics: ruby_topics }
  end

  def show
    topic = Topic.find(params[:id])
    render json: { topic: topic }
  end

  def zipCount
    topic = Topic.find(params[:id])
    user_zipcode_map = topic.users.group(:zip_code).count

    render json: {zip_codes: user_zipcode_map}
  end

  def zipTopics
    all_topics_in_a_zipcode = User.where(zip_code: params[:zip_code]).map { |user| user = user.topics }.flatten.uniq
    topics_by_popularity = all_topics_in_a_zipcode.map { |topic| topic = {"name": topic.name, "count": topic.users.where(zip_code: params[:zip_code]).count, "id": topic.id} }.sort_by! {| topic_hash | -topic_hash[:count] }
    zipcode=Zipcode.find_by(zipcode: params[:zip_code])
    render json: {topics_in_my_zip: topics_by_popularity.take(10), events: zipcode.eventsNearby}
  end

  def suggest
    Suggestion.create(body: params[:body])
  end

  def topic_params
    params.require(:topic).permit(:id, :zip_code, :body)
  end
end