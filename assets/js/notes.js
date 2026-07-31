(() => {
  const app = document.querySelector("[data-notes-app]");
  if (!app) return;

  const search = app.querySelector("[data-notes-search]");
  const year = app.querySelector("[data-notes-year]");
  const tagButtons = [...app.querySelectorAll("[data-notes-tag]")];
  const cardTagButtons = [...app.querySelectorAll("[data-note-card-tag]")];
  const notes = [...app.querySelectorAll("[data-note]")];
  const summary = app.querySelector("[data-notes-summary]");
  const empty = app.querySelector("[data-notes-empty]");
  let selectedTag = "";

  const selectTag = (tag) => {
    selectedTag = tag.toLowerCase();
    tagButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.notesTag === selectedTag);
      button.setAttribute("aria-pressed", String(button.dataset.notesTag === selectedTag));
    });
  };

  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    notes.forEach((note) => {
      const tags = note.dataset.noteTags.split("|").filter(Boolean);
      const text = `${note.dataset.noteTitle} ${note.dataset.noteExcerpt}`;
      const matches =
        (!query || text.includes(query)) &&
        (!year.value || note.dataset.noteYear === year.value) &&
        (!selectedTag || tags.includes(selectedTag));
      note.hidden = !matches;
      if (matches) visible += 1;
    });

    summary.textContent = `Showing ${visible} of ${notes.length} notes`;
    empty.hidden = visible !== 0;
  };

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectTag(button.dataset.notesTag);
      update();
    });
  });

  cardTagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectTag(button.dataset.noteCardTag);
      window.scrollTo({ top: app.offsetTop, behavior: "smooth" });
      update();
    });
  });

  search.addEventListener("input", update);
  year.addEventListener("change", update);

  const urlTag = new URLSearchParams(window.location.search).get("tag");
  selectTag(urlTag || "");
  update();
})();
