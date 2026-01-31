const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-xl font-semibold text-slate-800">
      {title}
    </h2>
    <p className="text-gray-600 leading-relaxed">
      {children}
    </p>
  </div>
);

export default Section;