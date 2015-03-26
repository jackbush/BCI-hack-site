require 'sinatra'
require 'artoo'
require 'mongoid'
require 'json' # POSSIBLY NOT NEEDED
require 'shotgun'
require 'faye/websocket'

# GEMS INCOMPATIBLE WITH ARTOO
# (sinatra?)
# require 'sinatra/contrib/all'
# require 'sinatra/json'
# require 'pry-byebug'
# require 'pry'

# # DB CONFIG
# configure do
#   Mongoid.load!('./config/mongoid.yml')
# end

# # LOAD MODELS
# before do
#   @models = Model
# end

get '/' do
  erb :index
end

# connection :neurosky, :adaptor => :neurosky, :port => '/dev/tty.MindWave'
# device :neurosky, :driver => :neurosky, :interval => 0.1

# def handle_eeg(sender, data)
#   puts "#{sender} | #{data}"
#   # data
# end

# test_hash = { delta: 7023617, theta: 15294464, lo_alpha: 15209472, hi_alpha: 13321984, lo_beta: 4527616, hi_beta: 12073472, lo_gamma: 862464, mid_gamma: 13637632 }
# test_range = *(70..79)
# test_num = test_range.sample



# options '/eeg' do
#   200
# end
# # get '/eeg' do
#   # THIS WORKS ONLY WHEN SEPARATED FROM ROUTE
# # work do
# #   on neurosky, :eeg => :handle_eeg
# # end
# # end

# options '/attention' do
#   200
# end
# get '/attention' do
#   work do
#     puts "SCANNING ATTENTION..."
#     on neurosky, :attention => :handle_eeg
#   end
# end

# options '/meditation' do
#   200
# end
# get '/meditation' do
#   work do
#     on neurosky, :meditation => :handle_eeg
#   end
# end

# # SAMPLE JSON ROUTE
# # get '/json' do
# #   content_type :json    
# #   headers 'Access-Control-Allow-Origin' => '*', 
# #           'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
# #           'Access-Control-Allow-Headers' => 'Content-Type' 
# #   json test
# # end

# # MIGHT-WORK REFACTORING OF THE ABOVE
# # options '/API/:type' do
# #   200
# # end
# # get '/API/:type' do
# #   work do
# #     on neurosky, :type => :handle_eeg
# #   end
# # end