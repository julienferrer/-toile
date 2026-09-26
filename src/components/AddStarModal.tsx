import React, { useState } from 'react';
import { StoryCategory } from '../types/universe';

interface AddStarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, category: StoryCategory) => void;
}

const CATEGORY_OPTIONS: { id: StoryCategory; label: string }[] = [
  { id: 'ordinaire', label: 'Un moment ordinaire' },
  { id: 'souvenirs', label: 'Un souvenir précieux' },
  { id: 'amour', label: 'Un élan de tendresse' },
  { id: 'amitié', label: 'Une amitié sincère' },
  { id: 'famille', label: 'Un lien familial' },
  { id: 'espoir', label: 'Une lueur d’espoir' },
  { id: 'solitude', label: 'Un silence partagé' },
];

export const AddStarModal: React.FC<AddStarModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<StoryCategory>('ordinaire');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim(), category);
    setText('');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg w-full p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-slate-800/80 shadow-2xl backdrop-blur-xl animate-ethereal-in"
      >
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400 block mb-2 font-sans">
            Constellation des existences
          </span>
          <h2 className="text-2xl font-serif text-slate-100">
            Déposer une étoile dans l'univers
          </h2>
          <p className="text-sm font-sans text-slate-400 mt-2 leading-relaxed">
            Chaque instant compte. Confiez un geste simple, un souvenir ou une pensée. Votre étoile rejoindra le cosmos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex: Quelqu'un vient d'écouter la pluie tomber sur le toit..."
              maxLength={160}
              rows={3}
              autoFocus
              className="w-full px-4 py-3 text-base font-serif bg-slate-950/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none"
            />
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500 font-sans">
              <span>Votre texte restera discret dans le ciel</span>
              <span>{160 - text.length} car.</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-sans">
              Nature de cet instant
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-indigo-950/60 border-indigo-400/50 text-indigo-200'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="text-xs uppercase tracking-[0.15em] text-white bg-indigo-600/70 hover:bg-indigo-500/80 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-lg shadow-indigo-900/30"
            >
              Allumer cette étoile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
