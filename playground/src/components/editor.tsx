import type { editor } from 'monaco-editor';
import { SandpackStack, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { Editor as MonacoEditor, type OnMount } from '@monaco-editor/react';
import { useTheme } from './theme-provider';

const editorOptions = {
  minimap: { enabled: false },
  padding: { top: 24, bottom: 24 },
  fontFamily: 'var(--font-mono)',
} as editor.IStandaloneEditorConstructionOptions;

export function Editor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { theme } = useTheme();

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      sandpack.runSandpack();
    });
  };

  return (
    <SandpackStack style={{ margin: 0, height: '100%' }}>
      <MonacoEditor
        key={sandpack.activeFile}
        width="100%"
        height="100%"
        defaultValue={code}
        value={code}
        onChange={value => updateCode(value || '')}
        onMount={handleEditorMount}
        language="typescript"
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={editorOptions}
      />
    </SandpackStack>
  );
}
