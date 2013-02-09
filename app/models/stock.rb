class Stock < ActiveRecord::Base
  attr_accessible :name, :quote

  def short_quote
    {
      :quote  => quote,
      :time   => created_at.to_s(:db)
    }
  end

end