class QuotesController < ApplicationController

  # /quotes/ibm/latest
  def latest
    stock = Quote.new(params[:ticker])
    render :json => stock.short_quote
  end

end