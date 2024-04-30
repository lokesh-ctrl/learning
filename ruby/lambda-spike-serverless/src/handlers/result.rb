# frozen_string_literal: true
require_relative '../common/helpers/requests_helper'

def run(event:, context:)
  params = transform_event_body(event['Records'][0]['body'])
  puts params
  { statusCode: 200, body: JSON.generate(message: 'Result received', body: params) }
end

def transform_event_body(body)
  Requests.new(body).call
end