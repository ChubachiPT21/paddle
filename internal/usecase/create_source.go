package usecase

import (
	"github.com/ChubachiPT21/paddle/internal/infrastructure/repository"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/mmcdole/gofeed"
)

type CreateSourceInterface interface {
	CreateSource(source *orm.Source) error
}

type CreateSourceStruct struct {
}

func NewCreateSourceStruct() CreateSourceInterface {
	return &CreateSourceStruct{}
}

// CreateSource is an usecase to create a source
func (CreateSourceStruct) CreateSource(source *orm.Source) error {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(source.URL)
	if err != nil {
		return err
	}

	source.Title = feed.Title
	repo := repository.NewSourceRepository()
	err = repo.Create(source)
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
