REM Initialize local repository
git --version
git init

REM Make some content
git add *
git status
git commit -m "Initial Commit"

REM Initialize remote 
git remote add origin https://github.com/KMurphs/WDEV-FCC-TributePage.git
git remote -v
git pull origin master --allow-unrelated-histories
git push origin master