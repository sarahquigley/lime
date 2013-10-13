class ListsController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def index
    @lists = current_user.lists
    render json: @lists
  end

  def create
    @list = current_user.lists.build(params[:list])

    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def update
    @list = List.find(params[:id])

    if @list.update_attributes(params[:list])
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: @list
  end

end
