import { Suspense, useEffect, useRef, useState } from 'react';
import { SandpackPreview, type SandpackPreviewRef, useSandpack, useSandpackConsole } from '@codesandbox/sandpack-react';
import { Spinner } from './ui/spinner';

function ConsoleLogs({ clientId }: { clientId: string }) {
  const { logs } = useSandpackConsole({ clientId, resetOnPreviewRestart: true });
  const { listen } = useSandpack();
  const [state, setState] = useState('loading...');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = listen(message => {
      switch (message.type) {
        case 'start':
          setState('loading...');
          setIsLoading(true);
          break;
        case 'status':
          setState(message.status);
          break;
        case 'done':
          setState('done');
          setIsLoading(false);
          break;
      }

      console.log(message);
    });

    return () => unsubscribe();
  }, [listen]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-sm">{state}</span>
      </div>
    );
  }

  return (
    <>
      {logs.length > 0 ? (
        logs.map(log => <code key={log.id}>{log.data?.toString()}</code>)
      ) : (
        <code className="text-muted-foreground">No output.</code>
      )}
    </>
  );
}

export function Console() {
  const ref = useRef<SandpackPreviewRef>(null);
  const [clientId, setClientId] = useState<string>();

  useEffect(() => {
    const check = () => {
      if (ref.current?.clientId) {
        setClientId(ref.current.clientId);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }, []);

  return (
    <>
      <SandpackPreview className="hidden!" ref={ref} />
      <Suspense fallback={<div>Loading console...</div>}>{clientId && <ConsoleLogs clientId={clientId} />}</Suspense>
    </>
  );
}
