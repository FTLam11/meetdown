class ActionsController < ApplicationController
  wrap_parameters :action, include: [:verb_id, :topic_id]

  def create
    action = Action.new(action_params)

    unless action.save
      render json: { errors: action.errors.full_messages }
    end    
  end

  private

  def action_params
    params.require(:action).permit(:topic_id, :verb_id)
  end
end