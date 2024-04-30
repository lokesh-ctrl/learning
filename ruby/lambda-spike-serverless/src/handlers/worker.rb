# frozen_string_literal: true
require_relative '../common/helpers/requests_helper'
require_relative '../common/services/create_sqs_message_service'

REPLACEMENT_JOB_REGEX = /(?i)(?:(?:\bi\b(?!.{0,5}\bwas)|\bi am|\bi['’]ve|\bi['’]m).{0,10}(?:\bunable|\bcannot|\bcan['’]?t).{0,10}(?:\battend|\bvisit|\bwork)|(?:\bi\b(?!.{0,5}\bwas)|\bi am|\bi
      ['’]ve|\bi['’]m).{0,15}(?:(?<!\bwon['’]t\b.{5,5})\bbe\b|(?<!\bnot\b.{5,5})\bgoing|\bdoing|\bbooked|\btaking).{0,20}
      (?:\bholiday(?!.{0,5}\brate)|\btrip|\btravelling|\boverseas|\baway|\bvacation|\bbreak\b)|(?:\bi\b(?!.{0,5}\bwas)|\bi am|\bi['’]ve|\bi
      ['’]m).{0,25}(?:\bsick|covid(?!.{0,5}(?:\bvac|\bneg|\binjection)
      )|\bflu\b|\bill|\bunwell|\bcrook|\bgastro|\bcold\b(?!.{0,5}(?:\bweather|\bwater|\bpack)
      )|\bhurt|\binjured|\bbroke|\bemergency|\bpostpone|(?<!\bhop.{20,20})\bsurgery)|\bbe\b.{0,5}unavailable|(?:\bsorry|\bapolog|\bexcus).{0,45}(?:\blate|\bshort).{0,5}notice)/x

def run(event:, context:)
  params = transform_event_body(event['Records'][0]['body'])
  puts params
  puts params[:payload]["message"]
  puts params[:channel]['channel_url']
  create_sqs_message({ :channel_url => params[:channel]['channel_url'], :result => true }) if check_cancellation_for_message(params[:payload]["message"])
end

def transform_event_body(body)
  Requests.new(body).call
end

def check_cancellation_for_message(message)
  message.match?(REPLACEMENT_JOB_REGEX)
end

def create_sqs_message(body)
  puts "sending result message"
  puts body
  CreateSqsMessageService.new(body).call
  { statusCode: 200, body: JSON.generate(message: 'Message sent', body: body) }
rescue => error
  { statusCode: 500, body: JSON.generate(errors: error) }
end