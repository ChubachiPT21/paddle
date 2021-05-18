package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/ChubachiPT21/paddle/internal/infrastructure/database"
	"github.com/ChubachiPT21/paddle/internal/infrastructure/repository"
	"github.com/ChubachiPT21/paddle/internal/routes/paddle"
	"github.com/ChubachiPT21/paddle/pkg/routes"
	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/ChubachiPT21/paddle/user"
	"golang.org/x/crypto/bcrypt"

)

func main() {
	database.Init()

	r := gin.New()
	r.Use(cors.Default())

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
		paddle.GetSources(repository.NewSourceRepository())...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateSource()...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateFeeds()...,
	)
	routes.AddRoutes(
		v1,
		paddle.CreateInterest()...,
	)
	//ユーザ情報登録
    r. POST("/signup", func(c *gin.Context)  {
		r.Use(sessions.Sessions("mysession", store))
		var form User
		email := c.PostForm("email")

		//TODO DBのパスワードと突合処理
		password := c.PostForm("password")
		passwordEncrypt, _ := crypto.PasswordEncrypt(password)

		User.createUser(email,password)

		//TODO nilチェック 等
		//TODO セッション格納する際のフォーマット
		session.Set("Email", email)
		session.Set("Password", password)
		session.Save()
		//ステータスコード返却
		c.Status(http.StatusOK)
				
		// TODO バリデーションチェック
		// TODO 重複チェック
		// TODO 認証後限定の機能

    })
	r.Run(":10330") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
