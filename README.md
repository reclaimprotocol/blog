# How to Add a Blog Post to Reclaim Protocol

Follow these steps to contribute a new blog post to our website. We appreciate your contribution and look forward to featuring your insights on [blog.reclaimprotocol.org](https://blog.reclaimprotocol.org)!

A non-technical contributor's guide to pushing blogs :
# Step 0 : Setup
## Clone this repo locally (first time only)
```
$ git@github.com:reclaimprotocol/blog.git
$ cd blog
$ npm install
```
## Pull latest
```
$ git checkout main
$ git pull
```
## Create a branch
```
$ git checkout -b name_of_your_branch
```

## Step 1: Create the File

1. Navigate to the `./content/posts/` directory in the project repository.
2. Create a new file with the `.mdx` extension.
3. Name the file based on your desired URL slug. For example, `my-awesome-post.mdx` will result in a URL like `blog.reclaimprotocol.org/my-awesome-post`.

## Step 2: Add the Front Matter

At the top of your new `.mdx` file, include the following YAML front matter:

```markdown
---
title: "<INSERT A TITLE HERE>"
description: "<INSERT A BRIEF DESCRIPTION HERE>"
date: <INSERT A DATE HERE (YYYY-MM-DD)>
tags: ["INSERT", "TAGS", "AS", "AN", "ARRAY", "HERE"]
img: "<LINK TO COVER IMAGE>"
author: <AUTHOR NAME>
published: <true or false>
---
```

### Front Matter Fields Explained:

- `title`: 
- `description`: A brief summary of your post (good for SEO).
- `date`: The publication date in YYYY-MM-DD format.
- `tags`: An array of relevant keywords for categorizing your post.
- `img`: A link to the cover image for your post.
- `author`: Your name or pseudonym.
- `published`: Set to `true` when ready to publish, `false` to keep as a draft.


## Step 3: Preview and Edit

Before publishing, it's a good idea to preview your post locally if possible. This allows you to catch any formatting issues or typos. 

For that, follow the below steps,

1. Run `pnpm install` - You need to have `pnpm` installed locally and if not, [https://pnpm.io/installation](https://pnpm.io/installation)
2. Run `pnpm run dev`
3. Navigate to `localhost:3000` and preview your changes

## Step 4: Commit and Push

When you're satisfied with your post:

1. If `published` is set to `true` in the front matter, your post will go live after the next build.
2. Commit your new `.mdx` file to the repository.
3. Push your changes to the main branch or create a pull request, depending on your project's workflow.
```
$ git push origin name_of_your_branch
```
4. Hit up the dev team to merge this branch into the main branch to publish it

Happy blogging! Your contributions help grow and enrich our community.

> Note: Vercel will automatically detect the new content and will trigger a new build of the website, post which your changes will be live on [blog.reclaimprotocol.org](https://blog.reclaimprotocol.org).
