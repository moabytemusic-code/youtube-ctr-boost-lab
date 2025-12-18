"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Layout, ArrowRight, Loader2, Wand2, Globe, FileText, Sparkles, CheckCircle2, Rocket } from 'lucide-react';

export default function Home() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('description');
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        url: '',
        productName: '',
        audience: '',
        promise: '',
        goal: 'capture',
        style: 'clean-saas',
        rawText: ''
    });

    const handleTextAnalysis = async () => {
        if (!formData.rawText) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: formData.rawText })
            });
            if (!res.ok) throw new Error('Failed to analyze');
            const data = await res.json();

            setFormData(prev => ({
                ...prev,
                productName: data.productName,
                audience: data.audience,
                promise: data.promise
            }));

            setActiveTab('description');
        } catch (error) {
            console.error(error);
            alert('Could not analyze text.');
        } finally {
            setIsLoading(false);
        }
    };

    const analyzeUrl = async () => {
        if (!formData.url) {
            alert('Please enter a URL first');
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: formData.url })
            });
            if (!res.ok) throw new Error('Failed to analyze');
            const data = await res.json();

            // Auto-fill the form
            setFormData(prev => ({
                ...prev,
                productName: data.productName,
                audience: data.audience,
                promise: data.promise
            }));

            // Switch to description tab to show results
            setActiveTab('description');

        } catch (error) {
            console.error(error);
            alert('Could not analyze URL. Please check the link or fill manually.');
        } finally {
            setIsLoading(false);
        }
    };

    const generatePage = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Generation failed');

            const data = await response.json();

            // Merge AI content with project meta settings
            const projectData = {
                ...formData,
                generated: data
            };

            localStorage.setItem('forge_project', JSON.stringify(projectData));
            router.push('/editor');
        } catch (err) {
            console.error(err);
            alert('Failed to forge page. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden selection:bg-blue-500/30">

            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] z-0 pointer-events-none opacity-60">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10 py-12 md:py-20 flex flex-col items-center">

                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 px-4 py-1.5 rounded-full text-slate-300 text-xs font-bold uppercase tracking-widest mb-8 hover:bg-slate-800/80 transition-colors shadow-lg cursor-default">
                    <Sparkles size={14} className="text-blue-400" />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Page Builder V2.0</span>
                </div>

                {/* Hero Header */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Turn ideas into <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">High-Converting Pages</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Skip the design struggle. Describe your product, paste a URL, or drop raw text.
                        The <span className="text-slate-200 font-semibold">LandingForge AI</span> builds the layout, copy, and code in seconds.
                    </p>
                </div>

                {/* Main Interaction Card */}
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: The Forge Interface */}
                    <div className="lg:col-span-7 glass-panel p-1.5 shadow-2xl shadow-blue-900/10 animate-float">
                        <div className="bg-slate-950/80 rounded-xl p-6 md:p-8 h-full border border-slate-800/50">

                            {/* Tabs */}
                            <div className="flex p-1 bg-slate-900 rounded-xl mb-8 border border-slate-800 relative">
                                {[
                                    { id: 'description', icon: Sparkles, label: 'Describe' },
                                    { id: 'url', icon: Globe, label: 'From URL' },
                                    { id: 'text', icon: FileText, label: 'Raw Copy' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                                                ? 'bg-slate-800 text-white shadow-lg ring-1 ring-white/10'
                                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <tab.icon size={16} className={activeTab === tab.id ? 'text-blue-400' : ''} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-6 min-h-[300px]">
                                {activeTab === 'url' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <label className="label">Source URL</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="https://your-product-site.com"
                                                className="input-field"
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            />
                                            <button
                                                onClick={analyzeUrl}
                                                disabled={!formData.url || isLoading}
                                                className="bg-slate-800 hover:bg-slate-700 text-white px-6 rounded-xl font-bold text-sm transition-all border border-slate-700/50 whitespace-nowrap"
                                            >
                                                {isLoading ? <Loader2 className="animate-spin" /> : 'Analyze'}
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-3 flex gap-2 items-center">
                                            <Globe size={14} /> We'll extract your value proposition automatically.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'text' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <label className="label">Raw Content Dump</label>
                                        <textarea
                                            className="input-field min-h-[160px] resize-none leading-relaxed"
                                            placeholder="Paste your messy notes, Amazon description, or rough draft here..."
                                            value={formData.rawText || ''}
                                            onChange={(e) => setFormData({ ...formData, rawText: e.target.value })}
                                        />
                                        <button
                                            onClick={handleTextAnalysis}
                                            disabled={!formData.rawText || isLoading}
                                            className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl font-bold text-sm transition border border-slate-700/50 flex items-center justify-center gap-2"
                                        >
                                            <Sparkles size={16} className="text-purple-400" /> Analyze & Fill Form
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'description' && (
                                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div>
                                            <label className="label">Product Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Nexus AI"
                                                className="input-field"
                                                value={formData.productName}
                                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="label">Target Audience</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Freelancers"
                                                    className="input-field"
                                                    value={formData.audience}
                                                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">Hook / Promise</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 2x Revenue"
                                                    className="input-field"
                                                    value={formData.promise}
                                                    onChange={(e) => setFormData({ ...formData, promise: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-6" />

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="label">Conversion Goal</label>
                                        <div className="relative">
                                            <select
                                                className="input-field appearance-none cursor-pointer"
                                                value={formData.goal}
                                                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                            >
                                                <option value="capture">Lead Capture</option>
                                                <option value="sales">Product Sales</option>
                                                <option value="call">Book Strategy Call</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Design Aesthetic</label>
                                        <div className="relative">
                                            <select
                                                className="input-field appearance-none cursor-pointer"
                                                value={formData.style}
                                                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                            >
                                                <option value="clean-saas">Modern SaaS</option>
                                                <option value="bold-direct">Bold & Loud</option>
                                                <option value="creator">Minimal Creator</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={generatePage}
                                    disabled={isLoading || (activeTab === 'url' && !formData.url) || (activeTab === 'description' && !formData.productName)}
                                    className="w-full btn-primary mt-4 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                    <span className="relative flex items-center justify-center gap-3 text-lg">
                                        {isLoading ? (
                                            <><Loader2 className="animate-spin" /> Igniting Forge...</>
                                        ) : (
                                            <><Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Forge Page Now</>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Features / Social Proof */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-8 px-4 lg:px-0">

                        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <CheckCircle2 className="text-green-400" size={20} />
                                Why LandingForge?
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Zero Design Skills", desc: "Our AI handles spacing, typography, and layout hierarchy." },
                                    { title: "Conversion Optimized", desc: "Patterns based on millions of high-converting sessions." },
                                    { title: "Clean React Code", desc: "Export to standardized Next.js + Tailwind components." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0" />
                                        <div>
                                            <strong className="text-slate-200 block">{item.title}</strong>
                                            <span className="text-slate-400">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center lg:text-left">
                            <p className="text-slate-500 text-sm mb-4 uppercase tracking-widest font-bold">Trusted by Builders</p>
                            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Pseudolgos for effect */}
                                <div className="h-8 w-24 bg-white/10 rounded" />
                                <div className="h-8 w-24 bg-white/10 rounded" />
                                <div className="h-8 w-24 bg-white/10 rounded" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
