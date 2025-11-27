"use client";

import { useState, useEffect } from "react";
import { Download, Lock, RefreshCw } from "lucide-react";

type Result = {
    id: number;
    name: string;
    score: string;
    details: any;
    created_at: string;
};

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchResults = async (pwd: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/results?secret=${pwd}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data.results);
                setIsAuthenticated(true);
            } else {
                setError("Mot de passe incorrect");
            }
        } catch (err) {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchResults(password);
    };

    const downloadCSV = () => {
        const headers = ["ID", "Date", "Nom", "Score", "Détails"];
        const rows = results.map(r => [
            r.id,
            new Date(r.created_at).toLocaleString(),
            `"${r.name}"`, // Quote to handle commas
            r.score,
            `"${JSON.stringify(r.details).replace(/"/g, '""')}"` // Escape quotes for CSV
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `qualiopi_results_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
                        <p className="text-gray-500">Accès réservé au formateur</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Mot de passe"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {loading ? "Vérification..." : "Accéder"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Résultats Apprenants</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchResults(password)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                        >
                            <RefreshCw className="w-4 h-4" /> Actualiser
                        </button>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm"
                        >
                            <Download className="w-4 h-4" /> Exporter CSV
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Apprenant</th>
                                    <th className="px-6 py-4">Score</th>
                                    <th className="px-6 py-4">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.map((r) => {
                                    const scoreNum = parseInt(r.score.split('/')[0]);
                                    const passed = scoreNum >= 7;
                                    return (
                                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(r.created_at).toLocaleString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {r.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono font-bold">{r.score}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${passed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                    {passed ? 'Validé' : 'À revoir'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {results.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                            Aucun résultat pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
