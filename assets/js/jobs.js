(() => {
  const app = document.querySelector("[data-jobs-app]");
  if (!app) return;

  const labels = {
    active: "Active",
    "no-deadline": "No Deadline",
    expired: "Expired",
  };
  const rows = [...app.querySelectorAll("[data-job]")];
  const search = app.querySelector("[data-jobs-search]");
  const position = app.querySelector("[data-jobs-position]");
  const status = app.querySelector("[data-jobs-status]");
  const summary = app.querySelector("[data-jobs-summary]");
  const empty = app.querySelector("[data-jobs-empty]");
  const now = new Date();

  const getStatus = (deadline) => {
    if (!deadline) return "no-deadline";
    const closeOfDeadline = new Date(`${deadline}T23:59:59`);
    return now > closeOfDeadline ? "expired" : "active";
  };

  rows.forEach((row) => {
    const rowStatus = getStatus(row.dataset.deadline);
    const label = row.querySelector("[data-job-status-label]");
    row.dataset.status = rowStatus;
    label.textContent = labels[rowStatus];
    label.classList.add(`job-status--${rowStatus}`);
  });

  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    rows.forEach((row) => {
      const item = row.dataset;
      const text = `${item.title} ${item.institution} ${item.location}`.toLowerCase();
      const matches =
        (!query || text.includes(query)) &&
        (!position.value || item.position === position.value) &&
        (!status.value || item.status === status.value);
      row.hidden = !matches;
      if (matches) visible += 1;
    });

    summary.textContent = `Showing ${visible} of ${rows.length} opportunities`;
    empty.hidden = visible !== 0;
  };

  search.addEventListener("input", update);
  position.addEventListener("change", update);
  status.addEventListener("change", update);
  update();
})();
