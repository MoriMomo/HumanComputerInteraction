# Team Project Assignment #1 : Project Proposal

**Team**: SatSet  
**Members**: Ken Prasetya, Aqsha Rahman, Cent Prabowo, Jes Kartika, Kelvin Wijaya  
**Lecturer**: HCI Course Facilitator  
**Team Drive URL**: [Google Drive Folder - SatSet Project](https://drive.google.com/drive/folders/satset-hci-2026)

---

## 1. Rumusan Masalah (Problem)
Gaya hidup modern yang dinamis, pergeseran ke sistem kerja *hybrid* (gabungan bekerja dari rumah, kantor, dan ruang publik), serta mobilitas yang tinggi menuntut para profesional aktif untuk membawa barang pribadi esensial mereka—seperti kartu identitas, kartu akses kantor, kartu debit/kredit, dan uang tunai—secara lebih efisien, ringkas, dan aman. Namun, pasar aksesoris penyimpanan pribadi saat ini masih menghadapi beberapa kendala utama yang belum terpecahkan dengan baik:
* **Masalah Kerapian dan Penumpukan Barang (Clutter & Disorganization)**: Dompet lipat tradisional cenderung menimbun barang-barang yang tidak diperlukan (seperti struk belanja lama, koin, dan kartu yang tidak aktif). Hal ini menghasilkan bentuk dompet yang tebal (*bulky*) yang tidak hanya merusak penampilan dan kenyamanan saku celana, tetapi juga memperantak meja kerja minimalis serta memicu beban kognitif (*cognitive load*) tambahan bagi penggunanya secara visual.
* **Pengalaman Belanja E-commerce yang Statis**: Saat berbelanja aksesoris *lifestyle* premium secara online, calon pembeli tidak dapat memeriksa fisik produk secara taktil dan visual yang menyeluruh. Foto studio 2D yang statis sering kali mengalami distorsi warna akibat penyuntingan berlebih atau gagal merepresentasikan skala ketebalan, detail potongan sudut (*chamfer*), tekstur permukaan metal, serta berat material yang sebenarnya. Hal ini kerap memicu keraguan saat membeli atau memicu kekecewaan setelah produk sampai.
* **Kurangnya Kustomisasi Personal**: Produk-produk massal yang beredar di pasaran saat ini memiliki desain yang seragam dan kaku. Mereka tidak menyediakan opsi kustomisasi yang memadai untuk mengakomodasi selera estetika personal atau kebutuhan kapasitas penggunaan yang bervariasi dari setiap individu.

**SatSet** hadir untuk mengatasi rangkaian masalah ini dengan memproduksi katalog utilitas fisik minimalis dan premium yang berpusat pada *cardholder* berbahan aluminium anodisasi kelas pesawat (*aircraft-grade anodized aluminium*) yang dilengkapi pelindung RFID (*RFID shielding*). Untuk melengkapi produk fisik ini, kami merancang platform konfigurasi 3D interaktif berbasis web (*High-Fidelity*). Dengan teknologi ini, pengguna dapat menyimulasikan penggunaan, menyesuaikan konfigurasi warna/aksesoris, dan menginspeksi produk secara spasial dari segala sudut dalam lingkungan WebGL sebelum membelinya, sehingga mengeliminasi keraguan visual dan membangun kepercayaan diri penuh calon pengguna.

---

## 2. Target Pengguna (Target Users)
Populasi target utama kami adalah para profesional aktif (usia awal hingga pertengahan karier, berkisar antara 22–45 tahun) yang menghargai kegunaan fungsional tingkat tinggi, ketelitian detail desain, serta kualitas material produk.

* **Pengguna Utama 1 (Pekerja Kantoran Hybrid & Kreatif)**: Pekerja kantoran yang *tech-savvy*, desainer, arsitek, pengembang perangkat lunak, serta eksekutif muda yang sering berpindah ruang kerja (kantor, kafe, *co-working space*). Mereka menyukai ruang kerja yang bersih (*clean setup*), mengapresiasi objek fungsional berdesain minimalis, dan sangat memperhatikan keselarasan estetika antara aksesoris pribadi dengan gawai kerja mereka.
* **Pengguna Utama 2 (Komuter Urban & Traveler)**: Pengguna transportasi publik perkotaan (seperti MRT, KRL, busway) dan pelancong bisnis (*business travelers*) yang membutuhkan aksesibilitas cepat (*sat-set*) untuk kartu akses tanpa harus mengeluarkan dompet tebal dari tas, serta memerlukan keamanan digital bawaan berupa pelindung RFID untuk mencegah skimming ilegal nirkabel di tempat umum.
* **Karakteristik Interaksi**: Kelompok pengguna ini sangat terbiasa dengan antarmuka web modern yang interaktif, menuntut standar estetika visual yang tinggi, dan fleksibel menggunakan PC desktop (untuk melakukan kustomisasi detail visual) maupun telepon seluler (untuk penelajahan produk secara cepat dan penyelesaian transaksi).

---

## 3. Solusi (Solution)
Solusi kami adalah menghadirkan platform web e-commerce responsif yang mengintegrasikan pratinjau dan konfigurator 3D interaktif secara *real-time*.

* **Kustomisasi 3D Interaktif (WebGL)**: Kami membangun kanvas 3D interaktif menggunakan Three.js dan `@react-three/fiber` yang memungkinkan pengguna untuk memutar model produk secara bebas (*orbit*), memperbesar detail sambungan dan sudut (*zoom*), serta memicu simulasi mekanik (seperti pendorongan kartu keluar/ejector). Pengguna dapat langsung memodifikasi warna anodisasi aluminium (seperti *matte black*, *space grey*, *sand gold*, atau *forest green*) dan melihat interaksi cahaya terhadap permukaan material metal tersebut secara nyata di layar.
* **Gaya Desain Premium & Editorial**: Untuk mencerminkan kemewahan produk fisik SatSet, antarmuka situs web dirancang menggunakan skema warna mode gelap dengan palet warna hangat bernuansa bumi (menggunakan warna dasar `#231711`). Kami memadukan font serif yang elegan untuk judul editorial guna membangun ritme visual yang eksklusif, serta font sans-serif (Inter) untuk keterbacaan menu navigasi yang optimal. Animasi transisi antar-elemen halaman diatur secara halus menggunakan GSAP (*GreenSock Animation Platform*).
* **Checkout WhatsApp Minim Friksi (WhatsApp Handoff)**: Mengurangi rintangan administratif yang sering dikeluhkan pembeli online. Calon pembeli tidak diwajibkan melewati proses registrasi akun baru yang rumit atau memasukkan nomor kartu kredit mereka di gerbang pembayaran asing. Sistem akan mengompilasi detail barang yang ada dalam keranjang belanja secara otomatis menjadi draf pesan teks ringkasan pesanan (*order summary*) yang rapi, lalu mengalihkan pengguna ke aplikasi WhatsApp Customer Service SatSet untuk menyelesaikan pembayaran lokal (seperti QRIS atau transfer bank) secara personal dan aman.

---

## 4. Evaluasi Proposal (Problem & Solution Questions)

### Are there problems with an existing product or user experience? If so, what are they?
Ya, kami mengidentifikasi adanya kesenjangan besar pada dua aspek pengalaman pengguna produk saat ini:
1. **Aspek Fisik**: Dompet lipat konvensional berbahan kulit/sintetis mudah aus, tidak memiliki perlindungan dari skimming nirkabel RFID, dan berdimensi tebal sehingga tidak cocok diletakkan di meja kerja modern yang minimalis. Sementara itu, opsi *cardholder* besi yang ada di pasar lokal sering kali terlalu berat, memiliki sudut tajam yang dapat merusak saku pakaian, atau memiliki mekanisme keluaran kartu yang macet.
2. **Aspek Pengalaman Digital**: E-commerce aksesoris premium saat ini sangat membosankan karena hanya mengandalkan foto studio 2D statis. Foto semacam ini sering kali diambil dari sudut tertentu saja dan rentan manipulasi warna lampu studio, sehingga pembeli kesulitan memperkirakan dimensi asli, proporsi skala terhadap tangan, kecocokan warna dengan meja kerja mereka, dan tekstur material yang sebenarnya.

### Why do you think there are problems?
Masalah ini muncul karena platform e-commerce pada umumnya mengutamakan fungsionalitas transaksi massal yang murah dan cepat, tanpa mengindahkan keterlibatan emosional serta kepuasan indrawi pembeli (*experiential shopping*). Aksesoris premium adalah produk yang dihargai karena presisi pembuatan, detail lekukan, dan kualitas taktilnya. Ketika interaksi fisik ini dipangkas menjadi sekadar gambar 2D statis di layar, pembeli kehilangan kemampuan untuk menilai kualitas produk tersebut secara objektif, yang akhirnya menurunkan tingkat kepercayaan mereka untuk melakukan transaksi.

### What evidence do you have to support the existence of these problems?
* **Tingkat Pengembalian Barang yang Tinggi (High Return Rates)**: Berdasarkan studi industri e-commerce fesyen dan aksesoris, tingkat pengembalian barang berkisar antara 15-20%, di mana alasan mayoritas pembeli adalah "produk asli tidak sesuai dengan ekspektasi visual dari foto di situs web."
* **Hasil Wawancara Pengguna Awal**: Kami melakukan wawancara semi-terstruktur dengan 5 profesional aktif yang sesuai dengan profil target pengguna kami. Hasilnya menunjukkan bahwa seluruh partisipan (100%) merasa ragu untuk membeli dompet metal premium secara online karena khawatir akan ketebalan asli produk saat diisi kartu dan akurasi warna metalik di bawah pencahayaan ruangan nyata.
* **Analisis Pasar Lokal (Market Gap)**: Berdasarkan riset pasar pada situs web brand aksesoris sejenis di Indonesia, belum ada brand lokal yang menawarkan fitur visualisasi 3D kustomisasi yang interaktif secara instan di dalam peramban web (*web browser*). Mereka masih mengandalkan cara konvensional berupa deretan foto statis dan pilihan varian lewat menu tarik-turun (*dropdown*).

### How do you think your proposed design ideas might overcome these problems?
* **Manipulasi Langsung (Direct Manipulation) Berbasis WebGL**: Dengan menggunakan Three.js, pengguna diberikan kebebasan penuh secara interaktif untuk memutar, membalik, dan memperbesar model 3D cardholder dari berbagai sudut pandang seolah-olah sedang memegangnya langsung di toko fisik. Ini menghilangkan ketidakpastian mengenai detail fisik produk.
* **Perubahan Shader Material Real-Time**: Perubahan warna metalik anodisasi pada model 3D saat swatch diklik memberikan feedback instan yang akurat, membantu pengguna mencocokkan cardholder dengan preferensi warna meja kerja mereka secara presisi.
* **Jalur Pembelian yang Akrab (WhatsApp Checkout)**: Mengalihkan transaksi akhir ke WhatsApp memberikan rasa aman dan sentuhan personal yang lebih disukai konsumen lokal di Indonesia. Ini menjembatani keunggulan kustomisasi digital canggih dengan kenyamanan interaksi antar-manusia yang tepercaya untuk menyelesaikan metode pembayaran lokal.

