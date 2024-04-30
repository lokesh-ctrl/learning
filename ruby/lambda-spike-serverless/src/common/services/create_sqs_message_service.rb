# frozen_string_literal: true

require_relative '../adapters/sqs_adapter'

class CreateSqsMessageService
  def initialize(params)
    @params = params
  end

  def call
    message = sqs_message(params)
    send_message(message)
  end

  private

  attr_reader :params

  def send_message(message)
    SqsAdapter.new.send_message(message)
  end

  def sqs_message(params)
    {
      channel_url: params[:channel_url],
      result: params[:result],
    }.to_json
  end
end