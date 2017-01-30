class TopicsController < ApplicationController
  wrap_parameters format: [:json]

  def index
    topics = Topic.getAll

    render json: { topics: topics }
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
    topics_by_popularity = Zipcode.getSelfTopics(params[:zip_code])
      .map { |topic| {"name": topic.name, "count": topic.users.where(zip_code: params[:zip_code]).count, "id": topic.id} }
      .sort_by! {| topic_hash | -topic_hash[:count] }
    zipcode = Zipcode.find_by(zipcode: params[:zip_code])
    center = JSON.parse(zipcode.center)

    render json: {topics_in_my_zip: topics_by_popularity.take(10), events: zipcode.eventsNearby, center: center}
  end

  def suggest
    Suggestion.create(body: params[:body])

    render json: {status: 201}, status: 201
  end

  def topic_params
    params.require(:topic).permit(:id, :zip_code, :body)
  end
end