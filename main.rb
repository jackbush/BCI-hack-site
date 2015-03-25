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
  puts "#{sender} | #{data}"
  # data
end

test_hash = { delta: 7023617, theta: 15294464, lo_alpha: 15209472, hi_alpha: 13321984, lo_beta: 4527616, hi_beta: 12073472, lo_gamma: 862464, mid_gamma: 13637632 }
test_range = *(70..79)
test_num = test_range.sample

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
    on neurosky, :eeg => :handle_eeg
  end
end

options '/attention' do
  200
end
# get '/attention' do
  # THIS WORKS ONLY WHEN SEPARATED FROM ROUTE
  work do
    puts "SCANNING ATTENTION..."
    on neurosky, :attention => :handle_eeg
  end
# end

options '/meditation' do
  200
end
get '/meditation' do
  work do
    on neurosky, :meditation => :handle_eeg
  end
end