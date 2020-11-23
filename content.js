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
    console.error('Could not copy insults');
    return;
  }
  try {
    await navigator.clipboard.writeText(JSON.stringify(insults));
    console.info('Copied insults.');
  } catch (err) {
    console.error('Failed to copy!', err);
  }
})();
