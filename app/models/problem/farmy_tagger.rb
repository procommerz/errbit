module Problem::FarmyTagger
  def determine_farmy_problem
    where = self.where
    where = notices.last.try(:backtrace).try(:lines).to_a[0].try(:[], "file") if where == 'unknown' || where == nil
    user_agent = user_agents.map { |a| a[1]["value"] }.last

    family = 'unknown'
    severity = 'medium'
    component = 'unknown'

    if message['[safely]']
      severity = 'very-low'
    elsif message['NoMethodError: undefined method']
      severity = 'critical'
    end

    if error_class.in?(["PG::CharacterNotInRepertoire"])
      family = 'bad-user-input'
      severity = 'very low'
    end

    if where['spree/api/frontend/products#autosuggest']
      component = 'search'
      family = 'frontend-api'
      severity = 'low' if message['JSON::GeneratorError: source sequence']
    end

    if message['Der eingegebene Gutschein-Code existiert nicht']
      family = 'bad-user-input'
      component = 'checkout-discounts'
      severity = 'very low'
    end

    if message['URI::InvalidURIError']
      family = 'bad-user-input'
      component = 'rack'
      severity = 'low'
    end

    if where['app/models/spree/package_return']
      family = 'erp'
      component = 'backend'
    end

    family = 'frontend-api' if where['api/frontend'] and family == 'unknown'
    family = 'packing' if where['api/packing'] and family == 'unknown'
    family = 'backend-api' if where['api/backend'] and family == 'unknown'

    family = 'sidekiq' if where['app/workers']
    # Some solid rules
    component = 'erp' if where['order_send_xpertour_notification_worker.rb']
    family = 'rake' if where['rake#'] and family == 'unknown'

    # Override family for bots
    if user_agent['bingbot']
      family = 'bot-requests'
      severity = 'very low'
    end

    # Push-down critical severity for known low-severity cases, based on 'where'
    severity = 'low' if where['app/models/spree/package_return.rb'] and severity == 'critical'
    severity = 'low' if where['rake#farmy:instagram:get_farmy_feed']

    self.family = family
    self.severity = severity
    self.component = component
  end
end