package usecase

import (
	"github.com/ChubachiPT21/paddle/internal/infrastructure/repository"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/mmcdole/gofeed"
)

type CreateSourceInterface interface {
	CreateSource(token string, source *orm.Source) error
}

type CreateSourceStruct struct {
}

func NewCreateSourceStruct() CreateSourceInterface {
	return &CreateSourceStruct{}
}

// CreateSource is an usecase to create a source
func (CreateSourceStruct) CreateSource(token string, source *orm.Source) error {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(source.URL)
	if err != nil {
		return err
	}

	userRepo := repository.NewUserRepository()
	user, err := userRepo.FindByToken(token)
	if err != nil || user == nil {
		return err
	}

	source.UserID = user.ID
	source.Title = feed.Title
	sourceRepo := repository.NewSourceRepository()
	err = sourceRepo.Create(source)
	if err != nil {
		return err
	}

	createFeedStruct := NewCreateFeedStruct()
	err = createFeedStruct.CreateFeed(source.ID)
	if err != nil {
		return err
	}

	return nil
}
