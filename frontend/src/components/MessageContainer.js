import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="tailwind">
      <div className="md:min-w-[450px] tw-flex tw-flex-col">
        <>
          <div className=" tw-px-4 tw-py-2 tw-mb-2">
            {/* <span className="tw-label-text">To:</span>{" "}
            <span className="tw-text-gray-900 tw-font-bold">Andy Tuan</span> */}
          </div>

          <Messages />
        </>
      </div>
    </div>
  );
};

export default MessageContainer;
