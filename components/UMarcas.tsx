import React from 'react';

const base = (import.meta as any).env.BASE_URL || '/';

const UMarcas: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-16 overflow-hidden">
      <div className="w-full overflow-x-hidden">
        <h3 className="text-xl font-extrabold tracking-widest text-black text-center mb-4">PROVEEDORES</h3>
        <div className="w-full max-w-[90%] md:max-w-[744px] h-[61px] bg-white rounded-full shadow-lg overflow-hidden mx-auto pointer-events-none">
          <div className="w-max h-full flex items-center gap-10 animate-scroll-left whitespace-nowrap">
            <img alt="Supplier 1" className="h-10 object-contain mx-5" src={`${base}prov001.webp`} />
            <img alt="Supplier 2" className="h-10 object-contain mx-5" src={`${base}prov002.webp`} />
            <img alt="Supplier 3" className="h-10 object-contain mx-5" src={`${base}prov003.webp`} />
            <img alt="Supplier 4" className="h-10 object-contain mx-5" src={`${base}prov004.webp`} />
            <img alt="Supplier 5" className="h-10 object-contain mx-5" src={`${base}prov005.webp`} />
            <img alt="Supplier 6" className="h-10 object-contain mx-5" src={`${base}prov006.webp`} />
            <img alt="Supplier 7" className="h-10 object-contain mx-5" src={`${base}prov007.webp`} />
            <img alt="Supplier 8" className="h-10 object-contain mx-5" src={`${base}prov008.webp`} />
            <img alt="Supplier 1" className="h-10 object-contain mx-5" src={`${base}prov001.webp`} />
            <img alt="Supplier 2" className="h-10 object-contain mx-5" src={`${base}prov002.webp`} />
            <img alt="Supplier 3" className="h-10 object-contain mx-5" src={`${base}prov003.webp`} />
            <img alt="Supplier 4" className="h-10 object-contain mx-5" src={`${base}prov004.webp`} />
            <img alt="Supplier 5" className="h-10 object-contain mx-5" src={`${base}prov005.webp`} />
            <img alt="Supplier 6" className="h-10 object-contain mx-5" src={`${base}prov006.webp`} />
            <img alt="Supplier 7" className="h-10 object-contain mx-5" src={`${base}prov007.webp`} />
            <img alt="Supplier 8" className="h-10 object-contain mx-5" src={`${base}prov008.webp`} />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden">
        <h3 className="text-xl font-extrabold tracking-widest text-black text-center mb-4">CLIENTES</h3>
        <div className="w-full max-w-[90%] md:max-w-[744px] h-[61px] bg-white rounded-full shadow-lg overflow-hidden mx-auto pointer-events-none">
          <div className="w-max h-full flex items-center gap-10 animate-scroll-left whitespace-nowrap">
            <img alt="Client 1" className="h-10 object-contain mx-5" src={`${base}client001.webp`} />
            <img alt="Client 2" className="h-10 object-contain mx-5" src={`${base}client002.webp`} />
            <img alt="Client 3" className="h-10 object-contain mx-5" src={`${base}client003.webp`} />
            <img alt="Client 4" className="h-10 object-contain mx-5" src={`${base}client004.webp`} />
            <img alt="Client 5" className="h-10 object-contain mx-5" src={`${base}client005.webp`} />
            <img alt="Client 6" className="h-10 object-contain mx-5" src={`${base}client006.webp`} />
            <img alt="Client 7" className="h-10 object-contain mx-5" src={`${base}client007.webp`} />
            <img alt="Client 1" className="h-10 object-contain mx-5" src={`${base}client001.webp`} />
            <img alt="Client 2" className="h-10 object-contain mx-5" src={`${base}client002.webp`} />
            <img alt="Client 3" className="h-10 object-contain mx-5" src={`${base}client003.webp`} />
            <img alt="Client 4" className="h-10 object-contain mx-5" src={`${base}client004.webp`} />
            <img alt="Client 5" className="h-10 object-contain mx-5" src={`${base}client005.webp`} />
            <img alt="Client 6" className="h-10 object-contain mx-5" src={`${base}client006.webp`} />
            <img alt="Client 7" className="h-10 object-contain mx-5" src={`${base}client007.webp`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMarcas;
