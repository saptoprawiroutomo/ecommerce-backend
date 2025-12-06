import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang <span className="text-red-600">Inter Medi-A</span></h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Mitra terpercaya Anda untuk solusi peralatan kantor, pengadaan alat, dan jasa servis profesional di Jakarta Barat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center shadow-inner">
           {/* Placeholder untuk foto toko fisik yang diupload */}
           <div className="text-gray-400 text-center">
             <MapPin size={48} className="mx-auto mb-2" />
             <p>Foto Toko Fisik</p>
           </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Profil Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Inter Medi-A (Toko Syifa) telah berpengalaman dalam menyediakan layanan teknis dan pengadaan alat kantor. 
            Kami mengkhususkan diri dalam perawatan mesin fotocopy, printer, dan komputer dengan teknisi berpengalaman.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-red-600 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Alamat Workshop</h3>
                <p className="text-gray-600">Jln. Klingkit Dalam Blok C No. 22 RT 010/011, Rawa Buaya, Cengkareng, Jakarta Barat 11470</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-red-600 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Hubungi Kami</h3>
                <p className="text-gray-600">Telp/WA: 0895-3339-61424</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-red-600 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">medyyes.krps@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 rounded-2xl p-10 text-white flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Butuh Bantuan Mendesak?</h2>
          <p className="text-blue-100">Teknisi kami siap membantu permasalahan mesin kantor Anda.</p>
        </div>
        <a 
          href="https://wa.me/62895333961424" 
          target="_blank" 
          rel="noreferrer"
          className="mt-6 md:mt-0 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
        >
          <Phone size={20} /> Chat WhatsApp
        </a>
      </div>
    </div>
  );
};

export default About;