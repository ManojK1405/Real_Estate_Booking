import react from 'react';

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="font-medium text-slate-700">{title}</p>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

export default InfoItem