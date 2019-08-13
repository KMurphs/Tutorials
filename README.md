# Tutorials
A Repository of Tutorials of all sort that I go through when learning new things


## [Merging 2 repoistories together](https://saintgimp.org/2013/01/22/merging-two-git-repositories-into-one-repository-without-losing-file-history/)


The basic idea is that we follow these steps:
	Create a new empty repository New.
	Make an initial commit because we need one before we do a merge.
	Add a remote to old repository OldA.
	Merge OldA/master to New/master.
	Make a subdirectory OldA.
	Move all files into subdirectory OldA.
	Commit all of the file moves.
	Repeat 3-6 for OldB.


A Powershell script for these steps might look like this:
```
	# Assume the current directory is where we want the new repository to be created
	# Create the new repository
	git init

	# Before we do a merge, we have to have an initial commit, so we’ll make a dummy commit
	dir > deleteme.txt
	git add .
	git commit -m “Initial dummy commit”

	# Add a remote for and fetch the old repo
	git remote add -f old_a <OldA repo URL>

	# Merge the files from old_a/master into new/master
	git merge old_a/master

	# Clean up our dummy file because we don’t need it any more
	git rm .\deleteme.txt
	git commit -m “Clean up initial file”

	# Move the old_a repo files and folders into a subdirectory so they don’t collide with the other repo coming later
	mkdir old_a
	dir –exclude old_a | %{git mv $_.Name old_a}

	# Commit the move
	git commit -m “Move old_a files into subdir”

	# Do the same thing for old_b
	git remote add -f old_b <OldB repo URL>
	git merge old_b/master
	mkdir old_b
	dir –exclude old_a,old_b | %{git mv $_.Name old_b}
	git commit -m “Move old_b files into subdir”
```