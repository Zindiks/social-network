package model

import (
	"time"

	"github.com/google/uuid"
)

type Event struct {
	ID              string    `db:"id" json:"id" validate:"required"`
	UserID          string    `db:"user_id" json:"user_id" validate:"required"`
	GroupID         string    `db:"group_id" json:"group_id" validate:"required"`
	Name            string    `db:"name" json:"name" validate:"required|min_len:4|max_len:25"`
	Description     string    `db:"description" json:"description" validate:"required|min_len:4|max_len:100"`
	CreatedAt       time.Time `db:"created_at" json:"created_at"`
	Date            string `db:"date" json:"event_start_date" validate:"required"`
	UserInformation User      `json:"user_information"`
	IsParticipant   bool      `json:"is_participant"`
	Status          string    `json:"event_status"`
	Participants    []*User   `json:"participants"`
}

func NewEvent() *Event {
	return &Event{
		ID:        uuid.New().String(),
		CreatedAt: time.Now(),
	}
}
