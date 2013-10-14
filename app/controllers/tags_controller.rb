class TagsController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def index
    @tags = current_user.tags
    render json: @tags
  end

  def create
    @tag = current_user.tags.build(params[:tag])

    if @tag.save
      render json: @tag
    else
      render json: { errors: @tag.errors.full_messages }, status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])

    if @tag.update_attributes(params[:tag])
      render json: @tag
    else
      render json: { errors: @tag.errors.full_messages }, status: 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render json: @tag
  end

end
