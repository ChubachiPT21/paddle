package repository

import (
	"context"

	"github.com/ChubachiPT21/paddle/internal/infrastructure/database"
	"github.com/ChubachiPT21/paddle/internal/models"
	"github.com/ChubachiPT21/paddle/pkg/orm"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	. "github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type userRepository struct {
}

// NewUserRepository is a method to initialize the repository
func NewUserRepository() models.UserRepository {
	return &userRepository{}
}

func (repo *userRepository) Create(email string, encryptedPassword string, token string) error {
	user := orm.User{
		Email:             email,
		EncryptedPassword: null.StringFrom(encryptedPassword),
		Token:             null.StringFrom(token),
	}
	err := user.Insert(context.Background(), database.DBCon, boil.Infer())

	return err
}

func (repo *userRepository) FindByToken(token string) (*orm.User, error) {
	return orm.Users(
		Where("token = ?", token),
	).One(context.Background(), database.DBCon)
}
