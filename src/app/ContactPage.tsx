import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BotChooserCard } from "@/components/BotChooserCard";
import { ContactForm } from "@/components/ContactForm";
import { SuccessModal } from "@/components/SuccessModal";
import { BOTS } from "@/lib/botData";
import { submitLead } from "@/lib/leadApi";
import { saveLeadSubmission } from "@/lib/leadStorage";

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const botParam = searchParams.get("bot");
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const found = BOTS.find((b) => b.id === botParam);
    return found ? found.id : BOTS[0]?.id ?? null;
  });
  const [successBotName, setSuccessBotName] = useState<string | null>(null);
  const [successBotId, setSuccessBotId] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (botParam && BOTS.some((b) => b.id === botParam)) {
      setSelectedId(botParam);
    }
  }, [botParam]);

  const selectedBot = BOTS.find((b) => b.id === selectedId) ?? null;

  const handleSubmit = async (payload: { fullName: string; phoneNumber: string; selectedBot: string }) => {
    try {
      await submitLead({
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        selectedBot: payload.selectedBot,
      });
    } catch {
      saveLeadSubmission({
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        selectedBot: payload.selectedBot,
      });
    }
    const bot = BOTS.find((b) => b.id === payload.selectedBot);
    setSuccessBotName(bot?.name ?? payload.selectedBot);
    setSuccessBotId(payload.selectedBot);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-blue-black-base px-4 py-6 md:px-8 md:py-8 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Section 1 — Bot chooser: שורה אחת */}
        <section aria-label="Choose your bot">
          <h2 className="mb-4 text-center font-space-grotesk text-2xl font-medium tracking-tight text-white">
            Choose your bot
          </h2>
          <div className="flex flex-nowrap items-stretch justify-center gap-3 overflow-x-auto pb-2 md:gap-4">
            {BOTS.map((bot) => (
              <BotChooserCard
                key={bot.id}
                botName={bot.name}
                tagline={bot.tagline}
                svgThumbnailPath={bot.svgPath}
                gradientColors={bot.gradientColors}
                isSelected={selectedId === bot.id}
                onSelect={() => setSelectedId(bot.id)}
              />
            ))}
          </div>
        </section>

        {/* Section 2 — Hero preview */}
        <section aria-label="Selected bot preview">
          <AnimatePresence mode="wait">
            {selectedBot ? (
              <motion.div
                key={selectedBot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border-2 p-6 md:flex-row md:items-start"
                style={{
                  borderImage: `linear-gradient(135deg, ${selectedBot.gradientColors[0]}, ${selectedBot.gradientColors[1]}) 1`,
                }}
              >
                <div className="relative w-full overflow-hidden rounded-2xl md:w-[60%]">
                  <div
                    className="aspect-video w-full rounded-2xl bg-deep-shadow bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedBot.bgImagePath})` }}
                  />
                  <div className="absolute bottom-0 right-0 h-32 w-32 md:h-40 md:w-40">
                    <img
                      src={selectedBot.svgPath}
                      alt=""
                      className="h-full w-full object-contain object-bottom"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-dancing-script text-4xl font-bold text-white">
                    {selectedBot.name}
                  </h2>
                  <p className="font-space-grotesk text-lg text-muted-slate">
                    {selectedBot.subtitle}
                  </p>
                  {selectedBot.supportingText && selectedBot.supportingText.length > 0 && (
                    <ul className="list-inside list-disc space-y-1 font-space-grotesk text-sm text-muted-slate">
                      {selectedBot.supportingText.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="rounded-3xl border border-white/20 bg-deep-shadow/50 p-12 text-center">
                <p className="font-space-grotesk text-lg text-muted-slate">
                  Choose your bot above to see a preview.
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 3 — Contact form */}
        <section className="relative z-10 flex flex-col items-center justify-center gap-4" aria-label="Contact form">
          {selectedBot && (
            <h2 className="font-space-grotesk text-xl font-medium tracking-tight text-white">
              Request access to {selectedBot.name}
            </h2>
          )}
          <ContactForm
            key={formKey}
            selectedBot={selectedId}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
      {successBotName && (
        <SuccessModal
          botName={successBotName}
          selectedBotId={successBotId ?? undefined}
          onDismiss={() => { setSuccessBotName(null); setSuccessBotId(null); }}
          onViewList={() => { setSuccessBotName(null); setSuccessBotId(null); }}
        />
      )}
    </div>
  );
}
