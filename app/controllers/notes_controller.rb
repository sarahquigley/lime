class NotesController < ApplicationController

  before_filter :authenticate_user!
  respond_to :json

  def index
    @notes = current_user.notes
    render json: @notes
  end

  def create
    @task = Task.find(params[:task_id])
    @note = @task.notes.build(params[:note])
    
    if @note.save
      render json: @note
    else
      render json: { errors: @note.errors.full_messages }, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
    
    if @note.update_attributes(params[:note])
      render json: @note
    else
      render json: { errors: @note.errors.full_messages }, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render json: @note
  end

end
