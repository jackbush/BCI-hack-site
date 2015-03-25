require 'sinatra'
# require 'sinatra/contrib/all'
# require 'sinatra/json'
require 'json'
# require 'pry-byebug'
# require 'pry'
require 'artoo'

connection :neurosky, :adaptor => :neurosky, :port => '/dev/tty.MindWave'
device :neurosky, :driver => :neurosky, :interval => 0.1

def handle_feed(sender, data)
  content_type :json    
  headers 'Access-Control-Allow-Origin' => '*', 
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
          'Access-Control-Allow-Headers' => 'Content-Type' 
  json data
  # puts "#{sender} | #{data}"
end

test = [{thing: 4}]

get '/' do
  erb :index
end

get '/json' do
  # content_type :json    
  # headers 'Access-Control-Allow-Origin' => '*', 
  #         'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
  #         'Access-Control-Allow-Headers' => 'Content-Type' 
  # json test
end

options '/eeg' do
  200
end
get '/eeg' do
  work do
    on neurosky, :eeg => :handle_feed
  end
end

options '/attention' do
  200
end
get '/attention' do
  work do
    on neurosky, :attention => :handle_feed
  end
end

options '/meditation' do
  200
end
get '/meditation' do
  work do
    on neurosky, :meditation => :handle_feed
  end
end