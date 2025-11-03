import feedbackImg from "../assets/images/feedback.webp";

const FeedbackBanner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-8 mb-8">
      <div className="relative z-0 bg-[#143157] flex flex-col lg:grid lg:grid-cols-[55%_45%] gap-4 overflow-hidden rounded-3xl">
        {/* Left side - Text content */}
        <div className="flex flex-col order-1 lg:order-none p-5 sm:p-6 lg:p-8 justify-between gap-4 lg:gap-8">
          <span className="text-xl font-medium text-center lg:text-left lg:text-2xl xl:text-3xl text-white">
            Help us improve Shield Swap and get a zero-fee crypto exchange
          </span>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-6 lg:items-center">
            <button className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-40 shrink-0 outline-none bg-white/10 h-12 py-2 rounded-full mx-auto lg:mx-0 order-2 lg:order-none w-fit text-white text-xl font-semibold px-8 cursor-default">
              Take the survey
            </button>

            <span className="text-sm mx-auto font-medium sm:mx-0 order-1 text-center lg:text-left lg:order-none text-white">
              Takes 1 minute - no registration needed
            </span>
          </div>
        </div>

        {/* Right side - Feedback image */}
        <div className="z-0 pointer-events-none lg:relative">
          <div className="absolute w-full inset-0 lg:h-full">
            {/* Shadow/decorative background - you can add an image here if needed */}
          </div>
          <img
            src={feedbackImg}
            alt="Banner content image"
            className="mx-auto mt-2 lg:w-full lg:mx-0 lg:mt-0 relative z-10 lg:object-contain lg:scale-150 h-40 sm:h-48 lg:h-52"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackBanner;
