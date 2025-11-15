from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """
    Abstract Base Class (ABC) untuk semua item di perpustakaan.
    Menjadi blueprint untuk item-item spesifik seperti Buku dan Majalah.
    """
    
    def __init__(self, title, item_id, year):
        # --- ENCAPSULATION ---
        # Menggunakan 'protected' (single underscore) untuk atribut
        # yang seharusnya tidak diakses langsung dari luar class,
        # tetapi dapat diakses oleh subclass.
        self._title = title
        self._item_id = item_id
        self._year = year
        self._is_available = True

    # --- ABSTRACT METHOD ---
    @abstractmethod
    def display_info(self):
        """
        Method abstract yang HARUS diimplementasikan oleh subclass.
        Bertujuan untuk menampilkan detail spesifik dari item.
        """
        pass

    # --- ENCAPSULATION & PROPERTY  ---
    # Menyediakan 'getter' publik untuk atribut yang dilindungi.
    # Ini adalah cara yang aman untuk mengekspos data.

    @property
    def title(self):
        """Getter untuk atribut protected _title."""
        return self._title

    @property
    def item_id(self):
        """Getter untuk atribut protected _item_id."""
        return self._item_id

    @property
    def is_available(self):
        """Getter untuk atribut protected _is_available."""
        return self._is_available

    def check_out(self):
        """Mengubah status item menjadi 'Dipinjam'."""
        if self._is_available:
            self._is_available = False
            return True
        return False

    def check_in(self):
        """Mengubah status item menjadi 'Tersedia'."""
        if not self._is_available:
            self._is_available = True
            return True
        return False


class Book(LibraryItem):
    """
    Subclass yang mewarisi (Inheritance) dari LibraryItem.
    Merepresentasikan item 'Buku' di perpustakaan.
    """
    
    def __init__(self, title, item_id, year, author):
        # Memanggil constructor dari parent class (LibraryItem)
        super().__init__(title, item_id, year)
        # Atribut spesifik untuk Book
        self._author = author

    # --- IMPLEMENTASI ABSTRACT METHOD  ---
    def display_info(self):
        """
        Implementasi spesifik dari display_info untuk class Book.
        Ini adalah contoh Polymorphism (Method Overriding).
        """
        status = "Tersedia" if self._is_available else "Dipinjam"
        return (f"[Buku]    : {self._title} by {self._author} ({self._year})\n"
                f"          ID: {self._item_id} (Status: {status})")


class Magazine(LibraryItem):
    """
    Subclass yang mewarisi (Inheritance) dari LibraryItem.
    Merepresentasikan item 'Majalah' di perpustakaan.
    """
    
    def __init__(self, title, item_id, year, issue_number):
        # Memanggil constructor dari parent class (LibraryItem)
        super().__init__(title, item_id, year)
        # Atribut spesifik untuk Magazine
        self._issue_number = issue_number

    # --- IMPLEMENTASI ABSTRACT METHOD  ---
    def display_info(self):
        """
        Implementasi spesifik dari display_info untuk class Magazine.
        Ini adalah contoh Polymorphism (Method Overriding).
        """
        status = "Tersedia" if self._is_available else "Dipinjam"
        return (f"[Majalah] : {self._title} (Issue #{self._issue_number}, {self._year})\n"
                f"          ID: {self._item_id} (Status: {status})")


class Library:
    """
    Class untuk mengelola koleksi item perpustakaan.
    Menerapkan Encapsulation untuk koleksi item.
    """
    
    def __init__(self, library_name):
        self.library_name = library_name
        # --- ENCAPSULATION  ---
        # Menggunakan 'private' (double underscore) untuk atribut
        # yang sangat penting dan tidak boleh diakses/diubah dari luar.
        self.__items = []

    def add_item(self, item):
        """
        Menambahkan item baru ke koleksi perpustakaan.
        Hanya menerima objek yang merupakan turunan dari LibraryItem.
        """
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"Info: Item '{item.title}' telah ditambahkan ke {self.library_name}.")
        else:
            print("Error: Hanya objek dari LibraryItem yang bisa ditambahkan.")

    def display_available_items(self):
        """
        Menampilkan semua item yang statusnya 'Tersedia'.
        
        --- PENERAPAN POLYMORPHISM ---
        Method ini memanggil `item.display_info()` pada setiap objek.
        Python secara otomatis akan memanggil implementasi yang benar
        (versi Book atau versi Magazine) tanpa method ini perlu tahu
        tipe spesifik dari item tersebut.
        """
        print(f"\n--- Daftar Item Tersedia di {self.library_name} ---")
        found_item = False
        for item in self.__items:
            if item.is_available:
                # Polymorphism: memanggil method yang sama pada objek berbeda
                print(item.display_info())
                found_item = True
        
        if not found_item:
            print("Tidak ada item yang tersedia saat ini.")
        print("-" * (30 + len(self.library_name)))

    def search_item(self, query):
        """
        Mencari item berdasarkan judul (case-insensitive) atau ID.
        """
        print(f"\n--- Hasil Pencarian untuk '{query}' ---")
        found_item = False
        query = query.lower()
        
        for item in self.__items:
            # Mencari berdasarkan ID atau Judul (case-insensitive)
            if item.item_id == query or query in item.title.lower():
                # Polymorphism: memanggil method yang sama
                print(item.display_info())
                found_item = True
                
        if not found_item:
            print("Item tidak ditemukan.")
        print("-" * (30 + len(query)))

    def _find_item_by_id(self, item_id):
        """Helper method (protected) untuk mencari item berdasarkan ID."""
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None

    def check_out_item(self, item_id):
        """Meminjam item berdasarkan ID."""
        item = self._find_item_by_id(item_id)
        if item:
            if item.check_out(): # Memanggil method dari LibraryItem
                print(f"Sukses: '{item.title}' telah dipinjam.")
            else:
                print(f"Gagal: '{item.title}' sudah dipinjam.")
        else:
            print(f"Gagal: Item dengan ID '{item_id}' tidak ditemukan.")

    def check_in_item(self, item_id):
        """Mengembalikan item berdasarkan ID."""
        item = self._find_item_by_id(item_id)
        if item:
            if item.check_in(): # Memanggil method dari LibraryItem
                print(f"Sukses: '{item.title}' telah dikembalikan.")
            else:
                print(f"Gagal: '{item.title}' memang sudah tersedia.")
        else:
            print(f"Gagal: Item dengan ID '{item_id}' tidak ditemukan.")

if __name__ == "__main__":
    # 1. Membuat Perpustakaan
    my_library = Library(library_name="Perpustakaan Cerdas")
    print(f"Selamat datang di {my_library.library_name}!\n")

    # 2. Menambahkan Item (Requirement: Add item)
    book1 = Book(
        title="Pemrograman Python: Dari Dasar Hingga Mahir", 
        item_id="B001", 
        year=2023, 
        author="Andi Setiawan"
    )
    book2 = Book(
        title="Struktur Data & Algoritma", 
        item_id="B002", 
        year=2022, 
        author="Budi Hartono"
    )
    mag1 = Magazine(
        title="National Geographic", 
        item_id="M001", 
        year=2024, 
        issue_number=10
    )
    
    my_library.add_item(book1)
    my_library.add_item(book2)
    my_library.add_item(mag1)

    # 3. Menampilkan Daftar Item (Requirement: Display available)
    my_library.display_available_items()

    # 4. Melakukan Peminjaman (Simulasi Encapsulation & State Change)
    print("\n--- Simulasi Peminjaman ---")
    my_library.check_out_item("B001") # Sukses
    my_library.check_out_item("M001") # Sukses
    my_library.check_out_item("B001") # Gagal (sudah dipinjam)
    
    # 5. Menampilkan Daftar Item Lagi (untuk melihat perubahan status)
    my_library.display_available_items()

    # 6. Melakukan Pengembalian
    print("\n--- Simulasi Pengembalian ---")
    my_library.check_in_item("B001") # Sukses
    
    # 7. Menampilkan Daftar Item Lagi
    my_library.display_available_items()
    
    # 8. Mencari Item (Requirement: Search item)
    my_library.search_item("B002") # Mencari berdasarkan ID
    my_library.search_item("python") # Mencari berdasarkan Judul (case-insensitive)
    my_library.search_item("M001") # Mencari item yang sedang dipinjam