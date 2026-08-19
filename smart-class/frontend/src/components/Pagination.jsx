export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        ◀ Précédent
      </button>

      <span className="text-slate-300">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Suivant ▶
      </button>
    </div>
  );
}