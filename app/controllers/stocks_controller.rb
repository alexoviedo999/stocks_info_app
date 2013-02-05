class StocksController < ApplicationController
  def index
  end

  def create
    get_quote(params[:name])
    render :nothing => true
  end

  def dashboard
    data = {}
    stocks = Stock.select("name").uniq
    stocks.each {|s| get_quote(s.name)}
    stocks.each {|s| data[s.name] = Stock.where(:name => s.name)}
    render :json => data
  end

  private
  def get_quote(name)
    name = name.upcase
    quote = YahooFinance::get_quotes(YahooFinance::StandardQuote, name)[name].lastTrade
    Stock.create(:name => name, :quote => quote)
  end
end
