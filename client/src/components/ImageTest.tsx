import React from 'react';

const ImageTest: React.FC = () => {
  return (
    <div className="p-4">
      <h2>Image Test</h2>
      <img src="photos/logos/redlogo.png" alt="Logo" className="w-32 h-32 object-contain" />
      <img src="photos/other/avt.jpg" alt="Avatar" className="w-32 h-32 object-contain" />
      <img src="photos/media/dailystar.png" alt="Daily Star" className="w-32 h-32 object-contain" />
    </div>
  );
};

export default ImageTest; 