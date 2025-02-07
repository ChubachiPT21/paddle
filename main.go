package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"

	"github.com/ChubachiPT21/paddle/internal/infrastructure/database"
	"github.com/ChubachiPT21/paddle/internal/infrastructure/repository"
	"github.com/ChubachiPT21/paddle/internal/routes/paddle"
	"github.com/ChubachiPT21/paddle/internal/usecase"
	"github.com/ChubachiPT21/paddle/pkg/routes"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	database.Init()

	r := gin.Default()
	r.Use(CORS())

	store := cookie.NewStore([]byte("secret"))
	store.Options(sessions.Options{SameSite: http.SameSiteNoneMode, Secure: true})
	r.Use(sessions.Sessions("paddleSession", store))

	v1 := r.Group("/v1")
	routes.AddRoutes(
		v1,
		paddle.GetFeeds(repository.NewFeedRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.GetPreview()...,
	)
	routes.AddRoutes(
		v1,
		paddle.GetSources(repository.NewSourceRepository(), repository.NewUserRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateSource(usecase.NewCreateSourceStruct())...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateFeeds(usecase.NewCreateFeedStruct(), repository.NewUserRepository(), repository.NewSourceRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateInterest(repository.NewInterestRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.Signup(repository.NewUserRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.Signin(repository.NewUserRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.Signout()...,
	)
	routes.AddRoutes(
		v1,
		paddle.GetAuthentication(repository.NewUserRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.Unfollow(repository.NewUserRepository(), repository.NewSourceRepository(), repository.NewFeedRepository())...,
	)
	r.Run(":10330") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func CORS() gin.HandlerFunc {
	var host = "localhost:13000"
	if os.Getenv("HOST") != "" {
		host = os.Getenv("HOST")
	}
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://"+host)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH, HEAD")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
