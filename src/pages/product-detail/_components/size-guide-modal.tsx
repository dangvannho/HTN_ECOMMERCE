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
      <DialogContent className="max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Size Guide</DialogTitle>
        </DialogHeader>
        <div className="mt-1 overflow-y-auto max-h-[calc(90vh-100px)]">
          <img src={image} alt="" className="w-full h-auto" />
          <img src={image} alt="" className="w-full h-auto" />
          <img src={image} alt="" className="w-full h-auto" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
