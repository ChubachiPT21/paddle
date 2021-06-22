package paddle

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"

	"strconv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mmcdole/gofeed"
	"golang.org/x/crypto/bcrypt"

	"github.com/ChubachiPT21/paddle/internal/models"
	"github.com/ChubachiPT21/paddle/internal/usecase"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/ChubachiPT21/paddle/pkg/routes"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

type getFeedsHandler struct {
	repo models.FeedRepository
}

type getSourcesHandler struct {
	repo     models.SourceRepository
	userRepo models.UserRepository
}

type createSourceHandler struct {
	usecase usecase.CreateSourceInterface
}

type createFeedsHandler struct {
	usecase    usecase.CreateFeedInterface
	userRepo   models.UserRepository
	sourceRepo models.SourceRepository
}

type createInterestHandler struct {
	repo models.InterestRepository
}

type signupHandler struct {
	repo models.UserRepository
}

type signinHandler struct {
	repo models.UserRepository
}

type signoutHandler struct {
}

type getAuthenticationHandler struct {
	repo models.UserRepository
}

type unfollowHandler struct {
	userRepo   models.UserRepository
	sourceRepo models.SourceRepository
	feedRepo   models.FeedRepository
}

type previewRequest struct {
	Url string `json:"url"`
}

type authenticationRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *getAuthenticationHandler) handle(c *gin.Context) {
	session := sessions.Default(c)
	v := session.Get("token")
	if v == nil {
		c.JSON(http.StatusOK, nil)
		return
	}

	user, err := h.repo.FindByToken(v.(string))
	if err != nil || user == nil {
		c.JSON(http.StatusUnauthorized, nil)
	} else {
		c.JSON(http.StatusOK, gin.H{"token": v, "email": user.Email})
	}
}

func (h *signupHandler) receive(c *gin.Context) {
	session := sessions.Default(c)
	v := session.Get("token")
	if v != nil {
		user, err := h.repo.FindByToken(v.(string))
		if err != nil || user == nil {
			c.JSON(http.StatusUnauthorized, nil)
		} else {
			c.JSON(http.StatusOK, gin.H{"token": v, "email": user.Email})
		}
		return
	}

	var authenticationRequest authenticationRequest
	c.BindJSON(&authenticationRequest)

	emailErr := validation.Validate(authentication.Email, is.Email)
	passwordErr := validation.Validate(authentication.Password, validation.Required)
	if emailErr != nil || passwordErr != nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(authenticationRequest.Password), 10)

	data := make([]byte, 10)
	if _, err := rand.Read(data); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	randomString := sha256.Sum256(data)
	token := hex.EncodeToString(randomString[:])

	if err := h.repo.Create(authenticationRequest.Email, string(encryptedPassword), token); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		session.Set("token", token)
		session.Save()
		c.JSON(http.StatusOK, gin.H{"token": token, "email": authenticationRequest.Email})
	}
}

func (h *signinHandler) receive(c *gin.Context) {
	session := sessions.Default(c)
	v := session.Get("token")
	if v != nil {
		user, err := h.repo.FindByToken(v.(string))
		if err != nil || user == nil {
			c.JSON(http.StatusUnauthorized, nil)
		} else {
			c.JSON(http.StatusOK, gin.H{"token": v, "email": user.Email})
		}
		return
	}

	var authenticationRequest authenticationRequest
	c.BindJSON(&authenticationRequest)

	user, err := h.repo.FindByEmail(authenticationRequest.Email)
	if err != nil || user == nil || bcrypt.CompareHashAndPassword([]byte(user.EncryptedPassword.String), []byte(authenticationRequest.Password)) != nil {
		c.JSON(http.StatusUnauthorized, nil)
	} else {
		session.Set("email", user.Email)
		session.Set("token", user.Token.String)
		session.Save()
		c.JSON(http.StatusOK, gin.H{"token": user.Token.String, "email": user.Email})
	}
}

func (h *signoutHandler) receive(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.JSON(http.StatusOK, nil)
}

func (h *getFeedsHandler) handle(c *gin.Context) {
	sourceID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	feeds, err := h.repo.All(sourceID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		c.JSON(http.StatusOK, feeds)
	}
}

func (h *getFeedsHandler) preview(c *gin.Context) {
	fp := gofeed.NewParser()
	var previewRequest previewRequest
	c.BindJSON(&previewRequest)
	feed, err := fp.ParseURL(previewRequest.Url)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		c.JSON(http.StatusOK, feed.Title)
	}
}

func (h *getSourcesHandler) handle(c *gin.Context) {
	token := sessions.Default(c).Get("token")
	if token == nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}
	user, err := h.userRepo.FindByToken(token.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	sources, err := h.repo.All(user.ID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		fmt.Println(sources)
		c.JSON(http.StatusOK, sources)
	}
}

func (h *createSourceHandler) receive(c *gin.Context) {
	session := sessions.Default(c)
	v := session.Get("token")
	if v == nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	source := orm.Source{}
	err := c.Bind(&source)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	err = h.usecase.CreateSource(v.(string), &source)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	}

	c.JSON(http.StatusOK, gin.H{"sourceID": source.ID})
}

func (h *createFeedsHandler) receive(c *gin.Context) {
	token := sessions.Default(c).Get("token")
	if token == nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}
	user, err := h.userRepo.FindByToken(token.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	sources, err := h.sourceRepo.All(user.ID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	for _, source := range sources {
		err = h.usecase.CreateFeed(source.ID)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println("Feeds for sourceID: " + strconv.FormatInt(source.ID, 10) + " has been created.")
		}
	}
	c.JSON(http.StatusOK, nil)
}

func (h *createInterestHandler) receive(c *gin.Context) {
	feedID, err := strconv.ParseInt(c.Param("feed_id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	if err = h.repo.Create(feedID); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		c.JSON(http.StatusOK, nil)
	}
}

// 指定されたidのsourceとそれに関連するfeedを削除
func (h *unfollowHandler) unfollow(c *gin.Context) {
	// ログイン状態の確認：sessionはtokenを持っているか？
	token := sessions.Default(c).Get("token")
	if token == nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	// ログイン状態の確認：そのtokenを持っているユーザは存在するか？
	user, err := h.userRepo.FindByToken(token.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, nil)
		return
	}

	// sourceの確認：パラメータから削除するidを取得
	sourceID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	// sourceの確認：そのidは登録されているか？
	source, err := h.sourceRepo.Find(sourceID)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, nil)
		return
	}

	// sourceの確認：指定されたidは現在のユーザのものか？
	if source.UserID != user.ID {
		c.JSON(http.StatusUnprocessableEntity, nil)
		return
	}

	// 関連するfeedの削除
	err = h.feedRepo.DeleteAll(sourceID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	// sourceの削除
	err = h.sourceRepo.Delete(sourceID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		c.JSON(http.StatusOK, nil)
	}
}

// GetFeeds fetches all feeds from sourceID
func GetFeeds(repo models.FeedRepository) routes.Routes {
	handler := getFeedsHandler{repo}

	return routes.Routes{
		{
			Path:    "/sources/:id/feeds",
			Method:  http.MethodGet,
			Handler: handler.handle,
		},
	}
}

// GetPreview fetches all feeds from url
func GetPreview() routes.Routes {
	handler := new(getFeedsHandler)

	return routes.Routes{
		{
			Path:    "/preview",
			Method:  http.MethodPost,
			Handler: handler.preview,
		},
	}
}

// GetSources shows all sources
func GetSources(repo models.SourceRepository, userRepo models.UserRepository) routes.Routes {
	handler := getSourcesHandler{repo, userRepo}

	return routes.Routes{
		{
			Path:    "/sources",
			Method:  http.MethodGet,
			Handler: handler.handle,
		},
	}
}

// CreateSource creates a new source
func CreateSource(usecase usecase.CreateSourceInterface) routes.Routes {
	handler := createSourceHandler{usecase}

	return routes.Routes{
		{
			Path:    "/sources",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// CreateFeeds creates feeds for all sources
func CreateFeeds(usecase usecase.CreateFeedInterface, userRepo models.UserRepository, sourceRepo models.SourceRepository) routes.Routes {
	handler := createFeedsHandler{usecase, userRepo, sourceRepo}

	return routes.Routes{
		{
			Path:    "/feeds",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// CreateInterest creates a association with the feed user opens the link
func CreateInterest(repo models.InterestRepository) routes.Routes {
	handler := createInterestHandler{repo}

	return routes.Routes{
		{
			Path:    "/sources/:id/feeds/:feed_id/interest",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// Signup verifies a user and set a session
func Signup(repo models.UserRepository) routes.Routes {
	handler := signupHandler{repo}

	return routes.Routes{
		{
			Path:    "/signup",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// Signin verifies a user and set a session
func Signin(repo models.UserRepository) routes.Routes {
	handler := signinHandler{repo}

	return routes.Routes{
		{
			Path:    "/signin",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// Signout verifies a user and set a session
func Signout() routes.Routes {

	handler := new(signoutHandler)

	return routes.Routes{
		{
			Path:    "/signout",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// GetAuthentication checks if a user has already signed in
func GetAuthentication(repo models.UserRepository) routes.Routes {
	handler := getAuthenticationHandler{repo}

	return routes.Routes{
		{
			Path:    "/authentication",
			Method:  http.MethodGet,
			Handler: handler.handle,
		},
	}
}

// Unfollow delete a source and related feeds
func Unfollow(userRepo models.UserRepository, sourceRepo models.SourceRepository, feedRepo models.FeedRepository) routes.Routes {
	handler := unfollowHandler{userRepo, sourceRepo, feedRepo}

	return routes.Routes{
		{
			Path:    "/sources/:id",
			Method:  http.MethodDelete,
			Handler: handler.unfollow,
		},
	}
}
