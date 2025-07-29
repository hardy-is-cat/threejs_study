import { mySocials } from "../constants";

function Footer() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="w-full h-[1px] mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a key={index} href={social.href}>
            <img src={social.icon} alt={social.name} className="size-5 " />
          </a>
        ))}
      </div>
      <p>ⓒ 2025 Zual. All rights reserved.</p>
    </section>
  );
}

export default Footer;
