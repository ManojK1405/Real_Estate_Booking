const Textarea = ({ label, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        {...props}   
        rows={5}
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
      />
    </div>
  );
};

export default Textarea;
