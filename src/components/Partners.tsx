// Import partner images
import CakeWallet from "../assets/images/partners/Cake_square.png";
import CoinCards from "../assets/images/partners/CoinCards.png";
import CoinsDo from "../assets/images/partners/CoinsDo_square.png";
import CryptoPower from "../assets/images/partners/CryptoPower_square.png";
import Intersend from "../assets/images/partners/Intersend.jpg";
import ETHLatam from "../assets/images/partners/ETHLatam.jpg";
import Monerocom from "../assets/images/partners/Monerocom_square.webp";
import Monerokon from "../assets/images/partners/Monerokon_square2.png";
import Monerotopia from "../assets/images/partners/Monerotopia.webp";
import Revuo from "../assets/images/partners/Revuo_Monero_Square.jpg";
import Stack from "../assets/images/partners/Stack_square.png";
import VostoEmisio from "../assets/images/partners/VostoEmisio.jpg";
import Alfacash from "../assets/images/partners/Alfacash_square.png";
import BitcoinVN from "../assets/images/partners/BitcoinVN_square.webp";
import Changee from "../assets/images/partners/Changee_square.jpg";
import Changehero from "../assets/images/partners/Changehero_square.png";
import Changenow from "../assets/images/partners/Changenow_square.png";
import CoinCraddle from "../assets/images/partners/CoinCraddle_square.jpg";
import EasyBit from "../assets/images/partners/EasyBit_square.jpg";
import ETZ from "../assets/images/partners/ETZ_square.jpg";
import Exolix from "../assets/images/partners/Exolix_square.jpg";
import ExWell from "../assets/images/partners/ExWell_square.webp";
import FixedFloat from "../assets/images/FixedFloat_square.svg";
import Godex from "../assets/images/partners/Godex_square.png";
import Goexme from "../assets/images/partners/Goexme_square.webp";
import Guardex from "../assets/images/partners/Guardex_square.jpg";
import LetsExchange from "../assets/images/partners/LetsExchange_square.png";
import MtPelerin from "../assets/images/partners/MtPelerin_square.png";
import Pegasusswap from "../assets/images/partners/Pegasusswap_square.jpg";
import Swaptrade from "../assets/images/partners/Swaptrade_square.webp";
import Quickex from "../assets/images/partners/Quickex_square.webp";
import StealthEx from "../assets/images/partners/StealthEX_square.png";
import Swapgate from "../assets/images/partners/Swapgate_square.png";
import SwapSpace from "../assets/images/partners/SwapSpace_square.jpg";
import Swapter from "../assets/images/partners/Swapter_square.png";
import Swapuz from "../assets/images/partners/Swapuz_square.png";
import WizardSwap from "../assets/images/partners/WizardSwap_square.jpg";
import XChange from "../assets/images/partners/XChange_square.png";
import XGram from "../assets/images/partners/XGram_square.jpg";

const partners = [
  { name: "Cake Wallet", url: "https://cakewallet.com/", image: CakeWallet },
  { name: "CoinCards", url: "https://coincards.com/", image: CoinCards },
  { name: "CoinsDo", url: "https://www.coinsdo.com/", image: CoinsDo },
  { name: "CryptoPower", url: "https://cryptopower.dev", image: CryptoPower },
  { name: "Intersend", url: "https://app.intersend.io", image: Intersend },
  { name: "ETHLatam", url: "https://ethlatam.org/", image: ETHLatam },
  { name: "Monero.com", url: "https://monero.com/", image: Monerocom },
  { name: "Monerokon", url: "https://monerokon.org/", image: Monerokon },
  { name: "Monerotopia", url: "https://monerotopia.com/", image: Monerotopia },
  { name: "Revuo", url: "https://revuo-xmr.com", image: Revuo },
  { name: "Stack", url: "https://stackwallet.com/", image: Stack },
  { name: "VostoEmisio", url: "https://www.vostoemisio.com/", image: VostoEmisio },
  { name: "Alfacash", url: "https://www.alfa.cash/?rid=2f7ad3da", image: Alfacash },
  { name: "BitcoinVN", url: "https://bitcoinvn.io/?ref=83ddf2706956bd0e", image: BitcoinVN },
  { name: "Changee", url: "http://changee.com?refId=648a081cd2ceb", image: Changee },
  { name: "ChangeHero", url: "https://changehero.io/?ref=7e04fa2247b04fb686e1d98468e4ddf0", image: Changehero },
  { name: "ChangeNow", url: "https://changenow.io/?link_id=5bcec5da8f2fb9", image: Changenow },
  { name: "CoinCraddle", url: "https://coincraddle.com?refId=643e06f609d16", image: CoinCraddle },
  { name: "EasyBit", url: "https://easybit.com/?ref_id=PBXC7ksB7U", image: EasyBit },
  { name: "ETZ", url: "https://etz-swap.com?ref=ENIFQXFAFWHNSDQYGTFV", image: ETZ },
  { name: "Exolix", url: "https://exolix.com?ref=0FAB49E2F09EFBCB0BCB555E417CEFC3", image: Exolix },
  { name: "ExWell", url: "https://exwell.io?refId=6654ec3dafa08", image: ExWell },
  { name: "FixedFloat", url: "https://ff.io/?ref=gdvqgnqc", image: FixedFloat },
  { name: "Godex", url: "https://godex.io/?aff_id=QYfscKxIWXI668Dz&utm_source=affiliate&utm_medium=TrocadorApp&utm_campaign=QYfscKxIWXI668Dz", image: Godex },
  { name: "Goexme", url: "https://goexme.io?refId=659d9f5ab178e", image: Goexme },
  { name: "Guardex", url: "https://guardex.io/?referral_id=cd38a6f3-3aaf-4f15-9085-e1bd5f819a2a", image: Guardex },
  { name: "LetsExchange", url: "https://letsexchange.io/?ref_id=c2R7XSAe5C72L6uA", image: LetsExchange },
  { name: "MtPelerin", url: "https://www.mtpelerin.com/", image: MtPelerin },
  { name: "Pegasusswap", url: "https://pegasusswap.com/?deposit=BTC&depositNetwork=BTC&receive=XMR&receiveNetwork=XMR&ref=TYJGAH3", image: Pegasusswap },
  { name: "Swaptrade", url: "https://www.swaptrade.io/?ref=trocador", image: Swaptrade },
  { name: "Quickex", url: "https://quickex.io/?ref=aff_616", image: Quickex },
  { name: "StealthEx", url: "https://stealthex.io/?ref=4i60ofmkz4o", image: StealthEx },
  { name: "Swapgate", url: "https://swapgate.io/exchange-USDTTRC20-BTC?ref=aff_581", image: Swapgate },
  { name: "SwapSpace", url: "https://swapspace.co?ref=93f99869f4609b5033c489df", image: SwapSpace },
  { name: "Swapter", url: "https://swapter.io/?ref=XRsW0Pr1zWKMiJe8", image: Swapter },
  { name: "Swapuz", url: "https://swapuz.com/?ref=9c2b7390-eba1-4919-8c4a-f4573d666e32", image: Swapuz },
  { name: "WizardSwap", url: "http://wizardswap.io/?ref=3bc26300b7", image: WizardSwap },
  { name: "XChange", url: "https://xchange.me/?invite=TrocadorApp", image: XChange },
  { name: "XGram", url: "https://xgram.io?refId=67532220e5656", image: XGram },
];

const Partners = () => {
  return (
    <section id="partners" className="container mx-auto px-4 py-8">
      <div className="section-title pb-0">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Our Partners
        </h2>
      </div>

      <div className="flex justify-center flex-wrap gap-2 max-w-[1110px] mx-auto py-2.5">
        {partners.map((partner, index) => (
          <div key={index} className="partner_icon_wrapper p-2">
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src={partner.image}
                width="100"
                height="100"
                alt={partner.name}
                loading="lazy"
                className="w-[100px] h-[100px] object-contain"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;

