require 'sinatra'
require 'sinatra/contrib/all'
# require 'byebug'
require 'pry'

get '/' do
  erb :index
end