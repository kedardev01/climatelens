import React, { useState } from 'react';
import { LearningModule } from '../../types';
import { X, BookOpen, CheckCircle, ChevronRight, HelpCircle, ArrowLeft, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleDetailModalProps {
  module: LearningModule | null;
  onClose: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({ module, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  if (!module) return null;

  const quizQuestion = {
    question: `Based on Module ${module.number}, which factor is the primary driver of rapid planetary warming?`,
    options: [
      'Natural Milankovitch orbital cycles',
      'Anthropogenic accumulation of heat-trapping greenhouse gases',
      'Solar irradiance fluctuations',
      'Lunar tidal dissipation'
    ],
    correct: 1,
    explanation: 'Over 99% of modern peer-reviewed scientific assessments demonstrate that anthropogenic GHG emissions since 1850 drive the observed +1.15°C anomaly.'
  };

  const handleSubmitQuiz = () => {
    setIsAnswerSubmitted(true);
    if (selectedAnswer === quizQuestion.correct) {
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-data font-black text-sm">
              {module.number}
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900">{module.title}</h3>
              <p className="text-xs text-slate-500 font-data">Guided Climate Science Journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'content'
                ? 'border-sky-600 text-sky-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Lesson</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-sky-600 text-sky-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Comprehension Check</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'content' ? (
            <>
              {/* Executive Overview */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 font-data">
                  Executive Brief
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {module.fullContent.overview}
                </p>
              </div>

              {/* Key Telemetry Points */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-data mb-3">
                  Core Scientific Observations
                </h4>
                <div className="space-y-2.5">
                  {module.fullContent.keyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-relaxed font-normal">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Indicators Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-data mb-3">
                  Critical Metrics
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {module.fullContent.dataPoints.map((dp, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                      <div className="text-[11px] text-slate-500 font-medium">{dp.label}</div>
                      <div className="text-sm font-black text-slate-900 font-data mt-0.5">{dp.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Pathway */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-data mb-1">
                  Mitigation &amp; Solution Vector
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {module.fullContent.solutionPath}
                </p>
              </div>
            </>
          ) : (
            /* Comprehension Quiz */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 font-data mb-2">
                  Module {module.number} Knowledge Assessment
                </h4>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {quizQuestion.question}
                </p>
              </div>

              <div className="space-y-2.5">
                {quizQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300';
                  if (isAnswerSubmitted) {
                    if (idx === quizQuestion.correct) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-sky-50 border-sky-500 text-sky-900 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !isAnswerSubmitted && setSelectedAnswer(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && idx === quizQuestion.correct && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  selectedAnswer === quizQuestion.correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  <div className="font-bold mb-1">
                    {selectedAnswer === quizQuestion.correct ? 'Correct!' : 'Review Feedback:'}
                  </div>
                  {quizQuestion.explanation}
                </div>
              )}

              <div className="flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswer === null}
                    className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAnswerSubmitted(false);
                      setSelectedAnswer(null);
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
          <span className="text-[11px] font-data text-slate-500">
            Intergovernmental Panel on Climate Change (IPCC AR6) Synchronized
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Module
          </button>
        </div>
      </div>
    </div>
  );
};
