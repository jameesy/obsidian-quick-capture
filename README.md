# Obsidian Quick Capture

A Raycast extension to quickly capture thoughts (written or spoken) directly to your Obsidian daily notes. **Works with any vault structure and note format** - from standard Daily Notes to custom Zettelkasten setups.

<img width="2258" height="1404" alt="CleanShot 2026-03-03 at 10 55 10@2x" src="https://github.com/user-attachments/assets/0339f8df-1fa1-4bf0-9a3e-a528ca7edffe" />

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

This will register the extension with Raycast in development mode. You can now search for "Quick Note" in Raycast.

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

## Development

Built with:
- [Raycast API](https://developers.raycast.com/)
- TypeScript
- React
- date-fns

## License

MIT
