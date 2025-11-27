"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { CheckCircle, XCircle, AlertCircle, ChevronRight, Send } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function Quiz() {
    const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
    const [name, setName] = useState("");
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) setStep("quiz");
    };

    const handleAnswer = (questionId: string, optionIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };

    const calculateScore = () => {
        let score = 0;
        QUESTIONS.forEach((q) => {
            if (answers[q.id] === q.correct) score++;
        });
        return score;
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < QUESTIONS.length) {
            alert("Veuillez répondre à toutes les questions.");
            return;
        }

        setIsSubmitting(true);
        const score = calculateScore();
        const details = QUESTIONS.map((q) => ({
            question: q.text,
            userAnswer: q.options[answers[q.id]],
            correct: answers[q.id] === q.correct,
        }));

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, score, details }),
            });

            if (res.ok) {
                setSubmissionStatus("success");
            } else {
                setSubmissionStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmissionStatus("error");
        } finally {
            setIsSubmitting(false);
            setStep("result");
        }
    };

    const score = calculateScore();
    const passed = score >= 7;

    if (step === "intro") {
        return (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bienvenue</h2>
                <p className="text-gray-600 mb-6 text-center">
                    Pour valider votre session, veuillez compléter ce questionnaire.
                </p>
                <form onSubmit={handleStart} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom et Prénom
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Ex: Jean Dupont"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Commencer le Quiz <ChevronRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        );
    }

    if (step === "quiz") {
        return (
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex justify-between items-center sticky top-4 z-10">
                    <span className="font-medium text-gray-600">Candidat : <span className="text-gray-900 font-bold">{name}</span></span>
                    <span className="text-sm text-gray-500">
                        {Object.keys(answers).length} / {QUESTIONS.length} répondues
                    </span>
                </div>

                <div className="space-y-6">
                    {QUESTIONS.map((q, index) => (
                        <div key={q.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex gap-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                {q.text}
                            </h3>
                            <div className="space-y-3 pl-11">
                                {q.options.map((opt, optIndex) => (
                                    <label
                                        key={optIndex}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                            answers[q.id] === optIndex
                                                ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                                                : "border-gray-200 hover:bg-gray-50"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={optIndex}
                                            checked={answers[q.id] === optIndex}
                                            onChange={() => handleAnswer(q.id, optIndex)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || Object.keys(answers).length < QUESTIONS.length}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            "Traitement en cours..."
                        ) : (
                            <>
                                Valider mes réponses <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Résultat</h2>

                <div className="flex justify-center my-6">
                    <div className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center border-4 text-4xl font-bold",
                        passed ? "border-green-500 text-green-600 bg-green-50" : "border-orange-500 text-orange-600 bg-orange-50"
                    )}>
                        {score}/{QUESTIONS.length}
                    </div>
                </div>

                <div className={cn(
                    "p-4 rounded-lg mb-6",
                    passed ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                )}>
                    {passed
                        ? "Félicitations ! Vous avez validé vos acquis."
                        : "Score insuffisant. Nous vous invitons à revoir le support de cours."
                    }
                </div>

                {submissionStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-6 justify-center">
                        <AlertCircle className="w-5 h-5" />
                        <span>Erreur de sauvegarde. Veuillez faire une capture d'écran.</span>
                    </div>
                )}

                <button
                    onClick={() => window.location.reload()}
                    className="text-gray-500 hover:text-gray-700 underline text-sm"
                >
                    Recommencer
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Correction Détaillée</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {QUESTIONS.map((q, index) => {
                        const isCorrect = answers[q.id] === q.correct;
                        return (
                            <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-3 mb-2">
                                    {isCorrect ? (
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Question {index + 1}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-1">{q.text}</p>
                                    </div>
                                </div>

                                {!isCorrect && (
                                    <div className="ml-9 mt-3 space-y-2 text-sm">
                                        <div className="flex gap-2 text-red-600">
                                            <span className="font-semibold">Votre réponse :</span>
                                            <span className="line-through">{q.options[answers[q.id]]}</span>
                                        </div>
                                        <div className="flex gap-2 text-green-600">
                                            <span className="font-semibold">Bonne réponse :</span>
                                            <span>{q.options[q.correct]}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
