function TextLoad({ text }: { text: string }) {
  return (
    <div className="min-h-screen bg-[rgb(20,20,20)] p-18 text-gray-200">
      <div className="mb-20 flex items-center justify-center">
        <h1 className="font-noto-sans text-4xl">{text}</h1>
      </div>
    </div>
  );
}

export default TextLoad;
