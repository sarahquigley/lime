class StaticPagesController < ApplicationController

  def home
    if user_signed_in?
      redirect_to app_url
    else
      render :home
    end
  end

  def app

  end

end
