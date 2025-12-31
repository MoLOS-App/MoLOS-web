---
sidebar_label: Migrate from Notion/Obsidian
description: Guide to migrating your data from popular productivity apps to MoLOS
---

# Migration Guides

Switching to MoLOS from another app? We've got you covered. Below are guides for migrating from the most popular tools.



:::warning
Still working on this, maybe I will do it by module or something?
:::


<!-- 
## General Migration Strategy

**Before you start:**
1. Back up your data from your current tool
2. Export data in Markdown or JSON format
3. Prepare a test migration on a fresh MoLOS instance
4. Keep your original tool running during migration for reference

---

## Migrate from Notion

### Export from Notion
1. Open Notion workspace settings → Download your workspace
2. Notion sends a ZIP file with your data in Markdown
3. Extract the ZIP file

### Import Tasks
**Step 1:** Export Notion Database as CSV
- Open your tasks database in Notion
- Click ⋯ → Download → CSV
- Save the file

**Step 2:** Import into MoLOS
- In MoLOS Tasks, click Import → CSV
- Select the Notion export file
- Map columns: Title → Name, Date → Due Date, Priority → Priority
- Click Import

### Import Notes/Knowledge
**Step 1:** Export Notion pages
- Notion creates Markdown files for each page
- Copy all `.md` files from your export

**Step 2:** Add to MoLOS Knowledge
- Create folders matching your Notion hierarchy
- Upload or paste Markdown content into Knowledge module
- MoLOS auto-detects wikilinks and bidirectional links

### Tips
- Notion databases with linked records → Create relationships in MoLOS (coming soon)
- Complex formulas → Document them in notes or archive them
- Databases with templates → Recreate using MoLOS Task templates

---

## Migrate from Obsidian

### Export from Obsidian
1. Open Obsidian vault folder
2. Select all `.md` files (and attachments folder)
3. Copy to a temporary location

### Import Notes/Knowledge
Obsidian Markdown is fully compatible with MoLOS:

**Step 1:** Bulk upload your Markdown files
- In MoLOS Knowledge, use Import → Folder Upload
- Select your Obsidian vault export folder
- Choose to preserve folder structure

**Step 2:** MoLOS auto-converts:
- `[[wikilinks]]` → Bidirectional linking (compatible!)
- `#tags` → Auto-tagged knowledge entries
- Frontmatter metadata → Knowledge properties
- Embedded images → Preserved and linked

### Migrate Tasks (if using Obsidian Tasks plugin)
- Export using Obsidian Tasks → Export to CSV
- Follow the [Notion → Tasks import](#import-tasks) guide above

### Migrate Daily Notes
- MoLOS doesn't have a daily notes plugin, but you can:
  - Store daily notes in Knowledge with `#daily` tag
  - Use Tasks with date filtering for daily task review
  - Create a Routine for daily reflection

### Tips
- Obsidian plugins don't port over — you'll need MoLOS equivalents
- Transclusion (`![[file]]`) → MoLOS uses embedding instead
- Obsidian Graph View → MoLOS has relationship mapping (enhanced in upcoming release)
- Dataview queries → Recreate as MoLOS filters and searches

---

## Migrate from Logseq

### Export from Logseq
1. Open Logseq Settings → Export → Export Graph
2. Logseq exports as EDN format (and optionally Markdown)
3. Choose Markdown export for easier import

### Import Notes/Knowledge
**Step 1:** Export as Markdown
- Settings → Export → Markdown
- Logseq creates a folder with all pages as `.md` files

**Step 2:** Import into MoLOS
- In MoLOS Knowledge, use Import → Folder Upload
- Select the Logseq export
- MoLOS auto-converts:
  - Logseq hierarchical blocks → Headings and nested structure
  - `#tags` → Knowledge tags
  - Backlinks → Bidirectional relationships

### Migrate Tasks/TODO Items
- Logseq stores TODOs as markdown checkboxes
- Export with Markdown includes checkboxes
- Import to MoLOS Knowledge, then manually create Tasks for action items

### Migrate Daily Notes
- Logseq daily journals → MoLOS Knowledge with date-based naming
- Organize into a `/journals` folder in Knowledge
- Set up a Routine for daily reflection to replace daily note workflow

### Tips
- Logseq graph view relationships → Use MoLOS Knowledge linking
- Plugins and themes → Find MoLOS module equivalents
- Query syntax → Use MoLOS filters instead

---

## Migrate from Other Tools



### Apple Notes / Google Keep
1. Export as OPML or use browser export extensions
2. Convert to Markdown (tools like Pandoc can help)
3. Import as Knowledge into MoLOS

### Microsoft OneNote
1. Export sections as Word documents
2. Convert to Markdown (use online converters or Pandoc)
3. Bulk import into MoLOS Knowledge

### Evernote
1. Use Evernote's export feature (Export → ENEX format)
2. Use tools like [Evernote to Markdown](https://github.com/wormi4ok/evernote2md) converters
3. Import resulting Markdown into MoLOS Knowledge

---

## Post-Migration Checklist

- [ ] All tasks imported and organized
- [ ] All notes/knowledge entries migrated
- [ ] Images and attachments linked correctly
- [ ] Tags and relationships verified
- [ ] Key workflows set up in Routines
- [ ] Team members added (if team MoLOS instance)
- [ ] Backup of MoLOS database created
- [ ] Old tool can be archived/deleted

---

## Need Help?

-  Ask on [GitHub Discussions](https://github.com/eduardez/MoLOS/discussions) with your tool/migration questions
-  Check tool-specific import guides in [External Integrations](../guides/external-integrations.md)
-  Community members may have migration scripts available

**Pro Tip:** Share your migration experience! Help others by documenting custom import scripts or tools you create. 

-->
