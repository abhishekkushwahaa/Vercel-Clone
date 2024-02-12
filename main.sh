#!bin/bash

export GIT_Repo_URL="$GIT_Repo_URL"
git clone "$GIT_Repo_URL" /Vercel-Clone/output

exec node script.js