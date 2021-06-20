package repository

import (
	"context"

	"github.com/ChubachiPT21/paddle/internal/infrastructure/database"
	"github.com/ChubachiPT21/paddle/internal/models"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/volatiletech/sqlboiler/v4/boil"
	. "github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type sourceRepository struct {
}

// NewSourceRepository is a method to initialize the repository
// We should add user_id or joins sources table
func NewSourceRepository() models.SourceRepository {
	return &sourceRepository{}
}

func (repo *sourceRepository) Find(sourceID int64) (*orm.Source, error) {
	return orm.Sources(
		Where("id = ?", sourceID),
	).One(context.Background(), database.DBCon)
}

func (repo *sourceRepository) All(userID int64) (orm.SourceSlice, error) {
	return orm.Sources(
		Where("user_id = ?", userID),
	).All(context.Background(), database.DBCon)
}

func (repo *sourceRepository) Create(source *orm.Source) error {
	return source.Insert(context.Background(), database.DBCon, boil.Infer())
}

// sourceIDで指定されたsourceを削除する
func (repo *sourceRepository) Delete(sourceID int64) error {
	source, err := repo.Find(sourceID)
	if err != nil {
		return err
	}
	_, err = source.Delete(context.Background(), database.DBCon)
	return err
}
