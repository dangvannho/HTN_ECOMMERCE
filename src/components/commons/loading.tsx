const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <div
          className="absolute inset-0 rounded-full border-4 border-[#C32929] border-t-transparent animate-spin"
          style={{ width: 80, height: 80 }}
        ></div>
        <img
          src="/logo.svg"
          alt="Loading..."
          width={50}
          height={28}
          className="animate-pulse z-10"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  )
}

export default Loading