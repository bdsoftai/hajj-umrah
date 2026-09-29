import React, { useEffect, useState } from 'react';

const ArrowUpRightIcon: React.FC = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M7 7h10v10" />
    </svg>
);

const HeroSection: React.FC = () => {
    const [showImage, setShowImage] = useState(false);
    const [animateContent, setAnimateContent] = useState(false);

    useEffect(() => {
        // Text animations start immediately
        const contentTimer = setTimeout(() => setAnimateContent(true), 50);

        // Image appears at 3 seconds
        const imageTimer = setTimeout(() => setShowImage(true), 3000);

        return () => {
            clearTimeout(contentTimer);
            clearTimeout(imageTimer);
        };
    }, []);

    return (
        <section className="relative bg-gray-800 text-white overflow-hidden">
            {/* Lighter background */}
            <div className="absolute inset-0">
                <img
                    src="https://hajjpoint.com/wp-content/uploads/2026/07/hajjpoint-cover-1.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    {/* Left Content */}
                    <div className="space-y-6 pb-20 md:pb-32">
                        {/* Heading */}
                        <h1
                            className={`text-4xl md:text-5xl font-bold leading-tight transition-all duration-700 ease-out ${animateContent
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}
                        >
                            Begin Your Journey With Faith and Trust
                        </h1>

                        {/* Paragraph — delay 200ms */}
                        <p
                            className={`text-lg text-gray-200 transition-all duration-700 ease-out delay-200 ${animateContent
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}
                        >
                            Discover all the amazing packages at exclusive rates with expert guides and Sharia consultants.
                        </p>

                        {/* Button — delay 400ms, slides up from bottom */}
                        <a
                            href="https://wa.link/5ogpia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-[#C5A100] hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full transition-all duration-700 ease-out delay-[400ms] ${animateContent
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-16'
                                }`}
                        >
                            <span>Book Free Consultation</span>
                            <ArrowUpRightIcon />
                        </a>
                    </div>

                    {/* Right Image — bottom aligned */}
                    <div className="relative overflow-hidden flex items-end justify-center lg:justify-end self-end">
                        <img
                            src="https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/HAJJPOINT.png.bv.webp"
                            alt="Hero"
                            className={`w-full h-auto max-w-md lg:max-w-full transition-all duration-[1500ms] ease-out block ${showImage
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-full'
                                }`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;