import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: string;
}

const SizeGuideModal = ({ open, onOpenChange, image }: SizeGuideModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Size Guide</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img src={image} alt="" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
