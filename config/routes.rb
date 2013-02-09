StocksInfoApp::Application.routes.draw do
  # authenticated :user do
  #   root :to => 'stocks#index'
  # end
  root :to => "stocks#index"
  devise_for :users
  resources :users

  resources :photo

  post '/stocks' => 'stocks#create'
  get '/stocks/:name' => 'stocks#show'

  get '/quotes/:ticker/latest' => 'quotes#latest'

end