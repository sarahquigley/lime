class TasksController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.build(params[:task])
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(params[:task])
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render json: @task
  end

end
