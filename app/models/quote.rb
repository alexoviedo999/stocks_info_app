class Quote

  def initialize(ticker)
    ticker = ticker.upcase
    quote = YahooFinance::get_quotes(
              YahooFinance::StandardQuote,
              ticker)[ticker]
    last_trade = quote.lastTrade
    @stock = Stock.create( :name   => ticker,
                           :quote  => last_trade)
  end

  def short_quote
    @stock.short_quote
  end

end