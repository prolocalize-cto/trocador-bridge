const PrivacyPolicy = () => {
  return (
    <div className="terms text-center py-8 px-4">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <svg
          fill="white"
          stroke="white"
          height="40"
          width="50"
          viewBox="0 0 640 512"
          className="gb-blur-svg"
        >
          <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM189.8 123.5L235.8 159.5C258.3 139.9 287.8 128 320 128C390.7 128 448 185.3 448 256C448 277.2 442.9 297.1 433.8 314.7L487.6 356.9C521.1 322.8 545.9 283.1 558.6 256C544.1 225.1 518.4 183.5 479.9 147.7C438.8 109.6 385.2 79.1 320 79.1C269.5 79.1 225.1 97.73 189.8 123.5L189.8 123.5zM394.9 284.2C398.2 275.4 400 265.9 400 255.1C400 211.8 364.2 175.1 320 175.1C319.3 175.1 318.7 176 317.1 176C319.3 181.1 320 186.5 320 191.1C320 202.2 317.6 211.8 313.4 220.3L394.9 284.2zM404.3 414.5L446.2 447.5C409.9 467.1 367.8 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L120.8 191.2C102.1 214.5 89.76 237.6 81.45 255.1C95.02 286 121.6 328.5 160.1 364.3C201.2 402.4 254.8 432 320 432C350.7 432 378.8 425.4 404.3 414.5H404.3zM192 255.1C192 253.1 192.1 250.3 192.3 247.5L248.4 291.7C258.9 312.8 278.5 328.6 302 333.1L358.2 378.2C346.1 381.1 333.3 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1H192z"></path>
        </svg>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

      {/* Content Container - Left aligned text */}
      <div className="max-w-4xl mx-auto text-left space-y-6">
        {/* Introduction Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Introduction</h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            Shield Swap respects your privacy, and we are committed to protecting it through our compliance with this policy, which describes the types of information we may collect from you or that you may provide when you use Shield Swap (our "App") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          <p className="text-white text-sm md:text-base leading-relaxed mt-3">
            This policy applies to information we collect:
            <br />
            &emsp;&emsp;-On this App.
            <br />
            &emsp;&emsp;-In email, text, and other electronic messages between you and this App.
          </p>
          <p className="text-white text-sm md:text-base leading-relaxed mt-2">
            It does not apply to information collected by:
            <br />
            &emsp;&emsp;-Any third party (including our affiliates and subsidiaries), including through any application or content (including advertising) that may link to or be accessible from or on the App.
          </p>
          <p className="text-white text-sm md:text-base leading-relaxed mt-3">
            Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, you have the choice to not use the App. By accessing or using this App, you agree to this privacy policy. This policy may be updated from time to time. Your continued use of this App after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
          </p>
        </section>

        {/* Information We Delete After 14 Days Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3">
            Information We Delete After 14 Days:
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            -Your trade details, including the destination address, the refund address, and the amount. This is deleted after 14 days, or it is deleted immediately after you request that it be deleted on the Transaction Status screen.
          </p>
        </section>

        {/* Information We May Retain for More Than 14 Days Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3">
            Information We May Retain for More Than 14 Days:
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            Some exchanges require this information to be stored by Shield Swap, you can check each exchange's log policy on the exchange screen. The information is stored at the moment of the exchange choice being confirmed and we only store this if required by the chosen exchange.
            <br />
            &emsp;&emsp;This data is stored safely by us and only disclosed on an individual basis if required by law enforcement. It is never sold or ceded to third parties or used for anything other than compliance to law enforcement requests.
          </p>
          <p className="text-white text-sm md:text-base leading-relaxed mt-3">
            -UserAgent and AcceptLanguage of your device's request.
            <br />
            &emsp;&emsp;-Your IP address.
          </p>
          <p className="text-white text-sm md:text-base leading-relaxed mt-3">
            -Correspondence you send us by email or another support method, and if the issue is still open. We delete emails and messages if we perceive that the support request is closed.
          </p>
        </section>

        {/* Information Our Partner Exchanges May Retain Section */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3">
            Information Our Partner Exchanges May Retain:
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            Each of our partner exchanges has their own privacy policies and they may retain information about the amounts, coins, addresses and transaction hashes of your trade.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

