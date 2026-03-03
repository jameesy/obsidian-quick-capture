import fs from "fs/promises";
import path from "path";
import { format } from "date-fns";
import { getPreferenceValues } from "@raycast/api";
import { Preferences } from "../types/preferences";

/**
 * Appends text to today's daily note in Obsidian
 * Creates the note if it doesn't exist (based on preferences)
 */
export async function appendToDailyNote(text: string): Promise<void> {
  const prefs = getPreferenceValues<Preferences>();
  const today = format(new Date(), prefs.dateFormat);
  const timestamp = format(new Date(), prefs.timestampFormat);

  // Validate vault path is set
  if (!prefs.vaultPath || prefs.vaultPath.trim() === "") {
    throw new Error("Vault path not configured. Please set it in extension preferences (Cmd+,).");
  }

  // Expand ~ to home directory if needed
  const vaultPath = prefs.vaultPath.replace(/^~/, process.env.HOME || "");

  // Construct full file path
  const dailyNotesFolder = prefs.dailyNotesFolder || "";
  const notePath = path.join(vaultPath, dailyNotesFolder, `${today}.md`);

  // Check if file exists
  let content = "";
  let fileExists = false;

  try {
    content = await fs.readFile(notePath, "utf-8");
    fileExists = true;
  } catch {
    // File doesn't exist
    const shouldCreate = prefs.createNoteIfMissing !== false; // Default to true

    if (!shouldCreate) {
      throw new Error(
        `Daily note for ${today} doesn't exist and auto-creation is disabled. Please create it manually in Obsidian first.`
      );
    }

    // Create with simple template
    content = createDailyNoteTemplate(today);
  }

  // Format the new entry with a blank line after for spacing
  const formattedText = `- ${timestamp} - ${text}`;

  // Append based on section header preference
  let newContent: string;

  if (prefs.sectionHeader && prefs.sectionHeader.trim() !== "") {
    // User specified a section - try to find and append to it
    newContent = appendToSection(content, formattedText, prefs.sectionHeader);
  } else {
    // No section specified - append to end of file
    newContent = content.trim() + "\n\n" + formattedText + "\n\n";
  }

  // Ensure directory exists
  await fs.mkdir(path.dirname(notePath), { recursive: true });

  // Write back to file
  await fs.writeFile(notePath, newContent, "utf-8");
}

/**
 * Creates a minimal daily note template
 * Just includes the date heading - users can customize with their own templates
 */
function createDailyNoteTemplate(date: string): string {
  return `# ${date}\n\n`;
}

/**
 * Finds a section by header and appends text to the end (chronologically).
 * Supports both ## Heading and **Bold** section formats.
 * If section doesn't exist, creates it at the end.
 */
function appendToSection(content: string, text: string, sectionHeader: string): string {
  // Normalize the section header (remove # or ** markers for comparison)
  const normalizedHeader = sectionHeader.replace(/^#+\s*|\*\*/g, "").trim();

  // Escape special regex characters
  const escapedHeader = normalizedHeader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Try to match both markdown heading (## Section) and bold (**Section**)
  const patterns = [
    // Markdown heading pattern (## Section) - captures everything until next heading or end
    new RegExp(`(#{1,6}\\s*${escapedHeader}\\s*\\n)((?:.*\\n)*?)(?=\\n#{1,6}\\s|$)`, "is"),
    // Bold pattern (**Section**) - captures everything until next section or end
    new RegExp(`(\\*\\*${escapedHeader}\\*\\*\\s*\\n)((?:.*\\n)*?)(?=\\n\\*\\*|\\n#{1,6}\\s|$)`, "is"),
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      // Section found - append new text at the END of the section content
      return content.replace(pattern, (match, header, sectionContent) => {
        // Trim trailing whitespace from section content
        const trimmedContent = sectionContent.trimEnd();
        // Add new text at the end with proper spacing
        return `${header}${trimmedContent}\n${text}\n\n`;
      });
    }
  }

  // Section not found - create it at the end
  return content.trim() + `\n\n${sectionHeader}\n${text}\n\n`;
}

/**
 * Gets the path to today's daily note
 */
export async function getTodayNotePath(): Promise<string> {
  const prefs = getPreferenceValues<Preferences>();
  const today = format(new Date(), prefs.dateFormat);
  const vaultPath = prefs.vaultPath.replace(/^~/, process.env.HOME || "");
  const dailyNotesFolder = prefs.dailyNotesFolder || "";
  return path.join(vaultPath, dailyNotesFolder, `${today}.md`);
}

/**
 * Checks if today's daily note exists
 */
export async function dailyNoteExists(): Promise<boolean> {
  const notePath = await getTodayNotePath();
  try {
    await fs.access(notePath);
    return true;
  } catch {
    return false;
  }
}
