import type { editor } from 'monaco-editor';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useTheme } from './theme-provider';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const editorOptions = {
  minimap: { enabled: false },
  padding: { top: 24, bottom: 24 },
  lineNumbers: 'off',
  fontFamily: 'var(--font-mono)',
} as editor.IStandaloneEditorConstructionOptions;

export function Editor({ value, onChange }: EditorProps) {
  const { theme } = useTheme();

  const handleChange = (value: string | undefined) => {
    if (value === undefined) return;
    onChange(value);
  };

  return (
    <MonacoEditor
      className="z-999"
      value={value}
      onChange={handleChange}
      language="typescript"
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={editorOptions}
    />
  );
}
