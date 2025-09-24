import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface IAppDialog {
  triggerLabel?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AppDialog: React.FC<IAppDialog> = ({
  triggerLabel = "Open",
  title = "Dialog Title",
  description = "",
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-button w-fit text-white rounded-full">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-200 shadow-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default AppDialog;
