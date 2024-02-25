package main

import (
	"fmt"
	"html/template"
	"strings"
)

func parseFacets(text string, facets []Facet) template.HTML {
	for i, f := range facets {
		if i > 0 {
			break
		}
		if f.Features[0].Type == "app.bsky.richtext.facet#link" {
			in_txt := text[f.Index.ByteStart:f.Index.ByteEnd]
			m_url := "<a href='" + f.Features[len(f.Features)-1].URI + "'>" + in_txt + "</a>"
			text = strings.Replace(text, in_txt, m_url, 1)

		} else if f.Features[0].Type == "app.bsky.richtext.facet#mention" {
			in_txt := text[f.Index.ByteStart:f.Index.ByteEnd]
			m_url := "<a href='https://htmlsky.app/profile/" + f.Features[len(f.Features)-1].DID + "'>" + in_txt + "</a>"
			text = strings.Replace(text, in_txt, m_url, 1)
		}
	}

	fmt.Println(text)

	res := template.HTML(text)

	return res
}
