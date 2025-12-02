const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-500 mx-auto mb-6"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-white/60 text-lg mb-8">
          Oops! The page you're looking for doesn't exist or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
          >
            Back to Home
          </a>
          <a
            href="/contact-us"
            className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200"
          >
            Contact Support
          </a>
        </div>

        <div className="mt-12">
          <div className="inline-block animate-bounce">
            <svg
              className="w-16 h-16 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

