"use client";

import { useState } from 'react';
import { Sparkles, Zap, Lock, Mail, CheckCircle, Youtube, BarChart2, CircleHelp, X } from 'lucide-react';
import RecommendedTools from './components/RecommendedTools';
import './globals.css';

export default function Home() {
    const [step, setStep] = useState('input'); // input, teaser, success
    const [loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        title: '',
        keyword: '',
        channelType: 'Education',
        email: ''
    });

    // Results Data
    const [results, setResults] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/analyze-title', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    keyword: formData.keyword,
                    channelType: formData.channelType
                })
            });
            const data = await res.json();
            setResults(data);
            setStep('teaser');
        } catch (err) {
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/analyze-title', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData, // email is now populated
                    title: formData.title // send original title again
                })
            });
            if (res.ok) {
                setStep('success');
            }
        } catch (err) {
            alert('Failed to send email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen pb-20">
                {/* Header */}
                <header className="header">
                    <div className="container">
                        <div className="flex-center" style={{ gap: '10px' }}>
                            <Youtube size={32} color="#FF2D55" />
                            <h1 className="logo-text">YouTube CTR Boost Lab™</h1>
                        </div>
                        <p className="subtitle">Turn weak titles into scroll-stopping hooks in seconds.</p>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container" style={{ marginTop: '40px' }}>

                    {/* Step 1: Input */}
                    {step === 'input' && (
                        <section className="main-input-section">
                            <form onSubmit={handleAnalyze}>
                                <div className="input-group">
                                    <label className="label">Your Video Title / Draft</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="e.g. How to baking sourdough bread"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                    <div className="input-group">
                                        <label className="label">Channel Type</label>
                                        <select
                                            className="select-field"
                                            value={formData.channelType}
                                            onChange={(e) => setFormData({ ...formData, channelType: e.target.value })}
                                        >
                                            <option>Education</option>
                                            <option>Entertainment</option>
                                            <option>Reviews</option>
                                            <option>Vlog</option>
                                            <option>Faceless / Cash Cow</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="label">Focus Keyword (Optional)</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="e.g. Sourdough"
                                            value={formData.keyword}
                                            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="primary-btn" disabled={loading}>
                                    {loading ? 'Analyzing...' : 'Analyze My Title'}
                                </button>
                            </form>
                        </section>
                    )}

                    {/* Step 2: Teaser Results */}
                    {step === 'teaser' && results && (
                        <div className="results-area">
                            {/* Score Card */}
                            <div className="score-card">
                                <h2 style={{ color: '#fff', marginBottom: '20px' }}>CTR Analysis</h2>
                                <div className={`ctr-score ${results.score > 70 ? 'good' : results.score > 50 ? 'avg' : 'bad'}`}>
                                    {results.score}<span style={{ fontSize: '1rem', color: '#888' }}>/100</span>
                                </div>
                                <ul style={{ listStyle: 'none', marginTop: '15px' }}>
                                    {results.feedback.map((item, i) => (
                                        <li key={i} style={{ marginBottom: '5px', color: '#ccc' }}>• {item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Preview Titles */}
                            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                                <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h3 className="section-title" style={{ border: 'none', margin: 0 }}>Improved Title Ideas (Preview)</h3>
                                    <span style={{ fontSize: '0.8rem', background: '#333', padding: '4px 8px', borderRadius: '4px' }}>2 of 10 Unlocked</span>
                                </div>

                                <div className="preview-titles">
                                    {results.previewTitles.map((t, i) => (
                                        <div key={i} className="title-card">
                                            {t}
                                        </div>
                                    ))}

                                    {/* Blurred Placeholders */}
                                    <div className="title-card" style={{ filter: 'blur(4px)', opacity: 0.5, userSelect: 'none' }}>
                                        The 7 Secrets to Making Perfect Bread Every Time
                                    </div>
                                    <div className="title-card" style={{ filter: 'blur(4px)', opacity: 0.5, userSelect: 'none' }}>
                                        Why Your Sourdough Failed (And How to Fix It)
                                    </div>
                                </div>
                            </div>

                            {/* Email Gate */}
                            <div className="email-gate-overlay">
                                <div className="gate-content">
                                    <Lock size={48} color="#FF2D55" style={{ marginBottom: '15px' }} />
                                    <h2 className="gate-title">Unlock Your 30-Day Content Pack</h2>
                                    <p className="gate-description">
                                        Get the full report including <b>8 more viral titles</b>, <b>5 hook scripts</b>, and <b>3 verified thumbnail formulas</b> sent straight to your inbox.
                                    </p>

                                    <form onSubmit={handleUnlock}>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                className="input-field"
                                                placeholder="Enter your email address"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="primary-btn" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Me My Full Title Pack'}
                                        </button>
                                    </form>
                                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>No spam. Unsubscribe anytime.</p>
                                </div>
                            </div>

                            <div className="flex-center" style={{ marginTop: '20px' }}>
                                <button
                                    onClick={() => setStep('input')}
                                    style={{ background: 'none', color: '#666', textDecoration: 'underline' }}
                                >
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 'success' && (
                        <div className="results-area flex-center" style={{ flexDirection: 'column', padding: '60px 20px' }}>
                            <CheckCircle size={80} color="#2ba640" style={{ marginBottom: '20px' }} />
                            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Analysis Sent!</h2>
                            <p className="subtitle" style={{ maxWidth: '500px', textAlign: 'center', marginBottom: '40px' }}>
                                Your full YouTube CTR Boost Pack has been sent to <b>{formData.email}</b>. Check your inbox (and spam folder) in the next 2-3 minutes.
                            </p>

                            <a href="/" className="primary-btn" style={{ maxWidth: '400px', textAlign: 'center', background: '#333' }}>
                                Go Back Home
                            </a>

                            {/* Monetization / Recommended Tools */}
                            <RecommendedTools />
                        </div>
                    )}

                </div>
            </main>

            {/* Help Button - Moved Outside Main */}
            <button
                onClick={() => setShowHelp(true)}
                style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#000000', border: '5px solid #00FF00', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2147483647, boxShadow: '0 4px 20px rgba(0,0,0,0.8)', fontWeight: 'bold', fontSize: '14px' }}
            >
                <span>How To Use</span> <CircleHelp size={20} />
            </button>

            {/* Help Modal */}
            {showHelp && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 100000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '16px',
                        maxWidth: '400px', width: '90%', position: 'relative', border: '1px solid #333'
                    }}>
                        <button
                            onClick={() => setShowHelp(false)}
                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                        >
                            <X size={24} />
                        </button>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>How it Works</h3>

                        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#333', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                            <div><strong style={{ color: '#fff' }}>Draft</strong><p style={{ color: '#888', fontSize: '0.9rem' }}>Enter your raw video title idea.</p></div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#333', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                            <div><strong style={{ color: '#fff' }}>Analyze</strong><p style={{ color: '#888', fontSize: '0.9rem' }}>AI scores it against viral psychology.</p></div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ background: '#333', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                            <div><strong style={{ color: '#fff' }}>Optimize</strong><p style={{ color: '#888', fontSize: '0.9rem' }}>Get 5+ higher-CTR variations instantly.</p></div>
                        </div>

                        <button onClick={() => setShowHelp(false)} className="primary-btn" style={{ width: '100%', marginTop: '10px' }}>Got it</button>
                    </div>
                </div>
            )}
        </>
    );
}
