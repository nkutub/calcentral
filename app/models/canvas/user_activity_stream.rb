module Canvas
  class UserActivityStream < Proxy

    include Cache::UserCacheExpiry

    def user_activity
      wrapped_get request_path
    end

    private

    def mock_json
      read_file('fixtures', 'json', 'canvas_user_activity.json')
    end

    def request_path
      "users/self/activity_stream?as_user_id=sis_login_id:#{@uid}&only_active_courses=true"
    end

  end
end
