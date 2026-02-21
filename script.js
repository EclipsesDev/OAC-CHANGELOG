fetch("changelog.txt")
  .then(response => response.text())
  .then(text => {
    const container = document.getElementById("changelog");
    container.innerHTML = "";

    const logs = text.split(/\n?Dev Log\s+/).filter(Boolean).reverse();

    logs.forEach(log => {
      const section = document.createElement("div");
      section.className = "log-section";

      const lines = log.trim().split("\n");
      const titleText = "Dev Log " + lines[0];

      const title = document.createElement("div");
      title.className = "log-title";
      title.textContent = titleText;

      const list = document.createElement("ul");

      lines.slice(1).forEach(line => {
        if (line.trim().startsWith("-")) {
          const li = document.createElement("li");
          li.textContent = line.replace("-", "").trim();
          list.appendChild(li);
        }
      });

      section.appendChild(title);
      section.appendChild(list);
      container.appendChild(section);
    });
  })
  .catch(() => {
    document.getElementById("changelog").textContent =
      "ERROR: Unable to load changelog.";
  });
