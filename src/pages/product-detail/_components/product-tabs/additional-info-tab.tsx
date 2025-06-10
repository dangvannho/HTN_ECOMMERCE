interface AdditionalInfoTabProps {
  aditionalInfo: string | undefined;
}

const AdditionalInfoTab = ({ aditionalInfo }: AdditionalInfoTabProps) => (
  <div className="max-w-6xl mx-auto text-sm text-[#222] space-y-[30px] lg:px-0 px-3">
    <div
      className="text-[#222] mt-[25px] text-[14px] leading-[24px] prose prose-sm max-w-none markdown-body"
      dangerouslySetInnerHTML={{ __html: aditionalInfo || "" }}
    ></div>
  </div>
);

export default AdditionalInfoTab;
