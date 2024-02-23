require "test_helper"

class ToolsControllerTest < ActionDispatch::IntegrationTest
  test "should get saponification" do
    get tools_saponification_url
    assert_response :success
  end
end
