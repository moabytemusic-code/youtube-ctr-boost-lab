import './globals.css'

export const metadata = {
    title: 'YouTube CTR Boost Lab™ | Viral Title & Hook Generator',
    description: 'Turn weak titles into scroll-stopping hooks in seconds. Free AI tool for YouTube creators.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    )
}
