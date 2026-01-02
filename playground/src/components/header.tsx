export function Header({ children }: { children: React.ReactNode }) {
  return <header className="w-full h-16 bg-background flex items-center px-4 font-sans">{children}</header>;
}

export function HeaderPrefix({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 h-full">{children}</div>;
}

export function HeaderSuffix({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 ml-auto h-full">{children}</div>;
}
