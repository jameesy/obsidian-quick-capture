/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Vault Path - Path to your Obsidian vault (e.g., ~/Documents/Obsidian/MyVault) */
  "vaultPath": string,
  /** Daily Notes Folder - Folder within vault where daily notes are stored (leave empty for vault root) */
  "dailyNotesFolder": string,
  /** Date Format - Format for daily note filenames (using date-fns format) */
  "dateFormat": string,
  /** Timestamp Format - Format for timestamps in notes */
  "timestampFormat": string,
  /** Section Header - Section to append notes to (e.g., ## Inbox, **Notes**). Leave empty to append to end of file. */
  "sectionHeader"?: string,
  /** Create Daily Note if Missing - Automatically create today's daily note if it doesn't exist */
  "createNoteIfMissing": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `quick-note` command */
  export type QuickNote = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `quick-note` command */
  export type QuickNote = {}
}

