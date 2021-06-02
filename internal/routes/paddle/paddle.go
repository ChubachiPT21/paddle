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
)

type getFeedsHandler struct {
	repo models.FeedRepository
}

type getSourcesHandler struct {
	repo models.SourceRepository
}

type createSourceHandler struct {
	repo models.SourceRepository
	feed usecase.CreateFeedInterface
}

type createFeedsHandler struct {
	feed usecase.CreateFeedInterface
}

type createInterestHandler struct {
	repo models.InterestRepository
}

type signupHandler struct {
	repo models.UserRepository
}

type getAuthenticationHandler struct {
	repo models.UserRepository
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

	encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(authenticationRequest.Password), 10)

	data := make([]byte, 10)
	var token string
	if _, err := rand.Read(data); err == nil {
		randomString := sha256.Sum256(data)
		token = hex.EncodeToString(randomString[:])
	}

	if err := h.repo.Create(authenticationRequest.Email, string(encryptedPassword), token); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		session = sessions.Default(c)
		session.Set("token", token)
		session.Save()
		c.JSON(http.StatusOK, gin.H{"token": token, "email": authenticationRequest.Email})
	}
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
	sources, err := h.repo.All()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		fmt.Println(sources)
		c.JSON(http.StatusOK, sources)
	}
}

func (h *createSourceHandler) receive(c *gin.Context) {
	source := orm.Source{
		UserID: 1,
	}
	err := c.Bind(&source)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	err = h.repo.Create(&source)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	err = h.feed.CreateFeed(source.ID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	}

	c.JSON(http.StatusOK, nil)
}

func (h *createFeedsHandler) receive(c *gin.Context) {
	sourceID, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	err = h.feed.CreateFeed(sourceID)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, nil)
	} else {
		c.JSON(http.StatusOK, nil)
	}
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
func GetSources(repo models.SourceRepository) routes.Routes {
	handler := getSourcesHandler{repo}

	return routes.Routes{
		{
			Path:    "/sources",
			Method:  http.MethodGet,
			Handler: handler.handle,
		},
	}
}

// CreateSource creates a new source
func CreateSource(repo models.SourceRepository, feed usecase.CreateFeedInterface) routes.Routes {
	handler := createSourceHandler{repo, feed}

	return routes.Routes{
		{
			Path:    "/sources",
			Method:  http.MethodPost,
			Handler: handler.receive,
		},
	}
}

// CreateFeeds creates feeds based on the source id
func CreateFeeds(feed usecase.CreateFeedInterface) routes.Routes {
	handler := createFeedsHandler{feed}

	return routes.Routes{
		{
			Path:    "/sources/:id/feeds",
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
