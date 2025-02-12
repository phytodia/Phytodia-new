require "test_helper"

class RecipeSoapsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get recipe_soaps_new_url
    assert_response :success
  end

  test "should get create" do
    get recipe_soaps_create_url
    assert_response :success
  end
end
