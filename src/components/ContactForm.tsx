import { useState, FormEvent } from "react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

export interface ContactSubmitPayload {
  fullName: string;
  phoneNumber: string;
  selectedBot: string;
}

interface ContactFormProps {
  selectedBot: string | null;
  onSubmit: (payload: ContactSubmitPayload) => void | Promise<void>;
}

export function ContactForm({ selectedBot, onSubmit }: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; bot?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!phoneNumber.trim()) next.phone = "Phone number is required.";
    if (!selectedBot) next.bot = "Please select a bot.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate() || !selectedBot) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        selectedBot,
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = fullName.trim() && phoneNumber.trim() && selectedBot;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-[480px] rounded-3xl border border-white/10 bg-blue-black-base/80 p-6 shadow-xl backdrop-blur-md"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="contact-fullName" className="mb-1 block font-space-grotesk text-sm font-medium text-white">
            Full Name
          </label>
          <input
            id="contact-fullName"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
            }}
            className={cn(
              "w-full rounded-xl border-2 border-white/20 bg-deep-shadow px-4 py-2 font-space-grotesk text-white placeholder:text-white/50 focus:border-cyan focus:outline-none",
              errors.fullName && "border-magenta"
            )}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 font-space-grotesk text-sm text-magenta">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1 block font-space-grotesk text-sm font-medium text-white">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            className={cn(
              "w-full rounded-xl border-2 border-white/20 bg-deep-shadow px-4 py-2 font-space-grotesk text-white placeholder:text-white/50 focus:border-cyan focus:outline-none",
              errors.phone && "border-magenta"
            )}
            placeholder="+1 234 567 8900"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 font-space-grotesk text-sm text-magenta">{errors.phone}</p>
          )}
        </div>
        {errors.bot && (
          <p className="font-space-grotesk text-sm text-magenta">{errors.bot}</p>
        )}
        {submitError && (
          <p className="font-space-grotesk text-sm text-magenta">{submitError}</p>
        )}
        {!selectedBot && (
          <p className="font-space-grotesk text-sm text-muted-slate">
            Select a bot above, then enter your name and phone.
          </p>
        )}
      </div>
      <div className="mt-6">
        <CTAButton
          type="submit"
          label={isSubmitting ? "Sending…" : "GET ACCESS"}
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  );
}
