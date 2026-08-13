import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { profile } from "@/content/profile";

const icons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  whatsapp: MessageCircle,
};

export function SocialLinks({ compact = false, iconOnly = false }) {
  return (
    <nav aria-label="Social and contact links">
      <ul className={iconOnly ? "flex flex-col items-center gap-2" : compact ? "flex flex-wrap gap-3" : "space-y-3"}>
        {profile.socials.map((social) => {
          const Icon = icons[social.icon];
          const isExternal = social.href.startsWith("http");
          return (
            <li key={social.id}>
              <a
                href={social.href}
                aria-label={social.label}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={iconOnly ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-slate-300 shadow-lg shadow-slate-950/30 backdrop-blur transition-colors hover:border-cyan-300 hover:text-cyan-200" : "inline-flex items-center gap-2 rounded-md text-sm text-slate-300 transition-colors hover:text-cyan-200"}
              >
                <Icon aria-hidden="true" size={18} />
                <span className={iconOnly ? "sr-only" : ""}>{social.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
