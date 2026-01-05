import { PlayIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { Button } from './ui/button';
import { Kbd } from './ui/kbd';
import { Spinner } from './ui/spinner';

export function RunButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sandpack, listen } = useSandpack();

  const run = useCallback(async () => {
    await sandpack.runSandpack();
  }, [sandpack]);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.metaKey && event.key === 'Enter') {
        event.preventDefault();
        run();
      }
    });
    const unsubscribe = listen(message => {
      if (message.type === 'start') {
        setIsLoading(true);
      } else if (message.type === 'done') {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [run, listen]);

  return (
    <Button
      variant="outline"
      className="select-none active:scale-95"
      onClick={() => run()}
      ref={ref}
      disabled={isLoading}
    >
      {isLoading ? <Spinner className="size-4" /> : <PlayIcon className="size-4" />}
      Run
      <Kbd>⌘ ⏎</Kbd>
    </Button>
  );
}
