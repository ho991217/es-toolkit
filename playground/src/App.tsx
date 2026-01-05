import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import { Console } from './components/console';
import { Editor } from './components/editor';
import { Header, HeaderPrefix, HeaderSuffix } from './components/header';
import { Logo } from './components/logo';
import { ModeToggle } from './components/mode-toggle';
import { RunButton } from './components/run-button';
import { useTheme } from './components/theme-provider';
import { Separator } from './components/ui/separator';

function App() {
  const { theme } = useTheme();

  return (
    <div className=" w-full h-full min-w-sm">
      <SandpackProvider
        theme={theme === 'dark' ? 'dark' : 'light'}
        template="vanilla-ts"
        className="h-full!"
        options={{
          autorun: false,
          autoReload: false,
          logLevel: 0,
        }}
        customSetup={{
          dependencies: {
            'es-toolkit': '^1.30.1',
          },
        }}
        files={{
          '/index.ts': {
            code: `import { sum } from "es-toolkit";
            
console.log(sum([1, 2, 3]));`,
          },
        }}
      >
        <div className="flex flex-col w-full h-full">
          <Header>
            <HeaderPrefix>
              <Logo />
            </HeaderPrefix>
            <HeaderSuffix>
              <ModeToggle />
              <RunButton />
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
                  <ResizablePanel defaultSize={80}>
                    <Editor />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={20} className="p-4">
                    <Console />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </SandpackProvider>
    </div>
  );
}

export default App;
