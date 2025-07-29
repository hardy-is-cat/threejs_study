import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function CopyEmailButton() {
  const [isCopied, setIsCopied] = useState(false);
  const EMAIL_ADDRESS = "zualzual0119@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.button
      className="relative px-1 py-4 text-center rounded-full font-normal w-[12rem] cursor-pointer overflow-hidden"
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      animate={{
        backgroundColor: isCopied
          ? "var(--color-fuchsia)"
          : "var(--color-primary)",
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img src="assets/copy-done.svg" alt="복사완료" className="w-5" />
            복사 완료!
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src="assets/copy.svg" alt="복사" className="w-5" />
            메일주소 복사
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default CopyEmailButton;
