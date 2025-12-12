export default function Footer() {
    return (
        <footer className="relative bg-neutral-950 text-white py-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 font-heading">WaterPlane</h3>
                        <p className="text-neutral-400 max-w-sm">
                            The Digital Growth Partner for the New Internet. Strategy, content, and AI-driven growth.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold mb-4 text-neutral-200">Links</h4>
                            <ul className="space-y-2 text-neutral-400">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="/dives" className="hover:text-white transition-colors">Dives</a></li>
                                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-neutral-200">Socials</h4>
                            <ul className="space-y-2 text-neutral-400">
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Twitter/X</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} WaterPlane. All rights reserved.</p>
                    <p>Designed & Built by Antigravity</p>
                </div>

                {/* Giant Text */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5 select-none">
                    <h1 className="text-[15rem] leading-none font-heading font-black whitespace-nowrap translate-y-[20%] text-center">
                        WATERPLANE
                    </h1>
                </div>
            </div>
        </footer>
    );
}
