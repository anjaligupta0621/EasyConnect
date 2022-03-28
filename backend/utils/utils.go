package utils

import "strings"

func GetUsernameFromEmail(email string) string {
	i := strings.Index(email, "@")

	if i > -1 {
		return email[:i-1]
	}
	return ""
}
