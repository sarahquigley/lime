class StaticPagesController < ApplicationController

  def home
    if user_signed_in?
      redirect_to 'static_pages#app'
    else
      render :home
    end
  end

  def app

  end

end
