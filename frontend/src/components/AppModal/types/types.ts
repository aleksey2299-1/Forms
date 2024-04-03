import { TForm } from 'src/components/EditForm/types/types';

type TAppModalProps = {
  title: string;
  data: TForm;
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRequested: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { TAppModalProps };
