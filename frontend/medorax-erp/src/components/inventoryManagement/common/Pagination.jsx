import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Pagination = ({
  currentPage = 1,
  totalEntries = 14285,
  pageSize = 5,
}) => {
  const [page, setPage] = useState(currentPage);
  const [entries, setEntries] = useState(totalEntries);

  useEffect(() => {
    setEntries(totalEntries);
  }, [totalEntries]);

  useEffect(() => {
    const onTotalChange = (event) => setEntries(event.detail);
    window.addEventListener("inventory-total-change", onTotalChange);
    return () =>
      window.removeEventListener("inventory-total-change", onTotalChange);
  }, []);
  const calculatedTotalPages = Math.max(1, Math.ceil(entries / pageSize));
  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.dispatchEvent(
      new CustomEvent("inventory-page-change", { detail: nextPage }),
    );
  };
  const startEntry = entries === 0 ? 0 : (page - 1) * pageSize + 1;
  const endEntry = Math.min(page * pageSize, entries);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, calculatedTotalPages); i++) {
      pages.push(i);
    }
    if (calculatedTotalPages > 3) {
      pages.push("...");
      pages.push(calculatedTotalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 border-t border-outline-variant bg-surface-container-lowest p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-on-surface-variant">
        Showing{" "}
        <span className="font-semibold text-on-background">{startEntry}</span>{" "}
        to <span className="font-semibold text-on-background">{endEntry}</span>{" "}
        of{" "}
        <span className="font-semibold text-on-background">
          {entries.toLocaleString()}
        </span>{" "}
        entries
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => goToPage(Math.max(1, page - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-low disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((itemPage, index) =>
          itemPage === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-outline">
              ...
            </span>
          ) : (
            <button
              key={itemPage}
              onClick={() => goToPage(itemPage)}
              type="button"
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
                itemPage === page
                  ? "bg-primary text-on-primary shadow-sm"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {itemPage}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page === calculatedTotalPages}
          onClick={() => goToPage(Math.min(calculatedTotalPages, page + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition hover:bg-surface-container-low disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
