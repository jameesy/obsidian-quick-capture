# Obsidian Quick Capture

A Raycast extension to quickly capture thoughts (written or spoken) directly to your Obsidian daily notes. **Works with any vault structure and note format** - from standard Daily Notes to custom Zettelkasten setups.

## Features

- 📝 **Quick Capture**: Instantly capture text thoughts to your daily note
- ⚡ **Fast**: Opens with a hotkey, saves with Cmd+S
- 🎯 **Flexible**: Works with any note format - append to sections or end of file
- 📅 **Smart**: Finds or creates today's note automatically
- 🔧 **Configurable**: Customize paths, formats, and section headers
- ⏱️ **Chronological**: Notes appear in order throughout the day

## Installation

### Development Mode

1. Clone or download this repository:
   ```bash
   git clone https://github.com/jameesy/obsidian-quick-capture.git
   cd obsidian-quick-capture
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development mode:
   ```bash
   npm run dev
   ```

This will register the extension with Raycast in development mode. You can now search for "Quick Note" or "Voice Capture" in Raycast.

### Build for Production

```bash
npm run build
```

Then import the extension into Raycast via Settings → Extensions → Add Extension.

## Configuration

Configure the extension via Raycast preferences (press Cmd+, in any command):

### Required Settings

- **Vault Path**: Path to your Obsidian vault (e.g., `~/Documents/Obsidian/MyVault`)
- **Date Format**: Format for daily note filenames (default: `yyyy-MM-dd`)
- **Timestamp Format**: Format for timestamps in notes (default: `HH:mm`)

### Optional Settings

- **Daily Notes Folder**: Folder where daily notes are stored (leave empty for vault root)
- **Section Header**: Section to append notes to (e.g., `## Inbox`, `**Notes**`)
  - Leave empty to append to end of file
  - Supports both markdown headings (`## Section`) and bold format (`**Section**`)
- **Create Note if Missing**: Automatically create today's daily note if it doesn't exist (default: enabled)

### Configuration Examples

**Example 1: Standard Obsidian Daily Notes**
```
Vault Path: ~/Documents/Obsidian/MyVault
Daily Notes Folder: Daily Notes
Section Header: ## Inbox
```

**Example 2: Root Level Notes**
```
Vault Path: ~/Documents/MyVault
Daily Notes Folder: (leave empty)
Section Header: (leave empty - appends to end)
```

**Example 3: Custom Section with Bold Format**
```
Vault Path: ~/Documents/Zettelkasten
Daily Notes Folder: Journal/Daily
Section Header: **Quick Captures**
```

## Usage

### Quick Note (Written)

1. Open Raycast (default: Cmd+Space)
2. Type "Quick Note" or set a custom hotkey
3. Type your thought
4. Press Cmd+S to save and close
5. Or Cmd+Shift+S to save and add another

### Voice Capture

1. Open Raycast
2. Type "Voice Capture" or set a custom hotkey
3. Press Fn twice to activate macOS dictation
4. Speak your thought
5. Edit if needed
6. Press Cmd+S to save

## Daily Note Format

The extension works with this daily note format:

\`\`\`markdown
# 2026-03-03

#type/daily

---

> [!north-star] SYSTEMS
> One hour of focused work
> Daily walk
> Create plan for tomorrow


**Notes**

- 08:34 - Your captured thought
- 10:15 - Another thought
\`\`\`

New entries are automatically appended to the **Notes** section with timestamps.

## Keyboard Shortcuts

- **Cmd+S**: Save to daily note and close
- **Cmd+Shift+S**: Save and add another (Quick Note only)
- **Cmd+D**: Show dictation help (Voice Capture)

## Tips

- Set a global hotkey for Quick Note in Raycast preferences for instant access
- Use the built-in macOS dictation (Fn Fn) for voice input - it's fast and works offline
- The extension creates today's daily note if it doesn't exist

## Troubleshooting

**"Failed to save" error:**
- Check that the vault path is correct
- Ensure the daily notes folder exists or the extension can create it
- Verify you have write permissions for the vault directory

**Dictation not working:**
- macOS dictation must be enabled in System Settings → Keyboard → Dictation
- Press Fn twice quickly to activate

## Development

Built with:
- [Raycast API](https://developers.raycast.com/)
- TypeScript
- React
- date-fns

## License

MIT
