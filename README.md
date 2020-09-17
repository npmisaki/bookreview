# BookReview JSON API

## Development

### Requirements

* Node.js v12
* direnv

### How to Start

```sh
# Setup necessary env vars
$ cp .envrc.example .envrc

$ npm i

# If you don't login
$ npx vercel login

# Start dev server
$ npx vercel dev
```


## APIs

### `GET /api/reviews`

* Get reviews

### `POST /api/reviews`

* Create a new review
* Required parameters:
    * `title`: (string) Book title
    * `body`: (string) Review message
    * `score`: (number) Review score
    * `reviewer`: (string) Reviewer name

### `PUT /api/reviews/:id`

* Update a review
* Required parameters: Same with the `Create` ones

### `DELETE /api/reviews/:id`

* Delete a review
