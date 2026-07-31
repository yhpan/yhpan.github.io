(() => {
  const app = document.querySelector("[data-jobs-app]");
  if (!app) return;

  const labels = {
    active: "Active",
    "no-deadline": "No Deadline",
    expired: "Expired",
  };
  const columns = Object.fromEntries(
    [...app.querySelectorAll("[data-jobs-column]")].map((column) => [
      column.dataset.jobsColumn,
      column,
    ]),
  );
  const cardSource = app.querySelector("[data-jobs-card-source]");
  const cards = [...cardSource.querySelectorAll("[data-job]")];
  const rows = [...app.querySelectorAll(".jobs-row[data-job]")];
  const rowsByKey = new Map(rows.map((row) => [row.dataset.jobKey, row]));
  const now = new Date();

  const getStatus = (deadline) => {
    if (!deadline) return "no-deadline";
    const closeOfDeadline = new Date(`${deadline}T23:59:59`);
    return now > closeOfDeadline ? "expired" : "active";
  };

  const setStatusLabel = (element, status) => {
    const label = element.querySelector("[data-job-status-label]");
    label.textContent = labels[status];
    label.classList.add(`job-status--${status}`);
  };

  const entries = cards.map((card) => {
    const row = rowsByKey.get(card.dataset.jobKey);
    const status = getStatus(card.dataset.deadline);
    card.dataset.status = status;
    row.dataset.status = status;
    setStatusLabel(card, status);
    setStatusLabel(row, status);
    columns[status].append(card);
    return { card, row, status };
  });

  const search = app.querySelector("[data-jobs-search]");
  const position = app.querySelector("[data-jobs-position]");
  const status = app.querySelector("[data-jobs-status]");
  const summary = app.querySelector("[data-jobs-summary]");
  const globalEmpty = app.querySelector("[data-jobs-empty]");

  const matchesFilters = (entry) => {
    const item = entry.card.dataset;
    const haystack = `${item.title} ${item.institution} ${item.location}`.toLowerCase();
    const matchesSearch = haystack.includes(search.value.trim().toLowerCase());
    const matchesPosition = !position.value || item.position === position.value;
    const matchesStatus = !status.value || entry.status === status.value;
    return matchesSearch && matchesPosition && matchesStatus;
  };

  const updateFilters = () => {
    const visibleCounts = { active: 0, "no-deadline": 0, expired: 0 };
    let visibleTotal = 0;

    entries.forEach((entry) => {
      const visible = matchesFilters(entry);
      entry.card.hidden = !visible;
      entry.row.hidden = !visible;
      if (visible) {
        visibleCounts[entry.status] += 1;
        visibleTotal += 1;
      }
    });

    Object.entries(visibleCounts).forEach(([key, count]) => {
      app.querySelector(`[data-jobs-count="${key}"]`).textContent = count;
      app.querySelector(`[data-jobs-column-empty="${key}"]`).hidden = count !== 0;
    });
    globalEmpty.hidden = visibleTotal !== 0;
    summary.textContent = `Showing ${visibleTotal} of ${entries.length} opportunities`;
  };

  [search, position, status].forEach((control) => {
    control.addEventListener(control === search ? "input" : "change", updateFilters);
  });

  const tabs = [...app.querySelectorAll("[data-jobs-view]")];
  const panels = [...app.querySelectorAll("[data-jobs-panel]")];

  const selectView = (view) => {
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.jobsView === view));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.jobsPanel !== view;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectView(tab.dataset.jobsView));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      selectView(next.dataset.jobsView);
    });
  });

  selectView("board");
  updateFilters();
})();
