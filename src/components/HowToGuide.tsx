import { useState } from "react";
import { Tab } from "@headlessui/react";
import exchangeImg from "../assets/images/guide/exchange.png";
import buyImg from "../assets/images/guide/buy.png";
import sellImg from "../assets/images/guide/sell.png";

type Step = {
  number: number;
  title: string;
  description: string;
};

type TabContent = {
  title: string;
  subtitle: string;
  steps: Step[];
  imageUrl: string;
  imageAlt: string;
};

const HowToGuide = () => {
  const tabContents: TabContent[] = [
    {
      title: "How do I exchange Bitcoin?",
      subtitle:
        "It takes only four steps to swap Bitcoin or any other cryptocurrency.",
      steps: [
        {
          number: 1,
          title: "Enter the amount and provide your address",
          description:
            "Choose assets and the type of rate; specify your wallet address.",
        },
        {
          number: 2,
          title: "Confirm your transaction",
          description:
            "Double-check all details; edit or confirm your transaction.",
        },
        {
          number: 3,
          title: "Send the crypto for the swap",
          description:
            "GhostSwap will generate a deposit address; use your wallet to send funds there.",
        },
        {
          number: 4,
          title: "Wait for the exchange to complete",
          description:
            "Wait just a few minutes; track your assets on the way to your wallet on the status page.",
        },
      ],
      imageUrl: exchangeImg,
      imageAlt: "How to swap crypto on GhostSwap",
    },
    {
      title: "How to buy crypto instantly?",
      subtitle:
        "GhostSwap is the place where you can buy Bitcoin safely in a few clicks.",
      steps: [
        {
          number: 1,
          title: "Create the order",
          description:
            "Choose your local currency and a payment method to buy crypto with, enter the amount. Next, provide your wallet address; check the rates at this step.",
        },
        {
          number: 2,
          title: "Register and/or verify identity",
          description:
            "Provide and confirm your email address. Input the payment details and complete the one-time verification procedure, if prompted.",
        },
        {
          number: 3,
          title: "Confirm the transaction",
          description:
            "Double-check the details and edit them or finalize the transaction.",
        },
        {
          number: 4,
          title: "Success!",
          description:
            "And just like that, you bought cryptocurrency! Just a few minutes later, it will arrive in your own wallet.",
        },
      ],
      imageUrl: buyImg,
      imageAlt: "How to buy crypto on GhostSwap",
    },
    {
      title: "How to sell crypto Instantly?",
      subtitle:
        "You are a few clicks away from converting crypto into fiat. Following these simple steps, you can sell it for USD and EUR.",
      steps: [
        {
          number: 1,
          title: "Input the amount",
          description:
            "Choose the currency to sell your crypto for, enter the amount; confirm the rates.",
        },
        {
          number: 2,
          title: "Provide payment details",
          description:
            "Confirm your email with a 2FA code; provide the card details to receive the payout.",
        },
        {
          number: 3,
          title: "Check and confirm",
          description:
            "Specify the refund address; double-check the transaction details.",
        },
        {
          number: 4,
          title: "Send crypto",
          description:
            "Copy the wallet address or scan the QR code to send crypto. The order will be processed in minutes and cash will be credited to your bank card instantly.",
        },
      ],
      imageUrl: sellImg,
      imageAlt: "How to sell crypto on GhostSwap",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(0);

  const handleStepToggle = (index: number) => {
    setOpenStepIndex(openStepIndex === index ? null : index);
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setOpenStepIndex(0); // Reset to first step when switching tabs
  };

  return (
    <section id="guide" className="w-full max-w-7xl mx-auto px-4">
      <div className="grid gap-8">
        <div className="flex flex-col">
          <div className="grid gap-8 lg:gap-10">
            {/* Tabs */}
            <div className="flex justify-center">
              <Tab.Group selectedIndex={selectedTab} onChange={handleTabChange}>
                {/* <div className="flex justify-center">
                  <Tab.List className="grid grid-flow-col auto-cols-fr w-full max-w-[420px] gap-0.5 bg-white/5 rounded-3xl p-0.5">
                    {tabs.map((tab) => (
                      <Tab
                        key={tab}
                        className={({ selected }) =>
                          `text-xs font-medium rounded-md transition-colors outline-none border-2 border-transparent focus-visible:border-blue-500 focus-visible:outline-none flex items-center text-center justify-center min-h-9 first:rounded-l-3xl first:rounded-r-md last:rounded-r-3xl last:rounded-l-md px-10 py-2 ${
                            selected
                              ? "bg-blue-500 text-white"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`
                        }
                      >
                        {tab}
                      </Tab>
                    ))}
                  </Tab.List>
                </div> */}

                {/* Tab Panels */}
                <Tab.Panels>
                  {tabContents.map((content, tabIndex) => (
                    <Tab.Panel key={tabIndex} className="mt-8">
                      {/* Title and Subtitle */}
                      <div className="gap-2 lg:gap-4 justify-items-center grid mb-8">
                        <h2 className="text-xl lg:text-3xl text-center font-semibold text-white">
                          {content.title}
                        </h2>
                        <p className="text-sm text-center lg:text-base text-gray-300">
                          {content.subtitle}
                        </p>
                      </div>

                      {/* Content with Steps and Image */}
                      <div className="flex-col-reverse lg:flex-row flex-1 gap-12 relative z-0 flex">
                        {/* Steps Accordion */}
                        <div className="flex-1">
                          <ul className="m-0 list-none grid gap-8">
                            {content.steps.map((step, stepIndex) => {
                              const isOpen = openStepIndex === stepIndex;
                              const isLast =
                                stepIndex === content.steps.length - 1;

                              return (
                                <li key={stepIndex} className="flex gap-5">
                                  {/* Step Number and Connector Line */}
                                  <div className="relative flex flex-col items-center">
                                    <div
                                      className={`rounded-full flex items-center justify-center w-10 h-10 shrink-0 z-10 ${
                                        isOpen
                                          ? "bg-purple-500 text-white"
                                          : "bg-purple-500/10 text-purple-400"
                                      }`}
                                    >
                                      <span className="text-sm">
                                        {step.number}
                                      </span>
                                    </div>
                                    {!isLast && (
                                      <div
                                        className={`absolute top-10 left-1/2 w-0.5 ${
                                          isOpen
                                            ? "bg-purple-500/20"
                                            : "bg-purple-500/10"
                                        } -translate-x-1/2 h-[calc(100%-16px)]`}
                                      />
                                    )}
                                  </div>

                                  {/* Step Content */}
                                  <div className="flex flex-col gap-3 flex-1 pt-2">
                                    <button
                                      onClick={() =>
                                        handleStepToggle(stepIndex)
                                      }
                                      type="button"
                                      className={`text-left transition-all bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none p-0 cursor-pointer ${
                                        isOpen
                                          ? "text-base lg:text-lg text-white"
                                          : "text-sm lg:text-base text-gray-300 opacity-40 hover:text-white hover:opacity-100"
                                      }`}
                                    >
                                      {step.title}
                                    </button>
                                    <div
                                      className={`text-sm lg:text-base text-white overflow-hidden transition-all duration-300 ${
                                        isOpen
                                          ? "max-h-96 opacity-100"
                                          : "max-h-0 opacity-0"
                                      }`}
                                    >
                                      <div className="pt-1">
                                        {step.description}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Image */}
                        <div className="flex flex-1 justify-center w-full lg:w-auto items-start">
                          <img
                            alt={content.imageAlt}
                            loading="lazy"
                            className="w-full object-contain max-w-[400px]"
                            src={content.imageUrl}
                          />
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToGuide;
