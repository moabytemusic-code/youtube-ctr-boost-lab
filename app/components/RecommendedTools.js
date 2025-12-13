import { BarChart2, Zap, Sparkles } from 'lucide-react';

export default function RecommendedTools() {
    return (
        <div style={{ marginTop: '60px', width: '100%', maxWidth: '800px', textAlign: 'center' }}>
            <h3 className="section-title">Tools Used by Top 1% Creators</h3>
            <div className="grid grid-2">
                <a href="https://www.tubebuddy.com" target="_blank" rel="noopener noreferrer" className="hook-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', display: 'block' }}>
                    <div className="flex-center" style={{ marginBottom: '10px' }}>
                        <BarChart2 size={24} color="#FF2D55" />
                    </div>
                    <h4 style={{ color: '#fff' }}>TubeBuddy</h4>
                    <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
                        The #1 browser extension for keyword research and A/B testing thumbnails.
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '15px', fontSize: '0.8rem', color: '#FF2D55', fontWeight: 'bold' }}>Start for Free →</span>
                </a>

                <a href="https://vidiq.com" target="_blank" rel="noopener noreferrer" className="hook-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', display: 'block' }}>
                    <div className="flex-center" style={{ marginBottom: '10px' }}>
                        <Zap size={24} color="#FF2D55" />
                    </div>
                    <h4 style={{ color: '#fff' }}>VidIQ</h4>
                    <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
                        AI-powered daily video ideas and competitor analysis.
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '15px', fontSize: '0.8rem', color: '#FF2D55', fontWeight: 'bold' }}>Get AI Insights →</span>
                </a>

                <a href="https://www.epidemicsound.com" target="_blank" rel="noopener noreferrer" className="hook-card" style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', display: 'block' }}>
                    <div className="flex-center" style={{ marginBottom: '10px' }}>
                        <Sparkles size={24} color="#FF2D55" />
                    </div>
                    <h4 style={{ color: '#fff' }}>Epidemic Sound</h4>
                    <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
                        The best copyright-free music for monetized channels.
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '15px', fontSize: '0.8rem', color: '#FF2D55', fontWeight: 'bold' }}>30-Day Free Trial →</span>
                </a>
            </div>
        </div>
    );
}
