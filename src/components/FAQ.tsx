import { Disclosure } from "@headlessui/react";

const faqData = [
  {
    id: 1,
    question: "How does ShieldSwap work?",
    answer: (
      <>
        <p>
          When you fill in your desired transaction, we search the best possible
          rates in our partner exchanges, so you can pick the exchange with the
          best price and swap directly with them. This means there's no need for
          you to open an account in a centralized exchange.
        </p>
        <p>
          You transfer the chosen amount to the address provided by the
          exchange, the trade is made and you receive your desired crypto
          directly in your chosen address. It's a fast and safe way of
          exchanging your coins without the hassle and risks of using
          centralized exchanges.
        </p>
        <p>
          We also monitor exchanges' rate reliability, transaction delay and any
          maintenance or server problems to make sure everything runs smoothly
          for your trade and to prevent any exchange abuse. And if you encounter
          any problems, you can reach out to us and we'll do all we can to solve
          your problem!
        </p>
        <p>
          ShieldSwap provides software that allows users to choose between
          exchanges and trade directly with them, we never have access, receive
          or transfer any of the funds between the parties.
        </p>
      </>
    ),
  },
  {
    id: 2,
    question: "Why trust us?",
    answer: (
      <>
        <p>
          Our service was designed from the ground up focused on your needs. We
          only keep the minimum amount of logs for exchanges that require this
          and we let you know each one's log policies before creating the
          transaction. Logs kept at ShieldSwap are never sold or ceded to third
          parties and are only provided on an individual basis upon request from
          law enforcement.
        </p>
        <p>
          We use minimal JavaScript to improve user experience (like in dropdown
          selection), but never to track or fingerprint users. It is entirely
          optional for most of our services, so you can block JavaScript and use
          our website without any problems if you want!
        </p>
        <p>
          We only redirect your order to known and reliable instant exchanges,
          that receive your deposit, process the trade and transfer your funds
          directly to your chosen address. We do not have access to your coins
          at any point of the transaction.
        </p>
      </>
    ),
  },
  {
    id: 3,
    question: "What is the ShieldSwap Guarantee?",
    answer: (
      <>
        <p>
          Transactions made through our website enjoy our ShieldSwap Guarantee,
          if for some reason you do not receive your funds and the exchange does
          not provide us sufficient proof of unusually high AML risk or that it
          was blocked by their Liquidity Provider's AML system, ShieldSwap will
          reimburse you up to the insured amount. This amount varies between
          exchanges and you can check it by hovering or clicking the shield icon
          besides each exchange option. Please note, however, that trades with
          exchanges rated as 'D' are not covered by this Guarantee. Trades
          blocked because of high AML risk or funds that came from mixers are
          also not covered by the Guarantee, as those are generally considered
          as very high AML risk by most providers.
        </p>
        <p>
          To get compensation, contact us through email or Telegram informing
          your transaction's ID at ShieldSwap. We'll talk to your chosen
          exchange and try to solve your problem. Failing that and if the
          exchange doesn't provide us sufficient proof that the transaction was
          halted due to a police request, legal order or unusually high AML
          risk, we'll reimburse your transaction up to the amount defined when
          your trade was created. The whole process can take a week or a bit
          longer, as we try to sort things out with the exchange.
        </p>
        <p>
          So please be aware that:
          <br />
             • Our Guarantee DOES NOT cover cases where funds are blocked due to
          proven AML issues, as this could be abused to launder illicit funds.
          <br />
             • The refund process can take a week or longer, as we'll first try
          solving your issue with the partner exchange.
        </p>
      </>
    ),
  },
  {
    id: 6,
    question: "How long does it take to complete a transaction?",
    answer: (
      <>
        <p>
          Usually a transaction takes between 5 and 60 minutes to complete.
          Depending mostly on the selected crypto and the existence of
          congestion on their respective networks. Cryptos with a long
          transaction confirmation time take longer and the opposite is true for
          cryptos with a short transaction confirmation time.
        </p>
        <p>
          We provide an approximate ETA on the exchange selection screen that
          takes into account the exchange's recent history. This way you can
          better choose your preferred exchange.
        </p>
      </>
    ),
  },
  {
    id: 7,
    question: "What fees are included in the rates shown?",
    answer: (
      <>
        <p>
          All fees are already included in the shown rate. They consist of
          network transaction fees and exchange fees. This means bigger
          transactions can have better rates, as the network transaction fees
          are diluted. You do not pay anything extra for using our service
          instead of using directly your chosen exchange. We do receive a
          comission for referring the exchange, but it comes out of the
          exchange's fee so it doesn't change your rate.
        </p>
        <p>
          The floating rates shown in the exchange selection screen are
          automatically adjusted to more accurately predict the final amount
          you'll receive. This takes into account each exchange's recent trades
          and their deviation from the predicted rate. The amount shown in the
          status screen is not adjusted, and will show the actual rate provided
          by the exchange.
        </p>
      </>
    ),
  },
  {
    id: 8,
    question: "Is it really private? Isn't KYC required?",
    answer: (
      <>
        <p>
          Each exchange has their own KYC/AML policy, and they may halt your
          transaction and demand KYC/AML verification before completing it. All
          our partners exchanges perform due dilligence on the funds received
          before swapping them. We explicitly warn users not to send funds with
          very high AML risk, or involved with mixers or illegal activities, as
          these orders will be refused by our partners. You can check each
          exchange's policies on their websites.
        </p>
        <p>
          To help you in your choice we provide a simple KYC/AML Rating for each
          exchange. To determine an exchange's rating we read their terms of use
          and privacy policy, ask them directly about how they handle refunding
          in case of verification refusal and take in account their past history
          on ShieldSwap. We use the following ratings:
        </p>
        <div className="my-4 overflow-x-auto">
          <table
            className="table-auto border-spacing-0 text-white text-xs"
            style={{ margin: "10px auto 0px 0" }}
          >
            <tbody>
              <tr>
                <td className="w-4"></td>
                <td className="align-middle py-2">
                  <svg
                    className="inline h-5 w-5 mr-2"
                    fill="green"
                    stroke="green"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM362.1 365.8c-3.266 1.506-6.687 2.229-10.05 2.229c-9.078 0-17.75-5.18-21.81-14l-12.03-26.18H193.8l-12.03 26.18c-5.576 12.09-19.76 17.36-31.86 11.77c-12.03-5.559-17.28-19.91-11.73-31.99l95.99-208.1c7.842-17.08 35.75-17.08 43.59 0l95.99 208.1C379.3 345.9 374.1 360.2 362.1 365.8zM215.1 279.6h80.05L256 192.5L215.1 279.6z"></path>
                  </svg>
                </td>
                <td className="py-2">
                  This exchange uses its own liquidity and is privacy-friendly.
                </td>
              </tr>
              <tr>
                <td className="w-4"></td>
                <td className="align-middle py-2">
                  <svg
                    className="inline h-5 w-5 mr-2"
                    fill="rgb(78, 203, 78)"
                    stroke="rgb(78, 203, 78)"
                    viewBox="0 0 512 512"
                  >
                    <path d="M292 280H208v56h84C307.4 336 320 323.4 320 308S307.4 280 292 280zM304 204c0-15.44-12.56-28-28-28H208v56h68C291.4 232 304 219.4 304 204zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM292 384H184C170.8 384 160 373.3 160 360v-208C160 138.8 170.8 128 184 128h92C317.9 128 352 162.1 352 204c0 16.35-5.301 31.41-14.12 43.82C356.1 261.7 368 283.4 368 308C368 349.9 333.9 384 292 384z"></path>
                  </svg>
                </td>
                <td className="py-2">
                  This exchange refunds transactions that fail their AML check.
                  In very rare cases funds may be blocked if a legal order
                  demands it or stolen coins are involved. Past history at
                  ShieldSwap is very good.
                </td>
              </tr>
              <tr>
                <td className="w-4"></td>
                <td className="align-middle py-2">
                  <svg
                    className="inline h-5 w-5 mr-2"
                    fill="rgb(245, 245, 48)"
                    stroke="rgb(245, 245, 48)"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM255.1 336c21.09 0 40.92-8.281 55.86-23.38c9.328-9.375 24.55-9.5 33.94-.125c9.422 9.312 9.484 24.5 .1562 33.94C321 370.7 289.1 384 255.1 384c0 0 .0156 0 0 0c-78.95 0-127-66.33-127-128c-.0078-61.11 47.87-128 127-128c.0156 0 0 0 0 0c33.98 0 65.95 13.34 89.96 37.56C354.4 175 354.3 190.2 344.9 199.5c-9.391 9.375-24.61 9.242-33.94-.1328C296 184.3 276.2 176 255.1 176C205.7 176 176 217.9 176 256C176 293.9 205.6 336 255.1 336z"></path>
                  </svg>
                </td>
                <td className="py-2">
                  This exchange usually refunds transactions that fail their AML
                  check, but if the deposit triggers their Liquidity Provider's
                  AML system, funds may be blocked until KYC/SoF verification is
                  passed.
                </td>
              </tr>
              <tr>
                <td className="w-4"></td>
                <td className="align-middle py-2">
                  <svg
                    className="inline h-5 w-5 mr-2"
                    fill="rgb(213, 98, 66)"
                    stroke="rgb(213, 98, 66)"
                    viewBox="0 0 512 512"
                  >
                    <path d="M254.4 176H208v160h46.41C299.4 336 336 300.1 336 256C336 211.9 299.4 176 254.4 176zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM254.4 384H184C170.8 384 160 373.3 160 360v-208C160 138.8 170.8 128 184 128h70.41C325.9 128 384 185.4 384 256C384 326.6 325.9 384 254.4 384z"></path>
                  </svg>
                </td>
                <td className="py-2">
                  This exchange blocks transactions that fail their AML check
                  until KYC/SoF verification is passed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Your chosen exchange may also store your transaction details (amount,
          coins and addresses). Please be aware some exchanges require logs of
          the user's IP, UserAgent and AcceptLanguage to be kept at ShieldSwap.
          These can be seen on the exchange screen by hovering/clicking their
          rating. Logs kept at ShieldSwap are never sold or ceded to third
          parties and are only provided on an individual basis upon request from
          law enforcement.
        </p>
      </>
    ),
  },
  {
    id: 9,
    question: "Why do only a few exchanges appear as options for my trade?",
    answer: (
      <>
        <p>
          While a few exchanges accept trades as small as $10, many of them have
          larger minimum amounts for trading, since network transaction fees may
          severely impact the rates of small trades. So if you are only checking
          rates, make sure to use amounts close to what you'll actually trade to
          get more precise rates.
        </p>
        <p>
          Sometimes it may be difficult finding rates when trading directly one
          less popular crypto for another. In this case, using a more popular
          crypto as an intermediary can help.
        </p>
      </>
    ),
  },
  {
    id: 10,
    question: "What's the difference between Floating and Fixed Rate?",
    answer: (
      <>
        <p>
          A floating rate is an estimate. When the exchange confirms your
          deposit, they will check market conditions and pick an appropriate new
          rate. If it's far enough from the original estimate, some exchanges
          prompt you if you want to proceed with this new rate or request a
          refund. Floating rates are recommended for most transactions where you
          have a known starting amount that you want to convert, since variable
          rates are better than fixed rates.
        </p>
        <p>
          Fixed rates are good for paying invoices. If you know you need to pay
          0.1 XMR, you can "lock in" a fixed amount of BTC necessary to get 0.1
          XMR. However, if the market moves too much, the exchange may still
          decide to refund the transaction instead of proceeding with the quote.
        </p>
        <p>
          For these reasons we suggest you use floating rate whenever possible.
          In any case we recommend you have your wallet ready before confirming
          your transaction to avoid having your transaction expire before
          blockchain confirmation.
        </p>
      </>
    ),
  },
  {
    id: 11,
    question:
      "What happens if I send the wrong amount to the address provided?",
    answer: (
      <>
        <p>
          Depends on the chosen exchange, some of them accept slightly different
          amounts and will complete your trade proportionately, while others may
          halt your transaction or even have trouble detecting your deposit.
          Always take care to send the exact amount to the address provided to
          avoid such problems. This information can be seen on the status page,
          where we show a tooltip letting you know if the exchange requires
          exact amounts or not.
        </p>
      </>
    ),
  },
  {
    id: 12,
    question:
      "My transaction has failed and I haven't got my funds back. What do I do now?",
    answer: (
      <>
        <p>
          Although very rare, this can happen. Simply contact our Support
          through the Telegram or email located at the footer of the website and
          we'll be happy to help you! At your transaction's status screen we
          provide you with all its details. With this information you could also
          contact the exchange directly to solve your problem if you prefer.
        </p>
      </>
    ),
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="faq py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* FAQ Intro */}
        <div className="section-title pb-0 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            F.A.Q.
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
            Below you can find answers to the most frequent questions and we
            explain a bit of our service.
            <br />
            In case you still have a question, please feel free to contact us
            and we'll be happy to answer!
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list max-w-4xl mx-auto">
          <div className="space-y-2">
            {faqData.map((item) => (
              <Disclosure key={item.id}>
                {({ open }) => (
                  <div className="bg-[#1a2744] border border-blue-700/30 rounded-lg mb-3 overflow-hidden">
                    <Disclosure.Button className="w-full py-4 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-blue-900/20 transition-colors bg-[#0f1b34]">
                      <div className="relative flex items-center">
                        <div className="relative flex-1 pr-8 pl-7">
                          <span className="text-white text-sm md:text-base">
                            {item.question}
                          </span>
                        </div>
                        <div className="absolute right-0 text-white">
                          <svg
                            className={`absolute top-1/2 -translate-y-1/2 right-0 h-5 w-5 transition-transform duration-200 ${
                              open ? "rotate-180" : ""
                            }`}
                            strokeWidth="20"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                          </svg>
                        </div>
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-4 pt-2 text-gray-300 bg-[#152030]">
                      <div className="space-y-4 ml-7 text-sm md:text-base">{item.answer}</div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
