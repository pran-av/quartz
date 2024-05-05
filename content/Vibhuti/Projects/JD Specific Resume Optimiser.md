---
date: 2024-05-05
tags:
  - "#product"
  - "#PRD"
  - "#resume"
---
Every job description is a new puzzle. Every resume is a unique solution for that puzzle.
### Goals
1. Improve resume **Quality** by allowing users to optimize their resumes for a specific job description
2. Save user's **Time Spent** in low value-add tasks like managing documentation, grammar, and copy-pasting.
3. Allow users to manage their achievements, learnings, and any resume data as individual components in a **Plug-and-Play** manner.
4. Help users **Analyse** their career history and make quality decisions.

### Use Cases
1. User wants to upload a resume template
2. User wants to add resume data as a collection of pointers
3. User wants to upload a JD to optimize the resume based on
4. User wants the system to go through the JD and identify the keywords
5. User wants the system to highlight points that are closest match to the JD
6. User wants the system to take an approval on the selected points and collect edits or new pointers
7. User wants the system to replace the approved points and create a new resume based on the template
8. User wants to download the optimised resume

### Prioritisation
1. P0 -- necessity for a functional MVP
	1. Add Resume Data
	2. Share JD
	3. Scan JD for Keywords
	4. Identify Closest Matching Pointers
	5. Suggest pointers to be used
3. P1 -- necessary for a good experience
	1. Upload Resume Templates
	2. Create New Resume
	3. Download Resume
4. P2 -- good to have
	1. Add new pointers during optimisation
	2. Approval on selected Pointers
	3. Edit Selected Pointers

### Requirements
1. Add Resume Data: A user adds a collection of pointers
	1. Editor to Add, Edit, and Delete Content
	2. Save Content
	3. Tag Content
2. Sharing of JD: A user copies a JD link and pastes it in the web app
	1. Collect links
	2. Validate links
	3. Show errors
	4. Allow resharing links
	5. Save link temporarily post adding
3. Scan JD: A user clicks on a Scan and the web app starts operation
	1. Start operation on clicks Scan CTA
	2. Validate if the data in link is scan-able - pre-scanning, during scanning, and post scanning
	3. Show errors
	4. Take user back to link sharing
	5. Compare scanned data with Added resume pointers
	6. Post successful, send results to webapp
4. Identify Matching Keywords
	1. Identify which keywords to highlight -- ignore grammar
	2. A viewer to show the common keywords highlighted
	3. Let user manually prioritise the common keywords
5. Suggest Pointers to be used
	1. Display suggestions for resume pointers based on keyword priorities
	2. Display missed keywords
	3. Copy pointers

### MVP

- [x] Part 1: Scripts 
	- Result: https://colab.research.google.com/drive/1_oOIzSfN9_7Y76l0KQOX0VPMptLBsywO?usp=sharing
- [ ] Part 2: Web App
	- Result: Blocked unable to execute webapp