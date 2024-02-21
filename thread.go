package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"time"
)

type Thread struct {
	Type    string   `json:"$type"`
	Post    Post     `json:"post"`
	Replies []Thread `json:"replies"`
}

type Post struct {
	RKey        string
	URI         string    `json:"uri"`
	CID         string    `json:"cid"`
	Author      Actor     `json:"author"`
	Record      Record    `json:"record"`
	ReplyCount  int       `json:"replyCount"`
	RepostCount int       `json:"repostCount"`
	LikeCount   int       `json:"likeCount"`
	IndexedAt   time.Time `json:"indexedAt"`
	Labels      []string  `json:"labels"`
}

type Record struct {
	Text string `json:"text"`
	Type string `json:"$type"`
	/* jordanreger/htmlsky#7
	Embed Embed `json:"embed"`
	*/
	Langs []string `json:"langs"`
	/* jordanreger/htmlsky#5
	Facets []Facets `json:"Facets"`
	*/
	Reply     Reply     `json:"reply"`
	CreatedAt time.Time `json:"createdAt"`
}

type Reply struct {
	Root   ReplyRoot   `json:"root"`
	Parent ReplyParent `json:"parent"`
}
type ReplyRoot struct {
	CID string `json:"cid"`
	URI string `json:"uri"`
}
type ReplyParent struct {
	CID string `json:"cid"`
	URI string `json:"uri"`
}

type t_res struct {
	Thread Thread
}

func getThread(at_uri string) Thread {
	res, err := http.Get("https://api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=" + at_uri)
	if err != nil {
		fmt.Println(err)
	}

	var t_body t_res
	b, _ := io.ReadAll(res.Body)
	json.Unmarshal(b, &t_body)

	thread := t_body.Thread
	thread.Post.RKey = getRkey(thread.Post.URI)
	for i := range thread.Replies {
		thread.Replies[i].Post.RKey = getRkey(thread.Replies[i].Post.URI)
	}

	return thread
}

func getThreadPage(thread Thread) string {
	t := template.Must(template.ParseFS(publicFiles, "public/*"))
	var thread_page bytes.Buffer
	t.ExecuteTemplate(&thread_page, "thread.page.html", thread)
	return thread_page.String()
}