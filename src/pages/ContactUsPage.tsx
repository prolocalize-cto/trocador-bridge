const ContactUsPage = () => {
  return (
    <div className="w-full flex items-center justify-center px-4 py-5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Get In Touch
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Have questions or need assistance? The GhostSwap team is here to
            help!
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Contact Us
          </h2>

          <div className="space-y-4 max-w-lg mx-auto">
            {/* Telegram */}
            <a
              href="https://t.me/hirejoey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.098.155.23.171.324.016.094.037.308.02.474z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-400 text-sm mb-1">Telegram</div>
                <div className="text-white text-lg md:text-xl font-semibold">
                  @hirejoey
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:joeydev0x@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-400 text-sm mb-1">Email</div>
                <div className="text-white text-base md:text-lg font-semibold truncate">
                  joeydev0x@gmail.com
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-300 text-sm">
              We typically respond within{" "}
              <span className="text-orange-400 font-semibold">24 hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
