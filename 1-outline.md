## [#JSInTen] - Building A Chrome Extension

### Outline

1. Basic Setup
2. Setup Manifest File
3. Create Basic Content Script
4. Load Extension
5. Get Insults
6. Conclusion

#### Basic Setup

1. Create directory for project: _mkdir luther-insult-browser-extension_
2. Navigate into that directory: _cd luther-insult-browser-extension_
3. Create outline file _touch 1-outline.md_
4. Open VSCode _code ._
5. Open VSCode Terminal _Ctrl-`_
6. Bring in outline contents and preview (Markdown Preview Enhanced Plugin) _Cmd-K, V_

#### Setup Manifest File

1. Create manifest.json: _touch manifest.json_
2. Add the following code to manifest.json

```json
{
  "manifest_version": 2,
  "name": "Luther Insult Bot Extension",
  "version": "0.1",
  "content_scripts": [
    {
      "matches": ["https://ergofabulous.org/luther/insult-list.php"],
      "js": ["content.js"]
    }
  ]
}
```

#### Create Basic Content Script

1. Create content.js: _touch content.js_
2. Add the following code to content.js

```javascript
console.log("Ready to get Luther's insults");
```

#### Load Extension

1. Open Extensions in Chrome: _chrome://extensions_
2. Turn on Developer Mode
3. Click Load Unpacked Extension
4. Navigate to your folder and click "Select"
5. Navigate to Luther insult page and open console: _https://ergofabulous.org/luther/insult-list.php_

#### Get Insults

1. Open content.js
2. Add the following code to content.js

```javascript
(async () => {
  const insults = [];
  const sources = Array.from(document.getElementsByClassName('large'));
  sources.forEach((source) => {
    const nextNodeName = source.nextElementSibling.nodeName;
    if (nextNodeName === 'TABLE') {
      const sourceTable = source.nextElementSibling;
      const tableBody = sourceTable.getElementsByTagName('tbody')[0];
      const tableRows = Array.from(tableBody.getElementsByTagName('tr'));
      tableRows.forEach((r) => {
        insults.push(r.childNodes[3].innerText.trim());
      });
    }
  });

  if (!navigator.clipboard) {
    console.info('Could not copy insults');
    return;
  }
  try {
    await navigator.clipboard.writeText(JSON.stringify(insults));
    console.info('Copied insults.');
  } catch (err) {
    console.error('Failed to copy!', err);
  }
})();
```

## Conclusion

1. Git

- echo "# luther-insult-browser-extension" >> README.md
- git init
- git add .
- git commit -m "first commit"
- git remote add origin https://github.com/mike-munchdev/luther-insult-browser-extension.git
- git push -u origin master

2. You can find a link to code on GitHub below in the description of this video
3. Don't forget to like, comment, subscribe and share so we can keep bring you this free content.
4. What would you like to see next?
5. Alright, so you all on the next one! Happy Coding!
