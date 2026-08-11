export default function StudentModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Nouvel étudiant
        </h2>

        <button
          onClick={onClose}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}