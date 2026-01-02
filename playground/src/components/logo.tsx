export function Logo() {
  return (
    <a href="/" className="h-full flex items-center shrink-0 py-6 gap-2">
      <img src="/logo_black.png" alt="Logo" className="dark:hidden block h-full shrink-0" />
      <img src="/logo_white.png" alt="Logo" className="hidden dark:block h-full shrink-0" />
      <span className="text-lg font-medium mr-2">Playground</span>
    </a>
  );
}
