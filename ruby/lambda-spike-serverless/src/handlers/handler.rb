# frozen_string_literal: true

require 'json'
require_relative '../common/helpers/requests_helper'
require_relative '../common/services/create_sqs_message_service'


def run(event:, context:)
  body = transform_event_body(event['body'])
  create_sqs_message(body)
end

def create_sqs_message(body)
  SqsAdapter.new.send_message(body.to_json)
  { statusCode: 200, body: JSON.generate(message: 'Message sent') }
rescue => error
  { statusCode: 500, body: JSON.generate(errors: error) }
end

def transform_event_body(body)
  Requests.new(body).call
end