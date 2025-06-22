// Permite a importação de arquivos .css em TypeScript
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
