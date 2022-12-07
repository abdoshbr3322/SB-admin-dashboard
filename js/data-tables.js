class Table {
  #maxEntries;
  #startEntry;
  #matchedRows;
  #pageIndex;
  #pagesLength;
  
  static createPageItem(index) {
    // create elements
    let pageItem = document.createElement("li");
    let pageLink = document.createElement("button");

    // add classes and attributes
    pageItem.classList.add("page-item");
    pageItem.classList.add("index");
    pageItem.classList.add(`page-${index + 1}`);
    pageItem.setAttribute("data-index", index);

    pageLink.classList.add("page-link");

    // add content
    pageLink.textContent = index + 1;
    pageItem.appendChild(pageLink);

    return pageItem;
  }

  constructor(table) {
    this.tableRows = Array.from(table.querySelectorAll("tbody tr"));

    // assign values to start entry, page index and, matched rows
    this.#startEntry = 0;
    this.#pageIndex = 0;
    this.#matchedRows = this.tableRows;
    this.init();
  }

  init() {
    // select page elements
    let entriesSelector = document.querySelector(".table-entries select");
    let searchInput = document.querySelector(".table-search input");
    let pagination = document.querySelector(".table-pagination");

    // handle input change and entries max count and pages
    this.filterEntries(entriesSelector.value);
    entriesSelector.onchange = (e) => this.filterEntries(e.target.value);
    searchInput.oninput = (e) => this.filterSearch(e.target.value.split(" "));
    Array.from(pagination.children).forEach((pageItem) => {
      pageItem.addEventListener("click", (e) => {
        this.filterPage(pageItem);
      });
    });
  }

  calculatePagesLength() {
    this.#pagesLength = Math.ceil(this.#matchedRows.length / this.#maxEntries); // count the length of the btns should be added
  }

  handlePaginationBtns() {
    this.calculatePagesLength();

    // get the page items that have indexes and remove them
    let indexPaginations = document.querySelectorAll(".page-item.index");
    indexPaginations.forEach((btn) => btn.remove());

    // select previous btn
    let prevEl = document.querySelector(".page-item.previous");

    // insert page btns
    for (let i = 0; i < this.#pagesLength; i++) {
      let pageItem = Table.createPageItem(i);
      pageItem.addEventListener("click", () => {
        this.filterPage(pageItem);
      });
      prevEl.insertAdjacentElement("afterend", pageItem);
      prevEl = pageItem;
    }
    if (this.#pagesLength > 0) {
      this.filterPage(document.querySelector(".page-item.page-1"));
    }
  }

  styleBtns() {
    // previos button
    let previousBtn = document.querySelector(".page-item.previous button");
    // next button
    let nextBtn = document.querySelector(".page-item.next button");
    // control classess
    this.#pageIndex > 0
      ? previousBtn.classList.remove("disabled")
      : previousBtn.classList.add("disabled");
    this.#pageIndex < this.#pagesLength - 1
      ? nextBtn.classList.remove("disabled")
      : nextBtn.classList.add("disabled");

    // remove active class from all btns
    let btns = document.querySelectorAll(".page-item.index");
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // add active class on the current btn
    document
      .querySelector(`.page-item.index.page-${this.#pageIndex + 1}`)
      .classList.add("active");
  }

  filterEntries(entries) {
    this.#maxEntries = entries;
    this.handlePaginationBtns();
  }

  filterPage(targetBtn) {
    if (targetBtn.classList.contains("index")) {
      this.#pageIndex = parseInt(targetBtn.dataset.index);
    } else if (
      targetBtn.classList.contains("next") &&
      this.#pageIndex < this.#pagesLength - 1
    ) {
      this.#pageIndex++;
    } else if (
      targetBtn.classList.contains("previous") &&
      this.#pageIndex > 0
    ) {
      this.#pageIndex--;
    }
    this.styleBtns();
    this.#startEntry = this.#pageIndex * this.#maxEntries;
    this.filter();
  }

  filterSearch(searchWords) {
    // match table rows independent of the user input
    this.#matchedRows = this.tableRows.filter((row) => {
      return searchWords.reduce((prev, word) => {
        let re = new RegExp(word || "", "i");

        return prev && re.test(row.textContent);
      }, new RegExp(searchWords[0], "i").test(row.textContent));
    });
    this.handlePaginationBtns();
  }

  filter() {
    this.tableRows.forEach((row) => (row.style.display = "none"));
    let maxRow = Math.min(
      this.#maxEntries,
      this.#matchedRows.length - this.#pageIndex * this.#maxEntries
    );
    for (let i = 0; i < maxRow; i++) {
      this.#matchedRows[this.#startEntry + i].style.display = "table-row";
    }
  }
}

// initialize table
const table = new Table(document.querySelector("table#data-table"));
