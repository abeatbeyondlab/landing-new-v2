# Post Lifecycle Management Guide

This guide explains how to manage blog posts and tags using the provided Makefile commands and scripts. These tools allow for downloading content and metadata to local files, editing them, and syncing changes back to the SQLite database.

## **Overview**

The workflow relies on two types of files in the `blogpost/` directory:
1.  **Markdown Files (`{id}.{title}.md`)**: Contains the raw content of the post.
2.  **Metadata JSON Files (`{id}.json`)**: Contains post details (title, slug, date, state, author) and tag associations.
3.  **Tags JSON File (`tags.json`)**: Contains the global list of available tags.

---

## **Commands Reference**

### **1. Content Management**

#### **Create New Post**
Creates a new post placeholder in the database.
```bash
make post-create
```
*   **Interactive**: Prompts for Title and Slug.
*   **Output**: Returns the new Post ID.
*   **Next Steps**: After creation, run `make post-download` to get the file, or manually create `{id}.json` and `{id}.Title.md`.

#### **Download Content**
Downloads all posts from the database to markdown files in `blogpost/`.
```bash
make post-download
```
*   **Output**: Files like `blogpost/5.DB NoSQL.md`.
*   **When to use**: To get the latest content before editing.

#### **Update Content**
Uploads the content from a local markdown file to the database.
```bash
make post-update ID=<post_id>
```
*   **Example**: `make post-update ID=5`
*   **Logic**: Reads the markdown file starting with ID `5` and updates the `content` field in the database.

---

### **2. Metadata & Tags Management**

#### **Download Metadata**
Downloads post metadata (excluding content) to JSON files.
```bash
make post-metadata
```
*   **Output**: Files like `blogpost/5.json`.
*   **Details**: Includes `title`, `slug`, `description`, `date`, `state`, and `post_tag` associations. Excludes `content` and `updated_at`.

#### **Update Metadata**
Updates a post's metadata and tag associations from its JSON file.
```bash
make post-update-metadata ID=<post_id>
```
*   **Example**: `make post-update-metadata ID=5`
*   **Logic**: 
    1.  Reads `blogpost/5.json`.
    2.  Updates fields: `slug`, `title`, `description`, `date`, `author`, `state`, `image_slug`.
    3.  **Syncs Tags**: Replaces the post's tag associations with those listed in the JSON. To remove a tag, remove it from the JSON array. to add a tag, add `{ "tag": { "id": <tag_id> } }` to the array.

#### **Manage Global Tags**
*   **Download Tags**:
    ```bash
    make tags-download
    ```
    *   Downloads all available tags to `blogpost/tags.json`.

*   **Upload/Sync Tags**:
    ```bash
    make tags-upload
    ```
    *   Reads `blogpost/tags.json`.
    *   Updates tag names/slugs if IDs match. Creates new tags if no ID is provided.

---

### **3. Status & Deletion**

#### **Change Post Status**
Quickly toggle between Draft (0) and Published (1).
```bash
make post-status ID=<post_id> STATE=<0|1>
```
*   **Example**: `make post-status ID=5 STATE=1` (Publish post 5)

#### **Delete Post**
Deletes a post from the database **AND** removes its local files (md and json).
```bash
make post-delete ID=<post_id>
```
*   **Example**: `make post-delete ID=5`
*   **Warning**: This action is irreversible.

---

## **Workflow Examples**

### **Scenario A: Creating a New Post**
1.  Run `make post-create`.
2.  Enter the Title and optional Slug. Note the New ID returned (e.g., 42).
3.  Create `blogpost/42.json` (copy-paste from another file and edit).
4.  Create `blogpost/42.MyTitle.md`.
5.  Edit content and metadata.
6.  Run `make post-update-metadata ID=42` and `make post-update ID=42`.

### **Scenario B: Editing a Post's Content**
1.  Run `make post-download` to get the latest markdown.
2.  Edit `blogpost/5.MyPost.md` in your editor.
3.  Run `make post-update ID=5` to save changes to DB.

### **Scenario C: Renaming a Title or Changing Tags**
1.  Run `make post-metadata` to get the latest JSON.
2.  Edit `blogpost/5.json`:
    *   Change `"title": "New Title"`.
    *   Add a tag object to `"post_tag"` array (use ID from `tags.json`).
3.  Run `make post-update-metadata ID=5` to apply changes.

### **Scenario D: Creating a New Tag**
1.  Run `make tags-download`.
2.  Add a new object to `blogpost/tags.json`:
    ```json
    { "name": "New Topic", "slug": "new-topic" }
    ```
3.  Run `make tags-upload`.

---

## **Content Creation Guide (Megaprompt)**

To ensure consistency across all blog posts, use the following prompt when generating new content. This structure is designed to engage SMEs, provide value, and naturally integrate A Beat Beyond's services.

### **Prompt Component for AI Agents**

copy and paste this into your context:

```text
ROLE:
You are an expert IT Consultant and Digital Transformation Architect for A Beat Beyond. Your target audience consists of Italian SME (PMI) owners and managers who are non-technical but business-oriented. Your tone is professional, authoritative yet accessible, and focused on "Engineering" (Ingegnerizzazione) rather than just "installing software".

GOAL:
Write a blog post about [TOPIC].

STRUCTURE & GUIDELINES:

1.  **H2 Title**: Create a compelling title that addresses a pain point or opportunity for SMEs.
2.  **Introduction**:
    *   Hook the reader immediately.
    *   Explain clearly what the technology/concept is (avoiding jargon or explaining it simple).
    *   Explain WHY it matters for an Italian PMI today.
3.  **Core Content (H3 headers)**:
    *   Break down the topic into 2-3 logical sections.
    *   Use a Table if comparing two concepts (e.g., Old way vs New way).
    *   Focus on benefits: Efficiency, Cost Reduction, Security, Scalability.
    *   **Formatting**: Use **bold** for key concepts to improve scannability.
4.  **Strategic Internal Linking (CRITICAL)**:
    *   You MUST inject internal links to A Beat Beyond solutions naturally within the text. Do not just list them at the end. Use the context of the sentence to link relevant keywords.
    *   Reference the services below:
        *   **Strategy**: "consulenza strategica software" -> `/solutions/software-strategy-consulting-and-advisory`
        *   **Architecture**: "architetture IT", "infrastruttura" -> `/solutions/it-architecture-design`
        *   **Integration**: "integrazione sistemi", "ERP", "MES" -> `/solutions/systems-integration`
        *   **Security**: "cybersecurity", "sicurezza dati" -> `/solutions/cybersecurity`
        *   **Data/BI**: "business intelligence", "analisi dati" -> `/solutions/business-intelligence`
        *   **Open Source**: "open source", "vendor lock-in" -> `/solutions/open-source-software`
        *   **Project Mgmt**: "gestione progetti", "project management" -> `/solutions/project-management`
        *   **Training**: "formazione" -> `/solutions/training`
5.  **The "A Beat Beyond" Approach**:
    *   Transition to a section titled: **"Il Tuo Partner per l'Ingegneria della Digitalizzazione"**.
    *   Explain that technology needs an engineering approach, not DIY.
    *   List 3 steps on how you work: Strategy -> Execution -> Management.
6.  **Call to Action**:
    *   End with a strong closing.
    *   Add a direct link: `[Richiedi ora la tua consulenza strategica gratuita di 30 minuti](/)`.

EXAMPLE SNIPPET FOR LINKING:
"Per ottenere questi risultati, è fondamentale una corretta [integrazione tra i sistemi aziendali](/solutions/systems-integration), che permetta ai dati di fluire verso dashboard di [Business Intelligence](/solutions/business-intelligence) per decisioni più rapide."

LANGUAGE:
Italian. 
```
