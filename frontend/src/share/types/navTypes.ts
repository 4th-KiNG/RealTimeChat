export interface INavLink {
  path: string;
  title: string;
  setOpen: () => void;
}

export interface INav {
  isOpen: boolean;
  setOpen: () => void;
}
