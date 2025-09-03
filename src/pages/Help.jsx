import * as Accordion from "@radix-ui/react-accordion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import background from "../assets/images/signs-bg.jpg";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import MailIcon from "../components/MailIcon";
import { motion } from "framer-motion";

export default function Help() {
  const { theme } = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const bgOverlay = theme === 'dark' ? 'bg-black/60' : 'bg-white/30 backdrop-blur-sm';

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const accordionTriggerBg =
    theme === "dark" ? "bg-white/20 hover:bg-white/30" : "bg-white/50 hover:bg-yellow-50";
  const accordionContentBg = theme === "dark" ? "bg-white/10" : "bg-white/30";

  return (
    <section
      className={`relative min-h-screen bg-fixed bg-cover bg-center ${textColor}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${bgOverlay} z-0`} />

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen justify-center items-center gap-10 md:items-stretch p-10">
        <motion.div
          className="flex-1 mt-6 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl mb-6 font-extrabold text-center md:text-left ${textColor}`}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <Accordion.Root type="single" collapsible className="w-full max-w-xl">
            {[
              {
                id: "item-1",
                question: "«What is this site?»",
                answer:
                  "🪄 This is an interactive site where you can find out your horoscope, take a mini-quiz “What sign are you?” or simply learn more about the signs of the zodiac.",
              },
              {
                id: "item-2",
                question: "«Are the horoscopes real?»",
                answer:
                  "🪄 We use popular astrological sources to provide daily forecasts. These are not scientific facts, but entertaining content for those who love astrology.",
              },
              {
                id: "item-3",
                question: "«How does the “What sign are you?” quiz work?»",
                answer:
                  "🪄 You answer a few questions about your personality, and we select the sign that best suits you.",
              },
              {
                id: "item-4",
                question: "«Horoscope does not load / writes an error»",
                answer:
                  "🪄 Try refreshing the page. If the problem persists, check your internet connection or contact us.",
              },
              {
                id: "item-5",
                question: "«I don't see any animations / cards don't flip»",
                answer:
                  "🪄 Your browser may block animations. We recommend using a modern browser (Chrome, Firefox, Edge).",
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Accordion.Item
                  value={item.id}
                  className="border mb-3 rounded-xl overflow-hidden shadow-lg"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={`group ${accordionTriggerBg} transition-colors backdrop-blur-md w-full flex items-center justify-between text-left p-4 text-lg md:text-xl font-semibold rounded-t-xl ${textColor}`}
                    >
                      <span className="group-hover:text-yellow-500 transition">
                        {item.question}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-6 w-6 text-yellow-400 transition-transform duration-300 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={`${accordionContentBg} backdrop-blur-md px-4 pb-4 text-lg leading-relaxed overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`}
                  >
                    {item.answer}
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

        <motion.div
          className="flex-1 max-w-md mt-16"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div
            className={`${
              theme === "dark"
                ? "bg-white/20 border border-white/30 text-white"
                : "bg-white/50 border border-black/20 text-black"
            } backdrop-blur-xl p-8 rounded-3xl space-y-4 shadow-2xl hover:shadow-yellow-400/30 transition-shadow`}
          >
            <motion.p
              className={`text-3xl text-center font-bold ${
                theme === "dark" ? "text-yellow-300" : "text-yellow-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Contact Us
            </motion.p>
            <p className="text-xl font-semibold text-center">
              ❝ Have a suggestion or found a bug? ❞
            </p>
            <p className="text-lg text-center">
              We’re always happy to hear from you. Your feedback helps us grow!
            </p>
            <div className="flex justify-center pt-2">
              <motion.a
                href="mailto:astralis.to.stars@gmail.com"
                target="_blank"
                className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-2xl hover:bg-yellow-500 transition flex items-center gap-2 shadow-md"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <MailIcon />
                <span>Email Us</span>
              </motion.a>
            </div>
            <motion.h3
              className={`text-2xl md:text-3xl text-center font-semibold mt-6 ${
                theme === "dark" ? "text-yellow-200" : "text-yellow-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              🧡 Thank you for using our site!
              <br />
              May the stars be in your favor ✨
            </motion.h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
