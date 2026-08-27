import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { aiService } from "../services/aiService";

export default function StudentAiTutor() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Bonjour ! Je suis ton tuteur Smart Classe. Pose-moi n'importe quelle question sur tes cours !" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      const data = await aiService.askStudentTutor(currentQuestion);
      setMessages((prev) => [...prev, { sender: "ai", text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Désolé, une erreur s'est produite lors de la génération de la réponse." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col h-[450px]">
      <div className="flex items-center gap-2 mb-4 text-blue-400 font-semibold border-b border-slate-800 pb-3">
        <Sparkles size={20} />
        <span>Tuteur IA Interactif</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-200 border border-slate-700"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-500 italic">Le tuteur réfléchit...</div>}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose une question..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-3 rounded-xl text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}