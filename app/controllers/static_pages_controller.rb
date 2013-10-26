class StaticPagesController < ApplicationController

  before_filter :authenticate_user!, only: :app

  def home
    if user_signed_in?
      redirect_to app_url
    else
      render :home
    end
  end

  def app
    render :app
  end

end
