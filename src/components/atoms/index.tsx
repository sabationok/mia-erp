export const DefaultContent: React.FC<{ content?: string }> = ({ content } = {}) => {
  return <div>{`Default content: ${content}`}</div>;
};
export const ErrorContent: React.FC<{ error?: string }> = ({ error } = {}) => {
  return <div>{`Error: ${error}`}</div>;
};
