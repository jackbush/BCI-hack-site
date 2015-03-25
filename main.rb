require 'sinatra'
require 'json'
require 'artoo'

# # GEMS INCOMPATIBLE WITH ARTOO
# # require 'sinatra/contrib/all'
# # require 'sinatra/json'
# # require 'pry-byebug'
# # require 'pry'

connection :neurosky, :adaptor => :neurosky, :port => '/dev/tty.MindWave'
device :neurosky, :driver => :neurosky, :interval => 0.1

def handle_eeg(sender, data)
#   # content_type :json    
#   # headers 'Access-Control-Allow-Origin' => '*', 
#   #         'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
#   #         'Access-Control-Allow-Headers' => 'Content-Type' 
#   # json data

  puts "#{sender} | #{data}"

#   data
end

# test = [{thing: 4}]

get '/' do
  erb :index
end

# get '/json' do
#   # content_type :json    
#   # headers 'Access-Control-Allow-Origin' => '*', 
#   #         'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
#   #         'Access-Control-Allow-Headers' => 'Content-Type' 
#   # json test
# end

# options '/eeg' do
#   200
# end
# get '/eeg' do
  # work do
  #   on neurosky, :eeg => :handle_eeg
  # end
# end

# options '/attention' do
#   200
# end
# get '/attention' do
  # THIS WORKS AS IS, BUT STOPS WORKING WHEN OUTER FUNCTION IS COMMENTED IN
  work do
    puts "SCANNING ATTENTION..."
    on neurosky, :attention => :handle_eeg
  end
# end

# options '/meditation' do
#   200
# end
# get '/meditation' do
#   work do
#     on neurosky, :meditation => :handle_eeg
#   end
# end