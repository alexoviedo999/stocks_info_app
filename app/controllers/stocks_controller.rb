class StocksController < ApplicationController
  def index
    @stocks = Stock.select("name").uniq
  end

  # /stocks/ibm
  def show
    name = params[:name].upcase
    @stocks = Stock.where(:name => name).
                map { |stock| stock.short_quote }
    render :json => @stocks
  end

  def create
    @stock = Quote.new(params[:name])
    render :json => @stock.short_quote
  end

  # def dashboard
  #   data = {}
  #   stocks = Stock.select("name").uniq
  #   stocks.each { |s|
  #     data[s.name] = Stock.where(:name => s.name).
  #                     map { |stock| stock.short_quote }
  #   }
  #   render :json => data
  # end

end
