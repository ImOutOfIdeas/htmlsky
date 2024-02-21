package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
)

type Actor struct {
	DID            string `json:"did"`
	Handle         string `json:"handle"`
	DisplayName    string `json:"displayName"`
	Description    string `json:"description"`
	Avatar         string `json:"avatar"`
	Banner         string `json:"banner"`
	FollowersCount int    `json:"followersCount"`
	FollowsCount   int    `json:"followsCount"`
	PostsCount     int    `json:"postsCount"`
	Feed           []FeedItem
}

func getActorProfile(did string) Actor {
	res, err := http.Get("https://api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=" + did)
	if err != nil {
		fmt.Println(err)
	}

	var actor Actor
	b, _ := io.ReadAll(res.Body)
	json.Unmarshal(b, &actor)

	return actor
}

func getActorPage(actor Actor, feed Feed) string {
	t := template.Must(template.ParseFS(publicFiles, "public/*"))
	actor.Feed = feed
	var actor_page bytes.Buffer
	t.ExecuteTemplate(&actor_page, "actor.page.html", actor)
	return actor_page.String()
}
