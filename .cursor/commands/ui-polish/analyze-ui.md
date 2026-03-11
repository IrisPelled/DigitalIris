---

name: analyze-ui

description: Analyze UI structure and identify components, sections, and hierarchy

category: analysis

tags: \[analysis, structure, components, audit]

appliesTo: \[screen, page, component, layout]

modifiesCode: false

difficulty: easy

outputFormat: structured-report

---

Analyze the current screen or UI file and identify the structure of the interface.

Tasks:

1. Identify the main screen or page component.
2. Identify the main sections of the layout.
3. Identify reusable UI components used in the screen.
4. Provide the exact component names as they appear in the code.
5. Indicate the file location of each component if possible.

Output format:

Screen:

* name of the screen component

Sections:

* hero section
* feature section
* pricing section
* dashboard section
* footer section

Components:

* component name
* short description of what it renders
* file location if available

Component hierarchy (if possible):

* screen

  * section

    * component

      * subcomponent

Important rules:

* do not modify the code
* do not suggest design changes
* only analyze and report the UI structure
