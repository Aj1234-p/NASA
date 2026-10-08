# NASA Picture of the Day

A web page that pulls data from NASA's Astronomy Picture of the Day (APOD) API.
It shows today's image when the page loads, lets you pick any past date from a
form, and remembers your searches so you can revisit them with one click.



## Features

- Today's picture of the day loads automatically
- Pick a date from a form, and the date is sent to the API as a query parameter
- Searches are saved in `localStorage`
- Past searches are listed on the page, and clicking one loads that date again

## Functions

| Function | What it does |
|---|---|
| `getCurrentImageOfTheDay()` | Fetches today's data from the NASA API and displays it. Runs on page load |
| `getImageOfTheDay()` | Fetches the data for the selected date, displays it, saves the date and adds it to the history list |
| `saveSearch()` | Saves a date to `localStorage` as an array of dates |
| `addSearchToHistory()` | Reads the saved array and renders it as an unordered list. Clicking an item fetches that date again and shows it in the black div |

## Flow

```
Page loads
  ↓
getCurrentImageOfTheDay()  ->  today's image shown
  ↓
User picks a date and submits the form
  ↓
getImageOfTheDay()  ->  image for that date shown
  ↓
saveSearch()  ->  date stored in localStorage
  ↓
addSearchToHistory()  ->  date appears in the history list
  ↓
User clicks a history item  ->  that date is fetched again
```

## Tech stack

- HTML5
- CSS3
- JavaScript (ES6+, `fetch`, Promises)
- Web Storage API (`localStorage`)
- [NASA APOD API](https://api.nasa.gov/)

## Project structure

Adjust the names below to match your files.

```
NASA/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting started

```bash
git clone https://github.com/Aj1234-p/NASA.git
cd NASA
```

Run it through a local server rather than opening the file directly:

- **VS Code:** install the *Live Server* extension, right-click `index.html`,
  then choose *Open with Live Server*.
- **Terminal:** run `npx serve .`

### NASA API key

1. Get a free key at https://api.nasa.gov/.
2. Copy `config.example.js` to `config.js` and paste the key in.

`config.js` is listed in `.gitignore`, so the key is never committed. A key
used in front-end code is visible to anyone who opens dev tools, so this setup
is for demos and learning, not production.

## What I learned

1. **Handling errors in fetch calls.** Working with fetch and promises, and
   making sure a failed request shows the user something useful instead of
   breaking silently.
2. **Reading the documentation carefully.** The API had gone through updates
   (endpoints, API key handling), so tutorials and old examples didn't match.
   The official docs were the only reliable source.
3. **Saving search history.** Keeping what a user searched in `localStorage`
   so their past searches are still there when they come back.

The full write-up, with the reasoning and the fixes, is on the blog.

## License

MIT. See [LICENSE](LICENSE).
