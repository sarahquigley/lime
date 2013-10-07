class ListsController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def index
    @lists = current_user.lists.include
    render json: @list
  end

  def create
    @list = List.new(params[:list])
    @task.user = current_user

    if @list.save
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update
    @list = List.find(param[:id])

    if @list.update_attributes(params[:list])
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: @list
  end

end