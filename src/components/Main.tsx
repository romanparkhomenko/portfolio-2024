import "./Main.scss";

interface MainProps {
  children: JSX.Element;
}

export const Main = ({ children }: MainProps) => {
  return <main>{children}</main>;
};
