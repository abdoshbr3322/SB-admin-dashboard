class Table {
  #maxEntries;
  #startEntry;
  #searchWords;
  #matchedRows;
  constructor(table) {
    this.tableRows = Array.from(table.querySelectorAll("tbody tr"));

    // select page elements
    this.entriesSelector = document.querySelector(".table-entries select");
    this.searchInput = document.querySelector(".table-search input");
    this.pagination = document.querySelector(".table-pagination");

    // define max entries count and start entry
    this.#maxEntries = parseInt(this.entriesSelector.value);
    this.#startEntry = 0;
    this.#searchWords = [""];
    this.#matchedRows = this.tableRows;
    this.init();
  }
  init() {
    // handle input change and entries max count and pages
    this.filterEntries(this.entriesSelector.value);
    this.entriesSelector.onchange = (e) => this.filterEntries(e.target.value);
    this.searchInput.oninput = this.handleSearchChange;
  }
  handleSearchChange(e) {
    this.#searchWords = e.target.value.split(" ");
    this.filterSearch();
  }
  filterEntries(entries) {
    this.#maxEntries = entries;
    this.handlePaginationBtns();
  }
  handlePaginationBtns() {
    let btnsLength = Math.floor(this.tableRows.length / this.#maxEntries);
    let indexPaginations = this.pagination.querySelectorAll(".page-item.index");
    if (btnsLength === indexPaginations.length) {
      this.filterPage();
      return;
    }
    let paginationClone = indexPaginations[0].cloneNode(true);
    indexPaginations.forEach((btn) => btn.remove());
    for (let i = 0; i, btnsLength; i++) {
      let btn = paginationClone.cloneNode(true);
      console.log(btn.firstChild);
    }
    this.filterPage();
  }
  filterPage() {
    this.filter();
  }
  filterSearch() {
    // match table rows independent of the use input
    this.#matchedRows = this.tableRows.filter((row) => {
      return this.#searchWords.reduce((prev, word) => {
        let re = new RegExp(word || "", "i");

        return prev && re.test(row.textContent);
      }, new RegExp(this.#searchWords[0], "i").test(row.textContent));
    });
    this.filter();
  }
  filter() {
    this.tableRows.forEach((row) => (row.style.display = "none"));

    let maxRow =
      this.#maxEntries > this.#matchedRows.length
        ? this.#matchedRows.length
        : this.#maxEntries;

    for (let i = 0; i < maxRow; i++) {
      this.#matchedRows[this.#startEntry + i].style.display = "table-row";
    }
  }
}

// initialize table
const table = new Table(document.querySelector("table#data-table"));
