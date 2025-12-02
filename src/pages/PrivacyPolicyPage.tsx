import PrivacyPolicy from "../components/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen from-gray-900 via-gray-800 to-gray-900 py-8 px-4 w-full">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-cyan-500/30">
          <PrivacyPolicy />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
