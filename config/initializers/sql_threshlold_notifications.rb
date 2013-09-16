if Rails.env.production? && Settings.logger.query_ms_threshold.to_i > 0
  Rails.logger.warn "Logging all sql.active_record notifications with threshold > #{Settings.logger.query_ms_threshold.to_i}ms"
  ActiveSupport::Notifications.subscribe "sql.active_record" do |_, start, finish, _, payload|
    if ((finish - start) * 1000 > Settings.logger.query_ms_threshold)
      Rails.logger.error "SLOW QUERY: #{((finish - start) * 1000).to_i}ms: #{payload[:sql].strip}"
    end
  end
end