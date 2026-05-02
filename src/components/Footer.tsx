import { FOOTER_TEXT } from '../data/constants';

export function Footer() {
  return (
    <footer className="hidden sm:block bg-[#1F4D4A] text-white/70 text-xs py-3 px-4 text-center">
      {FOOTER_TEXT}
    </footer>
  );
}
