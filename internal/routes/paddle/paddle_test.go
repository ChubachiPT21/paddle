package paddle_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/ChubachiPT21/paddle/internal/models"
	"github.com/ChubachiPT21/paddle/internal/routes/paddle"
	"github.com/ChubachiPT21/paddle/internal/usecase"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
	"github.com/golang/mock/gomock"
)

func TestGetFeedsHandler_handle(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := models.NewMockFeedRepository(ctrl)
	mock.EXPECT().All(gomock.Any()).DoAndReturn(func(_ int64) (orm.FeedSlice, error) {
		return orm.FeedSlice{}, nil
	})

	t.Run("return 200", func(t *testing.T) {
		routeStruct := paddle.GetFeeds(mock)[0]

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Params = gin.Params{gin.Param{Key: "id", Value: "1"}}

		routeStruct.Handler(c)
		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}

func TestGetSourcesHandler_handle(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := models.NewMockSourceRepository(ctrl)
	mock.EXPECT().All().DoAndReturn(func() (orm.SourceSlice, error) {
		return orm.SourceSlice{}, nil
	})

	t.Run("return 200", func(t *testing.T) {
		routeStruct := paddle.GetSources(mock)[0]

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		routeStruct.Handler(c)
		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}

func TestCreateSourceHandler_receive(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	usecaseMock := usecase.NewMockCreateSourceInterface(ctrl)
	usecaseMock.EXPECT().CreateSource(gomock.Any(), gomock.Any()).DoAndReturn(func(token string, _ *orm.Source) error {
		return nil
	})

	t.Run("return 200", func(t *testing.T) {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		body := strings.NewReader("") // 空でもbodyがないとtestを通らない
		c.Request, _ = http.NewRequest("POST", "v1/sources", body)
		c.Request.Header.Set("Content-Type", "application/x-www-form-urlencoded") // typeは適当です
		store := cookie.NewStore([]byte("secret"))
		handler := sessions.Sessions("paddleSession", store)
		handler(c)

		session := sessions.Default(c)
		session.Set("token", "適当なトークン") // FindByTokenをstub化しているのでtokenは存在していればよい

		routeStruct := paddle.CreateSource(usecaseMock)[0]
		routeStruct.Handler(c)

		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}
func TestCreateInterestHandler_receive(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := models.NewMockInterestRepository(ctrl)
	mock.EXPECT().Create(gomock.Any()).DoAndReturn(func(_ int64) error {
		return nil
	})

	t.Run("return 200", func(t *testing.T) {
		routeStruct := paddle.CreateInterest(mock)[0]
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Params = gin.Params{gin.Param{Key: "feed_id", Value: "1"}}

		body := strings.NewReader("")
		c.Request, _ = http.NewRequest("POST", "/sources/:id/feeds/:feed_id/interest", body)
		c.Request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		routeStruct.Handler(c)
		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}

func TestCreateFeedsHandler_receive(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := usecase.NewMockCreateFeedInterface(ctrl)
	mock.EXPECT().CreateFeed(gomock.Any()).DoAndReturn(func(_ int64) error {
		return nil
	})

	t.Run("return 200", func(t *testing.T) {

		routeStruct := paddle.CreateFeeds(mock)[0]

		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Params = gin.Params{gin.Param{Key: "id", Value: "1"}}

		routeStruct.Handler(c)
		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}

func TestUnfollowHandler_unfollow(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	userID := int64(1)

	userMock := models.NewMockUserRepository(ctrl)
	userMock.EXPECT().FindByToken(gomock.Any()).DoAndReturn(func(_ string) (*orm.User, error) {
		return &orm.User{ID: userID}, nil
	})

	sourceMock := models.NewMockSourceRepository(ctrl)
	sourceMock.EXPECT().Find(gomock.Any()).DoAndReturn(func(_ int64) (*orm.Source, error) {
		return &orm.Source{UserID: userID}, nil
	})
	sourceMock.EXPECT().Delete(gomock.Any()).DoAndReturn(func(_ int64) error {
		return nil
	})

	feedMock := models.NewMockFeedRepository(ctrl)
	feedMock.EXPECT().DeleteAll(gomock.Any()).DoAndReturn(func(_ int64) error {
		return nil
	})

	t.Run("return 200", func(t *testing.T) {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Params = gin.Params{gin.Param{Key: "id", Value: "1"}}
		req, _ := http.NewRequest("DELETE", "/v1/sources/1", nil) // Requestがあればよいのでパスは適当でよいはず
		c.Request = req

		store := cookie.NewStore([]byte("secret"))
		handler := sessions.Sessions("paddleSession", store)
		handler(c)

		session := sessions.Default(c)
		session.Set("token", "適当なトークン") // FindByTokenをstub化しているのでtokenは存在していればよい

		routeStruct := paddle.Unfollow(userMock, sourceMock, feedMock)[0]
		routeStruct.Handler(c)
		assert.Equal(t, http.StatusOK, w.Result().StatusCode)
	})
}
