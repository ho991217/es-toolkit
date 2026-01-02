import { PlayIcon } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Header, HeaderPrefix, HeaderSuffix } from './components/header';
import { Logo } from './components/logo';
import { ModeToggle } from './components/mode-toggle';
import { Button } from './components/ui/button';
import { Kbd } from './components/ui/kbd';
import { Separator } from './components/ui/separator';

function App() {
  return (
    <div className="flex flex-col w-full h-full bg-foreground/5 min-w-sm">
      <Header>
        <HeaderPrefix>
          <Logo />
        </HeaderPrefix>
        <HeaderSuffix>
          <ModeToggle />
          <Button variant="outline">
            <PlayIcon className="size-4" />
            Run
            <Kbd>⌘ ⏎</Kbd>
          </Button>
        </HeaderSuffix>
      </Header>
      <Separator />
      <main className="flex-1 w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={20} collapsible>
            <div className="flex bg-background h-full w-full p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>

          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={80} collapsible>
                <div className="flex bg-background h-full p-6 w-full">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={20} minSize={20} collapsible>
                <div className="flex bg-background h-full p-6 w-full">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default App;
