class Table {
  constructor(table, entriesSelector, searchInput, pagination) {
    this.tableRows = Array.from(table.querySelectorAll("tr"));
    this.entriesSelector = entriesSelector;
    this.searchInput = searchInput;
    this.pagination = pagination;

    // define max entries count and start entry
    this.maxEntries = this.entriesSelector.value;
    this.startEntry = 0;
    this.searchWords = [""];
    this.init();
  }
  init() {
    this.filterEntries(this.entriesSelector.value);
    this.entriesSelector.onchange = (e) => this.filterEntries(e.target.value);
  }
  filterEntries(entries) {
    this.maxEntries = entries;
    this.filterSearch();
  }
  filterSearch() {}
  filterPage() {}
}

// select page elements
const entries = document.querySelector(".entries select"),
  search = document.querySelector(".search input"),
  pagination = document.querySelector(".pagination");

// initialize table
const table = new Table(
  document.querySelector("table#data-table"),
  entries,
  search,
  pagination
);
