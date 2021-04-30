#!/usr/bin/env node

import fs from 'fs'
import clipboardy from 'clipboardy'
import slugify from '@sindresorhus/slugify'

// Get Clipboard contents
const URL = clipboardy.readSync();

// Filter out the information from URL
const code = URL.split('/')[4].split('?')[0]
const type = URL.split('/')[3]

const [commandName] = process.argv.slice(2)

// Create a new Spotify script
const scriptContent = `#!/usr/bin/osascript

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title ${commandName}
# @raycast.mode silent
# @raycast.packageName Spotify
#
# Optional parameters:
# @raycast.icon ./assets/logo.png
#
# Documentation:
# @raycast.description Play ${commandName} on Spotify
# @raycast.author Nichlas W. Andersen
# @raycast.authorURL https://twitter.com/nichlaswa

property uri: "spotify:${type}:${code}"

tell application "Spotify" to play track uri`

// Write script to disk
if (!commandName) {
    console.log("Missing Spotify Command Name")
} else if (!type || !code) {
    console.log("Copy a Spotify URL before running this command")
} else {
    fs.writeFileSync(`./${slugify(commandName)}.applescript`, scriptContent)
    console.log(`${commandName} is ready`)
}


// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Create Spotify Command
// @raycast.mode silent

// Optional parameters:
// @raycast.icon ./assets/logo.png
// @raycast.packageName Spotify
// @raycast.argument1 { "type": "text", "placeholder": "Discover Weekly" }

// Documentation:
// @raycast.description Create Spotify Shortcut Command from the Spotify URL that's in your clipboard
// @raycast.author Nichlas Wærnes Andersen
// @raycast.authorURL https://twitter.com/nichlaswa