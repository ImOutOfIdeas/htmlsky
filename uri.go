package main

import "strings"

func getPostURI(did string, rkey string) string {
	return "at://" + did + "/app.bsky.feed.post/" + rkey
}

func getRkey(uri string) string {
	split := strings.Split(uri, "/")
	return split[len(split)-1]
}
