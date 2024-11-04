interface CodeBlockProps {
  title: string;
  children: JSX.Element;
}

export const CodeBlock = ({ title, children }: CodeBlockProps) => {
  return (
    <div className="code-block">
      <div className="code">
        {title} {"{"}
      </div>
      {children}
      <div className="code">{"}"}</div>
    </div>
  );
};
