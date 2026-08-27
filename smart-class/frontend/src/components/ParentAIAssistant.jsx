import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, X, RefreshCw } from "lucide-react";

const quickPrompts = [
  "Résumé du travail de Marc cette semaine",
  "Comment l'aider en Mathématiques ?",
  "Quels sont les prochains devoirs urgents ?",
];

export default function ParentAIAssistant({ isOpen, onClose, childName = "Marc Floyd", parentName = "Parent", childClass = "Terminale C" }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Bonjour ! Je suis l'assistant pédagogique de Smart Classe. Comment puis-je vous aider dans le suivi de ${childName} aujourd'hui ?`,
      time: "Aujourd'hui",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      // Requete HTTP vers le backend Spring Boot
      const response = await fetch("http://localhost:8080/api/ai/parent-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: parentName,
          studentName: childName,
          studentClass: childClass,
          userPrompt: query,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("❌ Erreur d'appel API :", error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Désolé, une erreur est survenue lors de la connexion avec l'assistant. Veuillez réessayer.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex h-[600px] w-full max-w-2xl flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl text-white">
        
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold">
                Assistant IA Parent <Sparkles size={16} className="text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400">Suivi personnalisé pour {childName}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Zone des messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-blue-400 border border-slate-700"
                }`}
              >
                {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap"
                }`}
              >
                <p>{msg.text}</p>
                <span className="mt-2 block text-[10px] text-slate-400 text-right">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                <Bot size={16} />
              </div>
              <div className="rounded-2xl rounded-tl-none border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw size={14} className="animate-spin text-blue-400" /> L'IA analyse les données de {childName}...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions de questions rapides */}
        <div className="px-5 py-2 border-t border-slate-800/50 bg-slate-950/40">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap rounded-xl border border-slate-800 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-blue-500 hover:bg-blue-600/10 hover:text-blue-400 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Champ de saisie */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-slate-800 p-4"
        >
          <input
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Posez une question sur la scolarité de ${childName}...`}
            className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
}