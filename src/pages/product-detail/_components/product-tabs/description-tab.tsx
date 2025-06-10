interface DescriptionTabProps {
  description: string | undefined;
}
const DescriptionTab = ({ description }: DescriptionTabProps) => {
  return (
    <div className="max-w-6xl mx-auto lg:px-0 px-3">
      <div
        className="text-[#222] mt-[25px] text-[14px] leading-[24px] prose prose-sm max-w-none markdown-body"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></div>
    </div>
  );
};

export default DescriptionTab;
