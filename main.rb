require 'sinatra'
require 'sinatra/contrib/all'
require 'sinatra/json'
require 'json'
require 'pry-byebug'
require 'pry'
require 'artoo'

connection :neurosky, :adaptor => :neurosky, :port => '/dev/tty.MindWave'
device :neurosky, :driver => :neurosky, :interval => 0.1

def handle_eeg(sender, data)
  puts data
end

eeg = [
  # the below creats a feed of brain value hashes
  work do
    on neurosky, :eeg => :handle_eeg
  end
]

before do
  content_type :json    
  headers 'Access-Control-Allow-Origin' => '*', 
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
          'Access-Control-Allow-Headers' => 'Content-Type' 
end

options '/eeg' do
  200
end

get '/eeg' do
  json eeg
end

get '/' do
  erb :index
end