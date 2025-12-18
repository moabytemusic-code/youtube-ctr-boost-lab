"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Smartphone, Monitor, Download,
    Code, Eye, PenTool, Layout, CheckCircle2, Star, Quote, ArrowRight
} from 'lucide-react';

export default function Editor() {
    const router = useRouter();
    const [device, setDevice] = useState('desktop');
    const [project, setProject] = useState(null);
    const [customHeroImage, setCustomHeroImage] = useState(null);

    // Dummy Section Data (This would actually come from the AI Generator)
    const defaultSections = [
        { id: 'nav', type: 'navbar', content: { logo: "LandingForge", cta: "Get Started" } },
        {
            id: 'hero', type: 'hero', content: {
                headline: "The Headline That Stops The Scroll",
                subhead: "A clear, benefit-driven subheadline that explains exactly what the user gets.",
                cta: "Start Free Trial"
            }
        },
        {
            id: 'features', type: 'features', content: {
                title: "Everything You Need",
                items: ["Fast Export", "High Converting", "SEO Ready"]
            }
        },
        {
            id: 'howItWorks', type: 'steps', content: {
                heading: "How It Works",
                steps: [
                    { title: "Connect", desc: "Link your data sources in seconds." },
                    { title: "Analyze", desc: "Our AI finds the hidden patterns." },
                    { title: "Profile", desc: "Get tangible results instantly." }
                ]
            }
        },
        {
            id: 'testimonials', type: 'reviews', content: {
                heading: "Loved by thousands",
                reviews: [
                    { name: "Sarah J.", role: "Founder", text: "This tool completely changed how we ship products. Highly recommended!" },
                    { name: "Mark T.", role: "Developer", text: "The cleanest code export I've ever seen from a builder." }
                ]
            }
        },
        { id: 'pricing', type: 'pricing', content: { price: "$49", period: "/mo" } },
        { id: 'cta', type: 'cta', content: { title: "Ready to dive in?", btn: "Join Now" } },
    ];

    const [sections, setSections] = useState(defaultSections);

    useEffect(() => {
        // Load project data from onboarding
        const saved = localStorage.getItem('forge_project');
        if (saved) {
            const parsed = JSON.parse(saved);
            setProject(parsed);

            // Apply project specific text overrides if specific fields exist
            if (parsed.productName) {
                // Update sections only if we wanted to sync them with some internal 'sections' state separate from 'project.generated'
                // But mostly we rely on 'project.generated' for the view.
            }
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomHeroImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!project) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Editor...</div>;

    const handleDownload = () => {
        if (!project || !project.generated) return;

        const keyword = project.productName.split(' ')[0] || 'tech';
        const heroImgSrc = customHeroImage || `https://image.pollinations.ai/prompt/${project.productName}%20hero%20product%20photography?width=800&height=600&nologo=true`;

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.generated.meta?.title || project.productName}</title>
    <meta name="description" content="${project.generated.meta?.description || ''}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-white text-slate-900 antialiased">

    <!-- Nav -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <span class="font-bold text-xl tracking-tight text-slate-900">${project.generated.nav?.logo || project.productName}</span>
            <a href="#" class="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-700 transition shadow-lg shadow-slate-200/50 transform hover:-translate-y-0.5">${project.generated.nav?.cta || 'Get Started'}</a>
        </div>
    </nav>

    <!-- Hero -->
    <section class="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div class="text-center md:text-left space-y-8">
            <div class="space-y-6">
                <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight text-balance">${project.generated.hero.headline}</h1>
                <p class="text-xl text-slate-500 max-w-lg mx-auto md:mx-0 leading-relaxed">${project.generated.hero.subhead}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 items-center md:items-start pt-2">
                <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-200/50 w-full md:w-auto text-center transform hover:-translate-y-1">${project.generated.hero.cta}</a>
                ${project.generated.hero.trust ? `<span class="text-xs text-slate-400 font-bold uppercase tracking-wider py-4 md:py-4 md:pl-4 flex items-center gap-2"><svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${project.generated.hero.trust}</span>` : ''}
            </div>
        </div>
        <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3]">
                 <img src="${heroImgSrc}" alt="Hero Image" class="w-full h-full object-cover transform transition duration-700 hover:scale-105" />
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="py-24 bg-slate-50 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-20 max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">${project.generated.features.heading}</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-10">
                ${project.generated.features.items.map((item) => `
                <div class="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="w-14 h-14 rounded-xl bg-blue-50 mb-6 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                         <img src="https://image.pollinations.ai/prompt/${item.title}%20icon%20minimalist%20solid%20vector?width=100&height=100&nologo=true" class="w-8 h-8 object-contain opacity-50 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all" alt="icon"/>
                    </div>
                    <h3 class="font-bold text-xl mb-3 text-slate-900">${item.title}</h3>
                    <p class="text-slate-500 leading-relaxed">${item.desc}</p>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- How It Works (Steps) -->
    ${project.generated.howItWorks ? `
    <section class="py-24 px-6 bg-white overflow-hidden">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-20">
                <span class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Process</span>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">${project.generated.howItWorks.heading}</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8 relative">
                <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block z-0"></div>
                ${project.generated.howItWorks.steps.map((step, i) => `
                <div class="relative z-10 bg-white p-6 text-center">
                    <div class="w-16 h-16 mx-auto bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-purple-500/20 transform hover:scale-110 transition-transform duration-300">
                        ${i + 1}
                    </div>
                    <h3 class="font-bold text-xl mb-3 text-slate-900">${step.title}</h3>
                    <p class="text-slate-500">${step.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Testimonials -->
    ${project.generated.testimonials ? `
    <section class="py-24 bg-slate-900 px-6 text-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div class="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-blue-600/30 rounded-full blur-3xl"></div>
        </div>
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">${project.generated.testimonials.heading}</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                ${project.generated.testimonials.reviews.map((review) => `
                <div class="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition">
                    <div class="flex gap-1 text-yellow-500 mb-6">
                        ${Array(5).fill('★').join('')}
                    </div>
                    <p class="text-lg text-slate-300 mb-6 italic leading-relaxed">"${review.text}"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center font-bold text-slate-900 text-sm">
                            ${review.name.charAt(0)}
                        </div>
                        <div>
                            <div class="font-bold">${review.name}</div>
                            <div class="text-sm text-slate-500">${review.role}</div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Pricing -->
    <section class="py-24 px-6 bg-slate-50">
        <div class="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden hover:-translate-y-2 transition-transform duration-500">
           <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div> 
           <div class="text-center mb-8">
             <h3 class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 bg-blue-50 inline-block px-3 py-1 rounded-full">${project.generated.pricing.heading}</h3>
             <div class="flex items-baseline justify-center gap-1">
                <span class="text-6xl font-extrabold text-slate-900 tracking-tight">${project.generated.pricing.price}</span>
                <span class="text-slate-400 font-bold text-xl">${project.generated.pricing.period}</span>
             </div>
           </div>
           <ul class="space-y-4 mb-10">
             ${project.generated.pricing.items.map(benefit => `
               <li class="flex items-center gap-3 text-slate-700 font-medium">
                 <svg class="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 
                 ${benefit}
               </li>`).join('')}
           </ul>
           <a href="#" class="block w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-700 transition text-center shadow-lg transform active:scale-95">${project.generated.pricing.cta}</a>
           <p class="text-center text-xs text-slate-400 mt-4">No credit card required to start.</p>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 px-6 bg-white">
        <div class="max-w-3xl mx-auto">
           <h2 class="text-3xl font-bold text-center mb-16 text-slate-900">Frequently Asked Questions</h2>
           <div class="space-y-6">
             ${project.generated.faq.map(qa => `
                <div class="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition">
                   <h4 class="font-bold text-lg text-slate-900 mb-3">${qa.q}</h4>
                   <p class="text-slate-600 leading-relaxed">${qa.a}</p>
                </div>`).join('')}
           </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 text-center text-slate-500 text-sm border-t border-gray-100 bg-slate-50">
        <div class="flex justify-center gap-6 mb-8 text-slate-400">
            <a href="#" class="hover:text-slate-700 transition">Twitter</a>
            <a href="#" class="hover:text-slate-700 transition">LinkedIn</a>
            <a href="#" class="hover:text-slate-700 transition">Email</a>
        </div>
        <p>${project.generated.footer.copyright}</p>
    </footer>

</body>
</html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.productName.replace(/\s+/g, '-').toLowerCase()}-landing.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const updateProject = (path, value) => {
        setProject(prev => {
            const newProject = { ...prev };
            if (path === 'productName') {
                newProject.productName = value;
                if (newProject.generated?.nav) newProject.generated.nav.logo = value;
            } else {
                const parts = path.split('.');
                let current = newProject.generated;
                for (let i = 0; i < parts.length - 1; i++) {
                    current = current[parts[i]];
                }
                current[parts[parts.length - 1]] = value;
            }
            return newProject;
        });
    };

    return (
        <main className="h-screen bg-[#0f172a] flex flex-col overflow-hidden">
            <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 shrink-0 z-20 relative">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/')} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <input
                            type="text"
                            value={project.productName || 'Untitled'}
                            onChange={(e) => updateProject('productName', e.target.value)}
                            className="bg-transparent text-white font-bold text-sm border-b border-transparent focus:border-blue-500 outline-none transition w-40"
                        />
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">{project.style || 'SaaS'} Template</div>
                    </div>
                </div>

                <div className="flex bg-slate-800 rounded-lg p-1">
                    <button
                        onClick={() => setDevice('desktop')}
                        className={`p-2 rounded-md transition ${device === 'desktop' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('mobile')}
                        className={`p-2 rounded-md transition ${device === 'mobile' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700 transition">
                        <Code size={16} /> <span className="hidden md:inline">WP Code</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition shadow-lg hover:shadow-blue-500/20"
                    >
                        <Download size={16} /> <span className="hidden md:inline">Export HTML</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Outline */}
                <aside className="w-72 bg-slate-900 border-r border-slate-700 p-4 flex flex-col overflow-y-auto hidden md:flex z-10">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Page Structure</h3>
                    <div className="space-y-2">
                        {sections.map((section, idx) => (
                            <div key={section.id} className="bg-slate-800 p-3 rounded-lg border border-slate-700/50 flex items-center gap-3 cursor-grab hover:border-blue-500/50 transition group">
                                <span className="text-slate-500 text-xs font-mono">{idx + 1}</span>
                                <Layout size={14} className="text-slate-400" />
                                <span className="text-sm font-medium text-slate-200 capitalize">{section.id}</span>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-1">
                                    <button className="p-1 hover:text-blue-400"><Eye size={12} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center Canvas */}
                <div className="flex-1 bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-y-auto relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">

                    <div
                        className={`bg-white transition-all duration-300 shadow-2xl overflow-hidden origin-top ${device === 'mobile'
                            ? 'w-[375px] h-[750px] rounded-[40px] border-[12px] border-slate-800 shadow-slate-900'
                            : 'w-full max-w-5xl h-full rounded-xl shadow-2xl ring-1 ring-slate-800'
                            }`}
                    >
                        <div className="w-full h-full overflow-y-auto bg-white text-black font-sans scroll-smooth">

                            {/* RENDERER */}

                            {/* Navbar */}
                            <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
                                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                                    <span className="font-bold text-xl tracking-tight text-slate-900">{project.generated?.nav?.logo || "Brand"}</span>
                                    <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-slate-700 transition">{project.generated?.nav?.cta || "Get Started"}</button>
                                </div>
                            </nav>

                            {/* Hero */}
                            <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                                <div className="text-center md:text-left space-y-6">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">{project.generated?.hero?.headline}</h1>
                                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto md:mx-0">{project.generated?.hero?.subhead}</p>
                                    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start pt-4">
                                        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 w-full md:w-auto hover:-translate-y-1">{project.generated?.hero?.cta}</button>
                                        {project.generated?.hero?.trust && (
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider py-4 md:pl-4 flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-green-500" /> {project.generated.hero.trust}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-video md:aspect-[4/3]">
                                        <img
                                            src={customHeroImage || `https://image.pollinations.ai/prompt/${encodeURIComponent(project.productName)}%20hero%20image%20modern%20saas%20screenshot%20clean?width=800&height=600&nologo=true`}
                                            alt="Hero"
                                            className="w-full h-full object-cover transform transition duration-700 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Features */}
                            {project.generated?.features && (
                                <section className="py-24 bg-slate-50 px-6">
                                    <div className="max-w-6xl mx-auto">
                                        <div className="text-center mb-20 max-w-3xl mx-auto">
                                            <h2 className="text-3xl font-bold text-slate-900 mb-4">{project.generated.features.heading}</h2>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-8">
                                            {project.generated.features.items.map((item, i) => (
                                                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-xl mb-6 flex items-center justify-center">
                                                        <img
                                                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.title)}%20icon%20minimalist%20solid%20vector?width=100&height=100&nologo=true`}
                                                            className="w-6 h-6 object-contain opacity-60"
                                                            alt="icon"
                                                        />
                                                    </div>
                                                    <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* How It Works */}
                            {project.generated?.howItWorks && (
                                <section className="py-24 px-6 bg-white overflow-hidden">
                                    <div className="max-w-6xl mx-auto">
                                        <div className="text-center mb-20">
                                            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Process</span>
                                            <h2 className="text-3xl font-bold text-slate-900">{project.generated.howItWorks.heading}</h2>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-12 relative">
                                            {/* Line connector */}
                                            <div className="absolute top-8 left-0 w-full h-0.5 bg-slate-100 hidden md:block"></div>

                                            {project.generated.howItWorks.steps.map((step, i) => (
                                                <div key={i} className="relative z-10 bg-white pt-4 text-center group">
                                                    <div className="w-16 h-16 mx-auto bg-white border-4 border-slate-50 text-slate-900 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 shadow-xl shadow-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-200 transition-all duration-300">
                                                        {i + 1}
                                                    </div>
                                                    <h3 className="font-bold text-lg mb-2 text-slate-900">{step.title}</h3>
                                                    <p className="text-slate-500 text-sm px-4">{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Testimonials */}
                            {project.generated?.testimonials && (
                                <section className="py-24 bg-slate-900 px-6 text-white relative overflow-hidden">
                                    <div className="max-w-6xl mx-auto relative z-10">
                                        <div className="text-center mb-16">
                                            <h2 className="text-3xl font-bold">{project.generated.testimonials.heading}</h2>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {project.generated.testimonials.reviews.map((review, i) => (
                                                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                                                    <div className="flex gap-1 text-yellow-400 mb-6 text-sm">
                                                        <Star size={16} fill="currentColor" />
                                                        <Star size={16} fill="currentColor" />
                                                        <Star size={16} fill="currentColor" />
                                                        <Star size={16} fill="currentColor" />
                                                        <Star size={16} fill="currentColor" />
                                                    </div>
                                                    <p className="text-lg text-slate-300 mb-6 italic leading-relaxed">"{review.text}"</p>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                                                            {review.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-base">{review.name}</div>
                                                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{review.role}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Pricing */}
                            {project.generated?.pricing && (
                                <section className="py-24 px-6">
                                    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                                        <div className="text-center mb-8">
                                            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{project.generated.pricing.heading}</h3>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">{project.generated.pricing.price}</span>
                                                <span className="text-slate-400 font-bold ml-1">{project.generated.pricing.period}</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-4 mb-8 pl-4">
                                            {project.generated.pricing.items.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                                                    <CheckCircle2 size={18} className="text-green-500 shrink-0" /> {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg active:scale-95 transform">{project.generated.pricing.cta}</button>
                                        <p className="text-center text-xs text-slate-400 mt-4">Safe & secure payment.</p>
                                    </div>
                                </section>
                            )}

                            {/* FAQ */}
                            {project.generated?.faq && (
                                <section className="py-24 bg-slate-50 px-6">
                                    <div className="max-w-3xl mx-auto">
                                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
                                        <div className="space-y-4">
                                            {project.generated.faq.map((qa, i) => (
                                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition">
                                                    <h4 className="font-bold text-slate-900 mb-2">{qa.q}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{qa.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Footer */}
                            <footer className="py-12 text-center text-slate-400 text-sm border-t border-gray-100 bg-white">
                                <div className="flex justify-center gap-6 mb-8 text-slate-400">
                                    <span className="hover:text-slate-800 cursor-pointer transition">Twitter</span>
                                    <span className="hover:text-slate-800 cursor-pointer transition">LinkedIn</span>
                                    <span className="hover:text-slate-800 cursor-pointer transition">Contact</span>
                                </div>
                                <p>{project.generated?.footer?.copyright}</p>
                            </footer>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Settings */}
                <aside className="w-80 bg-slate-900 border-l border-slate-700 p-6 flex flex-col hidden xl:flex overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6 text-slate-400">
                        <PenTool size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Editor Panel</span>
                    </div>

                    <div className="space-y-6">
                        {/* Brand Name Input */}
                        <div>
                            <label className="label">Brand / Product Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={project.productName}
                                onChange={(e) => updateProject('productName', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label">Headline</label>
                            <textarea
                                className="input-field min-h-[100px] text-sm leading-relaxed"
                                value={project.generated?.hero?.headline}
                                onChange={(e) => updateProject('hero.headline', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Hero Image</label>
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800 transition cursor-pointer relative group">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="text-slate-400 text-xs flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Download size={18} className="text-blue-400" />
                                    </div>
                                    <span className="font-medium">Upload Custom Image</span>
                                </div>
                            </div>
                            {customHeroImage && <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><CheckCircle2 size={12} /> Image uploaded!</p>}
                        </div>
                        <div>
                            <label className="label">Primary Color</label>
                            <div className="flex gap-3">
                                {['#2563EB', '#DC2626', '#16A34A', '#0f172a'].map(c => (
                                    <button key={c} className="w-8 h-8 rounded-full border-2 border-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all hover:scale-110" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="label">CTA Text</label>
                            <input
                                type="text"
                                className="input-field"
                                value={project.generated?.hero?.cta}
                                onChange={(e) => updateProject('hero.cta', e.target.value)}
                            />
                        </div>
                        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-xs text-slate-400 leading-relaxed">
                            💡 <strong>Pro Tip:</strong> Click 'Export HTML' to get the full standalone code for this page, ready to host anywhere.
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-700">
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-1">
                                <CheckCircle2 size={16} /> SEO Optimized
                            </div>
                            <p className="text-xs text-green-300/60">Page title and meta description are automatically generated and applied.</p>
                        </div>
                    </div>
                </aside>

            </div>
        </main>
    );
}
