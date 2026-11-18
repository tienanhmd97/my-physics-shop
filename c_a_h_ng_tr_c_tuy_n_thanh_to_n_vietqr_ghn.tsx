import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  Truck,
  QrCode,
  CheckCircle2,
  Settings,
  Package,
  MapPin,
  Phone,
  User,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Store,
  CreditCard,
  Banknote,
  ChevronRight,
  AlertCircle,
  Box
} from 'lucide-react';

// ============================================================================
// DỮ LIỆU ĐỊA CHÍNH HÀNH CHÍNH VIỆT NAM (MÔ PHỎNG MASTER DATA CHUẨN GHN)
// ============================================================================
const VIETNAM_LOCATIONS = [
  {
    id: 201,
    name: 'Hà Nội',
    zone: 'NORTH',
    districts: [
      {
        id: 1442,
        name: 'Quận Long Biên',
        wards: [
          { code: '1A0401', name: 'Phường Bồ Đề' },
          { code: '1A0405', name: 'Phường Gia Thụy' },
          { code: '1A0409', name: 'Phường Ngọc Lâm' },
          { code: '1A0414', name: 'Phường Việt Hưng' }
        ]
      },
      {
        id: 1485,
        name: 'Quận Cầu Giấy',
        wards: [
          { code: '1A0601', name: 'Phường Dịch Vọng' },
          { code: '1A0602', name: 'Phường Dịch Vọng Hậu' },
          { code: '1A0605', name: 'Phường Nghĩa Tân' },
          { code: '1A0608', name: 'Phường Yên Hòa' }
        ]
      },
      {
        id: 1488,
        name: 'Quận Đống Đa',
        wards: [
          { code: '1A0306', name: 'Phường Láng Hạ' },
          { code: '1A0307', name: 'Phường Láng Thượng' },
          { code: '1A0314', name: 'Phường Thái Hà' }
        ]
      }
    ]
  },
  {
    id: 249,
    name: 'Bắc Ninh',
    zone: 'NORTH',
    districts: [
      {
        id: 2158,
        name: 'Huyện Tiên Du',
        wards: [
          { code: '210402', name: 'Xã Đại Đồng' },
          { code: '210401', name: 'Thị trấn Lim' },
          { code: '210405', name: 'Xã Hoàn Sơn' },
          { code: '210410', name: 'Xã Nội Duệ' }
        ]
      },
      {
        id: 2046,
        name: 'Thành phố Bắc Ninh',
        wards: [
          { code: '210101', name: 'Phường Vũ Ninh' },
          { code: '210103', name: 'Phường Suối Hoa' },
          { code: '210105', name: 'Phường Tiền An' },
          { code: '210109', name: 'Phường Võ Cường' }
        ]
      },
      {
        id: 2159,
        name: 'Thành phố Từ Sơn',
        wards: [
          { code: '210201', name: 'Phường Đông Ngàn' },
          { code: '210203', name: 'Phường Đình Bảng' },
          { code: '210207', name: 'Phường Trang Hạ' }
        ]
      }
    ]
  },
  {
    id: 202,
    name: 'TP. Hồ Chí Minh',
    zone: 'SOUTH',
    districts: [
      {
        id: 1444,
        name: 'Quận 1',
        wards: [
          { code: '20101', name: 'Phường Bến Nghé' },
          { code: '20102', name: 'Phường Bến Thành' },
          { code: '20105', name: 'Phường Đa Kao' }
        ]
      },
      {
        id: 1454,
        name: 'Quận 7',
        wards: [
          { code: '20701', name: 'Phường Tân Thuận Đông' },
          { code: '20704', name: 'Phường Tân Phong' },
          { code: '20706', name: 'Phường Phú Mỹ' }
        ]
      },
      {
        id: 3695,
        name: 'Thành phố Thủ Đức',
        wards: [
          { code: '90737', name: 'Phường Thảo Điền' },
          { code: '90741', name: 'Phường An Phú' },
          { code: '90755', name: 'Phường Linh Trung' }
        ]
      }
    ]
  },
  {
    id: 203,
    name: 'Đà Nẵng',
    zone: 'CENTRAL',
    districts: [
      {
        id: 1526,
        name: 'Quận Hải Châu',
        wards: [
          { code: '40101', name: 'Phường Hải Châu I' },
          { code: '40105', name: 'Phường Thạch Thang' },
          { code: '40108', name: 'Phường Hòa Thuận Đông' }
        ]
      },
      {
        id: 1528,
        name: 'Quận Sơn Trà',
        wards: [
          { code: '40301', name: 'Phường An Hải Bắc' },
          { code: '40304', name: 'Phường Phước Mỹ' }
        ]
      }
    ]
  },
  {
    id: 224,
    name: 'Hải Phòng',
    zone: 'NORTH',
    districts: [
      {
        id: 1566,
        name: 'Quận Ngô Quyền',
        wards: [
          { code: '30201', name: 'Phường Máy Chai' },
          { code: '30205', name: 'Phường Lạch Tray' },
          { code: '30209', name: 'Phường Đằng Giang' }
        ]
      },
      {
        id: 1568,
        name: 'Quận Lê Chân',
        wards: [
          { code: '30302', name: 'Phường Cát Dài' },
          { code: '30306', name: 'Phường Hồ Nam' }
        ]
      }
    ]
  }
];

// Danh sách ngân hàng phổ biến hỗ trợ VietQR chuẩn Napas
const SUPPORTED_BANKS = [
  { code: 'MB', name: 'MBBank (Quân Đội)' },
  { code: 'VCB', name: 'Vietcombank' },
  { code: 'TCB', name: 'Techcombank' },
  { code: 'ACB', name: 'ACB (Á Châu)' },
  { code: 'TPB', name: 'TPBank' },
  { code: 'BIDV', name: 'BIDV' },
  { code: 'ICB', name: 'VietinBank' },
  { code: 'VPB', name: 'VPBank' }
];

// ============================================================================
// DỮ LIỆU SẢN PHẨM MẪU BAN ĐẦU (SẢN PHẨM VẬT LÝ & ĐỒ CÔNG NGHỆ / DIY)
// ============================================================================
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Bộ Tua Vít Đa Năng Chính Xác 48 Chi Tiết S2',
    category: 'Dụng cụ DIY',
    price: 245000,
    weightGram: 380,
    stock: 24,
    description: 'Mũi vít hợp kim thép S2 siêu cứng, hộp nhôm từ tính sang trọng, chuyên dụng sửa chữa điện thoại, laptop, đồng hồ và đồ điện tử.',
    badge: 'Bán chạy',
    color: 'from-slate-700 to-slate-900',
    iconType: 'tool'
  },
  {
    id: 'prod-2',
    name: 'Đèn Bàn LED Chống Cận Cảm Ứng 3 Chế Độ Sáng',
    category: 'Góc làm việc',
    price: 320000,
    weightGram: 650,
    stock: 15,
    description: 'Chỉ số hoàn màu CRI > 95 bảo vệ mắt, điều chỉnh độ sáng vô cấp, trục xoay linh hoạt 180 độ, tích hợp cổng sạc USB tiện lợi.',
    badge: 'Mới về',
    color: 'from-blue-600 to-indigo-700',
    iconType: 'lamp'
  },
  {
    id: 'prod-3',
    name: 'Giá Đỡ Laptop Hợp Kim Nhôm Nguyên Khối Gấp Gọn',
    category: 'Góc làm việc',
    price: 185000,
    weightGram: 420,
    stock: 32,
    description: 'Nhôm anodize dày 4mm chịu lực tới 15kg, 6 mức nâng độ cao chuẩn công thái học, kèm túi nhung chống trầy mang đi làm.',
    badge: 'Freeship từ 500k',
    color: 'from-sky-500 to-cyan-700',
    iconType: 'stand'
  },
  {
    id: 'prod-4',
    name: 'Trạm Hàn Nhiệt Kỹ Thuật Số Mini 65W Cổng Type-C',
    category: 'Linh kiện & Hàn',
    price: 490000,
    weightGram: 290,
    stock: 9,
    description: 'Gia nhiệt siêu nhanh trong 8 giây, màn hình OLED hiển thị nhiệt độ chính xác từ 100°C - 450°C, dùng nguồn PD Type-C gọn nhẹ.',
    badge: 'Hot',
    color: 'from-amber-500 to-orange-600',
    iconType: 'solder'
  },
  {
    id: 'prod-5',
    name: 'Bộ 100 Dây Thít Cáp Velcro Tái Sử Dụng Nhiều Màu',
    category: 'Phụ kiện gọn dây',
    price: 65000,
    weightGram: 150,
    stock: 80,
    description: 'Chất liệu vải gai bám dính chắc chắn, dễ dàng tháo mở buộc gọn dây sạc, dây mạng, cáp máy tính thẩm mỹ.',
    badge: '',
    color: 'from-emerald-500 to-teal-700',
    iconType: 'cable'
  },
  {
    id: 'prod-6',
    name: 'Đồng Hồ Vạn Năng Điện Tử Tự Động Đo Thông Minh',
    category: 'Linh kiện & Hàn',
    price: 275000,
    weightGram: 340,
    stock: 18,
    description: 'Tự động nhận diện điện áp AC/DC, đo điện trở, thông mạch, dò dây đứt ngầm không tiếp xúc NCV, màn hình LCD có đèn nền.',
    badge: '',
    color: 'from-violet-600 to-purple-800',
    iconType: 'meter'
  }
];

// ============================================================================
// HÀM TIỆN ÍCH ĐỊNH DẠNG TIỀN TỆ & MINH HỌA SẢN PHẨM SVG
// ============================================================================
const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
};

const ProductIllustration = ({ type, gradient }) => {
  return (
    <div className={`w-full h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300`}>
      {/* Họa tiết lưới kỹ thuật nền */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />
      {type === 'tool' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="14" y="8" width="36" height="48" rx="6" className="fill-white/10" />
          <line x1="24" y1="18" x2="24" y2="46" strokeLinecap="round" />
          <line x1="32" y1="18" x2="32" y2="46" strokeLinecap="round" />
          <line x1="40" y1="18" x2="40" y2="46" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
          <circle cx="40" cy="40" r="2" fill="currentColor" />
        </svg>
      )}
      {type === 'lamp' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 54h28" strokeLinecap="round" />
          <path d="M32 54V34L20 20l22-8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 10l12 6-6 8-12-6z" className="fill-white/20" />
          <path d="M40 26l-3 5M46 28l-2 5" strokeLinecap="round" className="opacity-70" />
        </svg>
      )}
      {type === 'stand' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 48h40" strokeLinecap="round" />
          <path d="M16 48L44 20" strokeLinecap="round" strokeWidth="3.5" />
          <path d="M38 26l8 22" strokeLinecap="round" />
          <rect x="20" y="14" width="28" height="4" rx="2" transform="rotate(-45 20 14)" className="fill-white/20" />
        </svg>
      )}
      {type === 'solder' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 52c8-8 14-4 20-10" strokeLinecap="round" />
          <rect x="28" y="24" width="22" height="10" rx="3" transform="rotate(-45 28 24)" className="fill-white/20" />
          <path d="M44 20l10-10" strokeLinecap="round" strokeWidth="3" />
          <circle cx="55" cy="9" r="2" fill="currentColor" />
        </svg>
      )}
      {type === 'cable' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="32" cy="32" r="16" className="fill-white/10" />
          <circle cx="32" cy="32" r="8" />
          <path d="M48 32h8v6h-8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {type === 'meter' && (
        <svg className="w-24 h-24 text-white/90 drop-shadow-lg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="18" y="10" width="28" height="44" rx="5" className="fill-white/15" />
          <rect x="23" y="16" width="18" height="10" rx="2" className="fill-white/25" />
          <circle cx="32" cy="39" r="7" />
          <line x1="32" y1="35" x2="35" y2="41" strokeLinecap="round" />
        </svg>
      )}
      {!['tool', 'lamp', 'stand', 'solder', 'cable', 'meter'].includes(type) && (
        <Package className="w-20 h-20 text-white/90" />
      )}
    </div>
  );
};

// ============================================================================
// COMPONENT CHÍNH: APP
// ============================================================================
export default function App() {
  // Cấu hình cửa hàng (có thể chỉnh sửa trong trang Quản trị Admin)
  const [shopConfig, setShopConfig] = useState({
    shopName: 'Kỹ Thuật & DIY Store',
    bankCode: 'MB',
    accountNo: '0987654321',
    accountName: 'NGUYEN VAN A',
    warehouseAddress: 'KCN Đại Đồng - Hoàn Sơn, Tiên Du, Bắc Ninh',
    freeshipThreshold: 500000, // Miễn phí ship cho đơn từ 500k
    vietqrDiscount: 10000 // Giảm trực tiếp 10k phí ship khi chọn thanh toán VietQR
  });

  // Danh sách sản phẩm
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Điều hướng màn hình: 'store' | 'checkout' | 'payment' | 'admin'
  const [activeView, setActiveView] = useState('store');

  // Bộ lọc & Tìm kiếm trên Storefront
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Giỏ hàng
  const [cart, setCart] = useState([
    { productId: 'prod-1', quantity: 1 },
    { productId: 'prod-5', quantity: 2 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Form Checkout & Địa chỉ 3 cấp GHN
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [note, setNote] = useState('');

  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardCode, setSelectedWardCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('VIETQR'); // 'VIETQR' | 'COD'

  // Trạng thái tính phí ship Realtime GHN
  const [shippingFee, setShippingFee] = useState(0);
  const [isCalculatingShip, setIsCalculatingShip] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  // Danh sách đơn hàng & Đơn hàng đang thanh toán
  const [orders, setOrders] = useState([
    {
      orderCode: 'DH8391',
      customerName: 'Trần Minh Quân',
      customerPhone: '0912345678',
      fullAddress: 'Số 18 Hoàng Quốc Việt, Phường Nghĩa Tân, Quận Cầu Giấy, Hà Nội',
      items: [{ name: 'Trạm Hàn Nhiệt Kỹ Thuật Số Mini 65W Cổng Type-C', quantity: 1, price: 490000 }],
      subtotal: 490000,
      shippingFee: 12000,
      totalAmount: 502000,
      paymentMethod: 'VIETQR',
      paymentStatus: 'PAID',
      orderStatus: 'SHIPPING',
      trackingCode: 'GHN9823412',
      createdAt: 'Hôm nay, 14:15'
    }
  ]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Form thêm sản phẩm mới trong Admin
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Dụng cụ DIY',
    price: '',
    weightGram: '300',
    stock: '20',
    description: ''
  });

  // Hiển thị thông báo nhanh (Toast)
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Danh sách danh mục duy nhất
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['Tất cả', ...Array.from(cats)];
  }, [products]);

  // Lọc sản phẩm hiển thị
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'Tất cả' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Chi tiết giỏ hàng kèm tính tổng tiền hàng & tổng khối lượng
  const cartDetails = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
          lineWeight: product.weightGram * item.quantity
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartSubtotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartDetails]
  );

  const cartTotalWeight = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.lineWeight, 0),
    [cartDetails]
  );

  const cartTotalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Lấy danh sách Quận/Huyện & Phường/Xã theo lựa chọn
  const currentProvince = useMemo(
    () => VIETNAM_LOCATIONS.find((p) => p.id === Number(selectedProvinceId)),
    [selectedProvinceId]
  );

  const currentDistrict = useMemo(
    () => currentProvince?.districts.find((d) => d.id === Number(selectedDistrictId)),
    [currentProvince, selectedDistrictId]
  );

  // ============================================================================
  // HIỆU ỨNG TÍNH PHÍ SHIP REALTIME THEO CHUẨN API GHN KHI CHỌN XONG PHƯỜNG/XÃ
  // ============================================================================
  useEffect(() => {
    if (!selectedProvinceId || !selectedDistrictId || !selectedWardCode) {
      setShippingFee(0);
      setEstimatedDelivery('');
      return;
    }

    setIsCalculatingShip(true);
    const timer = setTimeout(() => {
      const province = VIETNAM_LOCATIONS.find((p) => p.id === Number(selectedProvinceId));
      // Bảng giá cước GHN mô phỏng theo vùng từ kho Miền Bắc (Bắc Ninh)
      let baseFee = 22000;
      let eta = '1 - 2 ngày';

      if (province?.id === 249) {
        // Nội tỉnh Bắc Ninh
        baseFee = 16500;
        eta = 'Trong 24h';
      } else if (province?.zone === 'NORTH') {
        // Liên tỉnh Miền Bắc (Hà Nội, Hải Phòng...)
        baseFee = 22000;
        eta = '1 - 2 ngày';
      } else if (province?.zone === 'CENTRAL') {
        // Miền Trung (Đà Nẵng...)
        baseFee = 30000;
        eta = '2 - 3 ngày';
      } else {
        // Miền Nam (TP.HCM...)
        baseFee = 35000;
        eta = '3 - 4 ngày';
      }

      // Phụ phí vượt cân nặng tiêu chuẩn (trên 500g, mỗi 500g tiếp theo +5.000đ)
      const extraWeightBlocks = Math.max(0, Math.ceil((cartTotalWeight - 500) / 500));
      let calculatedFee = baseFee + extraWeightBlocks * 5000;

      // Chính sách Freeship nếu đạt mốc đơn hàng
      if (cartSubtotal >= shopConfig.freeshipThreshold) {
        calculatedFee = 0;
      } else if (paymentMethod === 'VIETQR') {
        // Giảm trực tiếp phí ship khi khách thanh toán trước qua VietQR
        calculatedFee = Math.max(0, calculatedFee - shopConfig.vietqrDiscount);
      }

      setShippingFee(calculatedFee);
      setEstimatedDelivery(eta);
      setIsCalculatingShip(false);
    }, 550); // Mô phỏng độ trễ gọi API GHN ~550ms

    return () => clearTimeout(timer);
  }, [
    selectedProvinceId,
    selectedDistrictId,
    selectedWardCode,
    cartTotalWeight,
    cartSubtotal,
    paymentMethod,
    shopConfig.freeshipThreshold,
    shopConfig.vietqrDiscount
  ]);

  // ============================================================================
  // CÁC HÀM THAO TÁC GIỎ HÀNG
  // ============================================================================
  const addToCart = (product) => {
    if (product.stock <= 0) {
      showToast('Sản phẩm này tạm thời hết hàng!');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Chỉ còn ${product.stock} sản phẩm trong kho!`);
          return prev;
        }
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ`);
  };

  const updateCartQuantity = (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId !== productId) return item;
          const nextQty = item.quantity + delta;
          if (nextQty <= 0) return null;
          if (product && nextQty > product.stock) {
            showToast(`Tối đa ${product.stock} sản phẩm có sẵn`);
            return item;
          }
          return { ...item, quantity: nextQty };
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // ============================================================================
  // XỬ LÝ ĐẶT HÀNG & TẠO MÃ ĐƠN VIETQR / COD
  // ============================================================================
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !selectedWardCode || !addressDetail.trim()) {
      showToast('Vui lòng điền đầy đủ thông tin nhận hàng!');
      return;
    }

    const wardObj = currentDistrict?.wards.find((w) => w.code === selectedWardCode);
    const fullAddress = `${addressDetail}, ${wardObj?.name}, ${currentDistrict?.name}, ${currentProvince?.name}`;
    const randomCode = 'DH' + Math.floor(1000 + Math.random() * 9000);
    const finalTotal = cartSubtotal + shippingFee;

    const newOrder = {
      orderCode: randomCode,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      fullAddress,
      note: note.trim(),
      items: cartDetails.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: cartSubtotal,
      shippingFee,
      totalAmount: finalTotal,
      paymentMethod,
      paymentStatus: 'UNPAID',
      orderStatus: 'NEW',
      trackingCode: '',
      createdAt: 'Vừa xong'
    };

    // Nếu là COD thì trừ tồn kho luôn và lưu đơn
    if (paymentMethod === 'COD') {
      deductStock(newOrder.items);
    }

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setCart([]); // Xóa giỏ hàng sau khi tạo đơn
    setActiveView('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trừ tồn kho sản phẩm
  const deductStock = (orderItems) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const bought = orderItems.find((i) => i.productId === prod.id);
        if (!bought) return prod;
        return {
          ...prod,
          stock: Math.max(0, prod.stock - bought.quantity)
        };
      })
    );
  };

  // Mô phỏng Webhook từ SePay / Casso báo tiền đã vào tài khoản
  const simulateWebhookPayment = (orderCode) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderCode !== orderCode) return ord;
        deductStock(ord.items);
        const updated = { ...ord, paymentStatus: 'PAID' };
        setCurrentOrder(updated);
        return updated;
      })
    );
    showToast('Webhook SePay: Đã nhận được tiền chuyển khoản! Đơn hàng tự động duyệt.');
  };

  // Copy nhanh thông tin chuyển khoản
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(String(text));
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  // ============================================================================
  // HÀM QUẢN TRỊ ADMIN (THÊM SẢN PHẨM & ĐẨY ĐƠN SANG GHN)
  // ============================================================================
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created = {
      id: 'prod-' + Date.now(),
      name: newProduct.name,
      category: newProduct.category || 'Phụ kiện',
      price: Number(newProduct.price),
      weightGram: Number(newProduct.weightGram) || 300,
      stock: Number(newProduct.stock) || 10,
      description: newProduct.description || 'Sản phẩm chất lượng cao, giao hàng toàn quốc qua GHN.',
      badge: 'Mới',
      color: 'from-blue-600 to-cyan-600',
      iconType: 'default'
    };

    setProducts((prev) => [created, ...prev]);
    setNewProduct({
      name: '',
      category: 'Dụng cụ DIY',
      price: '',
      weightGram: '300',
      stock: '20',
      description: ''
    });
    showToast('Đã thêm sản phẩm mới lên cửa hàng!');
  };

  const handlePushToGHN = (orderCode) => {
    const fakeTracking = 'GHN' + Math.floor(1000000 + Math.random() * 9000000);
    setOrders((prev) =>
      prev.map((o) =>
        o.orderCode === orderCode
          ? { ...o, orderStatus: 'SHIPPING', trackingCode: fakeTracking }
          : o
      )
    );
    showToast(`Đã đẩy đơn ${orderCode} sang GHN! Mã vận đơn: ${fakeTracking}`);
  };

  // URL ảnh mã VietQR động theo chuẩn Napas / VietQR.io
  const getVietQRUrl = (order) => {
    if (!order) return '';
    const bank = shopConfig.bankCode || 'MB';
    const acc = shopConfig.accountNo || '0987654321';
    const amount = order.totalAmount;
    const info = encodeURIComponent(order.orderCode);
    const accName = encodeURIComponent(shopConfig.accountName);
    return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${accName}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* ===================================================================== */}
      {/* THÔNG BÁO TOAST NỔI                                                   */}
      {/* ===================================================================== */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* HEADER ĐIỀU HƯỚNG CHÍNH                                               */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo Cửa hàng */}
          <button
            onClick={() => setActiveView('store')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                {shopConfig.shopName}
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Giao hàng GHN • Thanh toán VietQR tự động
              </p>
            </div>
          </button>

          {/* Thanh tìm kiếm nhanh trên Desktop */}
          {activeView === 'store' && (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tua vít, trạm hàn, đèn bàn..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl text-sm outline-none transition"
              />
            </div>
          )}

          {/* Các nút chức năng bên phải */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'store' : 'admin')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 border transition ${
                activeView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{activeView === 'admin' ? 'Về Cửa Hàng' : 'Quản Trị Shop'}</span>
              {orders.filter((o) => o.orderStatus === 'NEW').length > 0 && activeView !== 'admin' && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full font-bold">
                  {orders.filter((o) => o.orderStatus === 'NEW').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartTotalCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* NỘI DUNG CHÍNH THEO TỪNG VIEW                                         */}
      {/* ===================================================================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {/* ------------------------------------------------------------------- */}
        {/* VIEW 1: CỬA HÀNG (STOREFRONT)                                       */}
        {/* ------------------------------------------------------------------- */}
        {activeView === 'store' && (
          <div className="space-y-6">
            {/* Banner thông báo ưu đãi Freeship & VietQR */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 sm:p-7 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ưu đãi tự động tại Checkout</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Miễn phí vận chuyển GHN cho đơn từ {formatVND(shopConfig.freeshipThreshold)}
                </h2>
                <p className="text-blue-100 text-sm">
                  Giảm ngay {formatVND(shopConfig.vietqrDiscount)} phí ship khi thanh toán chuyển khoản nhanh qua VietQR.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/15 text-xs shrink-0">
                <Truck className="w-8 h-8 text-blue-200" />
                <div>
                  <p className="font-semibold text-white">Tính cước GHN tự động</p>
                  <p className="text-blue-100">Theo khối lượng & địa chỉ thực tế</p>
                </div>
              </div>
            </div>

            {/* Tìm kiếm trên mobile & Thanh lọc danh mục */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="md:hidden relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            {/* Lưới danh sách sản phẩm */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">Không tìm thấy sản phẩm phù hợp</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Tất cả');
                  }}
                  className="mt-3 text-sm text-blue-600 font-medium hover:underline"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
                  >
                    {/* Ảnh minh họa & Badge */}
                    <div
                      onClick={() => setQuickViewProduct(product)}
                      className="relative cursor-pointer overflow-hidden"
                    >
                      <ProductIllustration type={product.iconType} gradient={product.color} />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded-md">
                        Nặng: {product.weightGram}g
                      </span>
                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span>{product.category}</span>
                          <span>Kho: {product.stock}</span>
                        </div>
                        <h3
                          onClick={() => setQuickViewProduct(product)}
                          className="font-bold text-slate-900 text-base leading-snug hover:text-blue-600 cursor-pointer line-clamp-2"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-lg font-bold text-blue-600">
                            {formatVND(product.price)}
                          </p>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock <= 0}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{product.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 2: TRANG THANH TOÁN (CHECKOUT CHUẨN GHN & VIETQR)              */}
        {/* ------------------------------------------------------------------- */}
        {activeView === 'checkout' && (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setActiveView('store')}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại mua sắm</span>
            </button>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG & ĐỊA CHỈ 3 CẤP GHN */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h2 className="font-bold text-lg text-slate-900">Thông tin nhận hàng (GHN)</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Họ và tên người nhận *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="0912345678"
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bộ chọn địa chính 3 cấp động */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tỉnh / Thành phố *
                      </label>
                      <select
                        required
                        value={selectedProvinceId}
                        onChange={(e) => {
                          setSelectedProvinceId(e.target.value);
                          setSelectedDistrictId('');
                          setSelectedWardCode('');
                        }}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-500 outline-none"
                      >
                        <option value="">-- Chọn Tỉnh/TP --</option>
                        {VIETNAM_LOCATIONS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quận / Huyện *
                      </label>
                      <select
                        required
                        disabled={!selectedProvinceId}
                        value={selectedDistrictId}
                        onChange={(e) => {
                          setSelectedDistrictId(e.target.value);
                          setSelectedWardCode('');
                        }}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100 focus:border-blue-500 outline-none"
                      >
                        <option value="">-- Chọn Quận/Huyện --</option>
                        {currentProvince?.districts.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phường / Xã *
                      </label>
                      <select
                        required
                        disabled={!selectedDistrictId}
                        value={selectedWardCode}
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100 focus:border-blue-500 outline-none"
                      >
                        <option value="">-- Chọn Phường/Xã --</option>
                        {currentDistrict?.wards.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Địa chỉ cụ thể (Số nhà, tên đường, tòa nhà) *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                      placeholder="Ví dụ: Số 12, ngõ 45 đường Nguyễn Trãi"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ghi chú cho shipper (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Giao giờ hành chính, gọi trước khi giao..."
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* PHƯƠNG THỨC THANH TOÁN */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                    Phương thức thanh toán
                  </h2>

                  <label
                    onClick={() => setPaymentMethod('VIETQR')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                      paymentMethod === 'VIETQR'
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'VIETQR'}
                      onChange={() => setPaymentMethod('VIETQR')}
                      className="mt-1 accent-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-slate-900 flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-blue-600" />
                          Chuyển khoản nhanh VietQR (Tự động duyệt)
                        </span>
                        <span className="text-[11px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Giảm {formatVND(shopConfig.vietqrDiscount)} phí ship
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Quét mã QR bằng ứng dụng ngân hàng bất kỳ. Hệ thống tự động xác nhận đơn hàng ngay lập tức.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                      paymentMethod === 'COD'
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 accent-blue-600"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-slate-600" />
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        Kiểm tra hàng và thanh toán tiền mặt trực tiếp cho bưu tá Giao Hàng Nhanh.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG & CƯỚC PHÍ GHN REALTIME */}
              <div className="lg:col-span-5">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-22 space-y-4">
                  <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                    Đơn hàng ({cartTotalCount} sản phẩm)
                  </h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cartDetails.map((item) => (
                      <div key={item.id} className="flex justify-between items-start text-sm gap-3">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-slate-500">
                            SL: {item.quantity} • {item.lineWeight}g
                          </p>
                        </div>
                        <span className="font-semibold text-slate-900 shrink-0">
                          {formatVND(item.lineTotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Thông tin vận chuyển GHN */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Truck className="w-4 h-4 text-blue-600" />
                        Đơn vị vận chuyển:
                      </span>
                      <span className="font-bold text-slate-900">Giao Hàng Nhanh (GHN)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Tổng khối lượng đóng gói:</span>
                      <span className="font-semibold text-slate-800">{cartTotalWeight} gram</span>
                    </div>
                    {estimatedDelivery && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Dự kiến giao hàng:</span>
                        <span className="font-semibold text-emerald-700">{estimatedDelivery}</span>
                      </div>
                    )}
                  </div>

                  {/* Tổng kết chi phí */}
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Tạm tính tiền hàng</span>
                      <span className="font-medium text-slate-900">{formatVND(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between text-slate-600 items-center">
                      <span>Phí vận chuyển GHN</span>
                      {!selectedWardCode ? (
                        <span className="text-xs text-amber-600 font-medium">
                          Chọn Phường/Xã để tính
                        </span>
                      ) : isCalculatingShip ? (
                        <span className="text-xs text-blue-600 flex items-center gap-1 font-medium">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Đang tính cước GHN...
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-900">
                          {shippingFee === 0 ? (
                            <span className="text-emerald-600 font-bold">Miễn phí (0 đ)</span>
                          ) : (
                            formatVND(shippingFee)
                          )}
                        </span>
                      )}
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                      <span className="font-bold text-base text-slate-900">Tổng thanh toán</span>
                      <span className="font-extrabold text-xl text-blue-600">
                        {formatVND(cartSubtotal + shippingFee)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedWardCode || isCalculatingShip || cartDetails.length === 0}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
                  >
                    {paymentMethod === 'VIETQR' ? (
                      <>
                        <QrCode className="w-4 h-4" />
                        <span>Tạo mã VietQR & Đặt hàng</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Hoàn tất đặt hàng COD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 3: MÀN HÌNH THANH TOÁN VIETQR ĐỘNG & XÁC NHẬN ĐƠN HÀNG          */}
        {/* ------------------------------------------------------------------- */}
        {activeView === 'payment' && currentOrder && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Header trạng thái */}
              <div
                className={`p-6 text-center text-white ${
                  currentOrder.paymentStatus === 'PAID' || currentOrder.paymentMethod === 'COD'
                    ? 'bg-emerald-600'
                    : 'bg-blue-600'
                }`}
              >
                {currentOrder.paymentStatus === 'PAID' ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-white" />
                    <h2 className="text-2xl font-bold">Thanh toán thành công!</h2>
                    <p className="text-emerald-100 text-sm">
                      Hệ thống đã nhận được chuyển khoản và tự động duyệt đơn hàng{' '}
                      <strong>{currentOrder.orderCode}</strong>.
                    </p>
                  </div>
                ) : currentOrder.paymentMethod === 'COD' ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-white" />
                    <h2 className="text-2xl font-bold">Đặt hàng COD thành công!</h2>
                    <p className="text-emerald-100 text-sm">
                      Đơn hàng <strong>{currentOrder.orderCode}</strong> đã được ghi nhận và đang chuẩn bị giao qua GHN.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-medium">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang chờ thanh toán tự động qua Webhook...</span>
                    </div>
                    <h2 className="text-2xl font-bold">Quét mã VietQR để thanh toán</h2>
                    <p className="text-blue-100 text-sm">
                      Mở ứng dụng ngân hàng bất kỳ trên điện thoại và quét mã bên dưới
                    </p>
                  </div>
                )}
              </div>

              {/* Nội dung mã QR nếu đang chờ chuyển khoản VietQR */}
              {currentOrder.paymentMethod === 'VIETQR' && currentOrder.paymentStatus === 'UNPAID' && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    {/* Ảnh QR thật từ API VietQR.io */}
                    <div className="w-56 h-56 bg-white p-2 rounded-xl border border-slate-200 shadow-sm shrink-0 flex items-center justify-center">
                      <img
                        src={getVietQRUrl(currentOrder)}
                        alt="Mã thanh toán VietQR"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Thông tin chuyển khoản thủ công & Nút Copy */}
                    <div className="flex-1 w-full space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Ngân hàng thụ hưởng</p>
                        <p className="font-bold text-slate-900">
                          {SUPPORTED_BANKS.find((b) => b.code === shopConfig.bankCode)?.name ||
                            shopConfig.bankCode}
                        </p>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                        <div>
                          <p className="text-[11px] text-slate-500">Số tài khoản</p>
                          <p className="font-bold text-slate-900">{shopConfig.accountNo}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(shopConfig.accountNo, 'acc')}
                          className="px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg font-medium flex items-center gap-1"
                        >
                          {copiedField === 'acc' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedField === 'acc' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                        <div>
                          <p className="text-[11px] text-slate-500">Số tiền chính xác</p>
                          <p className="font-bold text-blue-600 text-base">
                            {formatVND(currentOrder.totalAmount)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(currentOrder.totalAmount, 'amount')}
                          className="px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg font-medium flex items-center gap-1"
                        >
                          {copiedField === 'amount' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedField === 'amount' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                        <div>
                          <p className="text-[11px] text-amber-800">Nội dung chuyển khoản (Bắt buộc)</p>
                          <p className="font-extrabold text-amber-900 text-base">
                            {currentOrder.orderCode}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(currentOrder.orderCode, 'code')}
                          className="px-2.5 py-1.5 text-xs bg-amber-200/70 hover:bg-amber-200 text-amber-900 rounded-lg font-semibold flex items-center gap-1"
                        >
                          {copiedField === 'code' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedField === 'code' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Nút mô phỏng Webhook nhận tiền tự động */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-blue-900">
                      <p className="font-bold">Chế độ trải nghiệm luồng tự động (Sandbox):</p>
                      <p className="text-blue-700 mt-0.5">
                        Bấm nút bên cạnh để giả lập ngân hàng báo tiền về qua Webhook SePay/Casso.
                      </p>
                    </div>
                    <button
                      onClick={() => simulateWebhookPayment(currentOrder.orderCode)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm shrink-0 transition"
                    >
                      Mô phỏng Webhook (Đã nhận tiền)
                    </button>
                  </div>
                </div>
              )}

              {/* Tóm tắt thông tin đơn hàng đã tạo */}
              <div className="p-6 border-t border-slate-100 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã đơn hàng:</span>
                  <span className="font-bold text-slate-900">{currentOrder.orderCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Người nhận:</span>
                  <span className="font-medium text-slate-900">
                    {currentOrder.customerName} - {currentOrder.customerPhone}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 shrink-0">Địa chỉ giao GHN:</span>
                  <span className="font-medium text-slate-900 text-right">
                    {currentOrder.fullAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tổng thanh toán:</span>
                  <span className="font-bold text-blue-600 text-base">
                    {formatVND(currentOrder.totalAmount)}
                  </span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveView('store')}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition"
                  >
                    Tiếp tục mua hàng
                  </button>
                  <button
                    onClick={() => setActiveView('admin')}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition"
                  >
                    Xem đơn trong Trang Quản Trị
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* VIEW 4: TRANG QUẢN TRỊ MINI (ADMIN DASHBOARD)                       */}
        {/* ------------------------------------------------------------------- */}
        {activeView === 'admin' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Quản trị Cửa hàng & Đơn vận</h2>
                <p className="text-sm text-slate-500">
                  Cấu hình tài khoản nhận VietQR, xử lý đơn hàng và đẩy vận đơn sang GHN
                </p>
              </div>
              <button
                onClick={() => setActiveView('store')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 self-start"
              >
                Mở giao diện khách mua
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* CỘT TRÁI: CẤU HÌNH VIETQR & THÊM SẢN PHẨM */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cấu hình tài khoản nhận VietQR */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Cấu hình nhận tiền VietQR của bạn
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên cửa hàng
                    </label>
                    <input
                      type="text"
                      value={shopConfig.shopName}
                      onChange={(e) => setShopConfig({ ...shopConfig, shopName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ngân hàng
                      </label>
                      <select
                        value={shopConfig.bankCode}
                        onChange={(e) => setShopConfig({ ...shopConfig, bankCode: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white"
                      >
                        {SUPPORTED_BANKS.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số tài khoản
                      </label>
                      <input
                        type="text"
                        value={shopConfig.accountNo}
                        onChange={(e) => setShopConfig({ ...shopConfig, accountNo: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên chủ tài khoản (Không dấu)
                    </label>
                    <input
                      type="text"
                      value={shopConfig.accountName}
                      onChange={(e) =>
                        setShopConfig({ ...shopConfig, accountName: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                    Mẹo: Nhập đúng số tài khoản ngân hàng của bạn ở trên, sau đó thử đặt 1 đơn hàng để quét thử mã QR thật bằng app ngân hàng!
                  </p>
                </div>

                {/* Form thêm sản phẩm mới */}
                <form
                  onSubmit={handleAddProduct}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Box className="w-4 h-4 text-blue-600" />
                    Đăng bán sản phẩm mới
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ví dụ: Bộ kìm bấm cos đa năng..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Giá bán (đ) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1000"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="150000"
                        className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nặng (gram)
                      </label>
                      <input
                        type="number"
                        min="10"
                        value={newProduct.weightGram}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, weightGram: e.target.value })
                        }
                        className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tồn kho
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mô tả ngắn
                    </label>
                    <textarea
                      rows="2"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                      placeholder="Thông số kỹ thuật, chất liệu..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition"
                  >
                    + Thêm lên cửa hàng
                  </button>
                </form>
              </div>

              {/* CỘT PHẢI: DANH SÁCH ĐƠN HÀNG & XỬ LÝ VẬN ĐƠN */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-base text-slate-900 mb-4 flex items-center justify-between">
                    <span>Danh sách đơn hàng ({orders.length})</span>
                    <span className="text-xs font-normal text-slate-500">
                      Kho xuất: {shopConfig.warehouseAddress}
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderCode}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-blue-600">{order.orderCode}</span>
                            <span className="text-xs text-slate-400">• {order.createdAt}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Badge trạng thái thanh toán */}
                            {order.paymentStatus === 'PAID' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                                ĐÃ THANH TOÁN (VIETQR)
                              </span>
                            ) : order.paymentMethod === 'COD' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700">
                                THU HỘ COD
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                CHỜ CHUYỂN KHOẢN
                              </span>
                            )}

                            {/* Badge trạng thái giao vận */}
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                order.orderStatus === 'SHIPPING'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {order.orderStatus === 'SHIPPING' ? 'Đang giao GHN' : 'Đơn mới'}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-700 space-y-1">
                          <p>
                            <strong>Khách hàng:</strong> {order.customerName} ({order.customerPhone})
                          </p>
                          <p>
                            <strong>Địa chỉ:</strong> {order.fullAddress}
                          </p>
                          <p>
                            <strong>Sản phẩm:</strong>{' '}
                            {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/80">
                          <div className="text-sm">
                            <span className="text-slate-500">Tổng thu: </span>
                            <span className="font-bold text-slate-900">
                              {formatVND(order.totalAmount)}
                            </span>
                            <span className="text-xs text-slate-500 ml-1">
                              (Ship: {formatVND(order.shippingFee)})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {order.paymentMethod === 'VIETQR' && order.paymentStatus === 'UNPAID' && (
                              <button
                                onClick={() => simulateWebhookPayment(order.orderCode)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                              >
                                Duyệt tiền về
                              </button>
                            )}

                            {order.trackingCode ? (
                              <span className="text-xs font-mono font-bold bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-blue-700">
                                Mã GHN: {order.trackingCode}
                              </span>
                            ) : (
                              <button
                                onClick={() => handlePushToGHN(order.orderCode)}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>Đẩy đơn sang GHN</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* MODAL XEM NHANH CHI TIẾT SẢN PHẨM                                     */}
      {/* ===================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative">
              <ProductIllustration
                type={quickViewProduct.iconType}
                gradient={quickViewProduct.color}
              />
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{quickViewProduct.name}</h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                <span>Khối lượng: <strong>{quickViewProduct.weightGram}g</strong></span>
                <span>•</span>
                <span>Tồn kho: <strong>{quickViewProduct.stock} sản phẩm</strong></span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-extrabold text-blue-600">
                  {formatVND(quickViewProduct.price)}
                </span>
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  disabled={quickViewProduct.stock <= 0}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-bold flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* DRAWER GIỎ HÀNG (TRƯỢT TỪ PHẢI SANG)                                  */}
      {/* ===================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
            {/* Header giỏ hàng */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-lg text-slate-900">
                  Giỏ hàng ({cartTotalCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Danh sách sản phẩm trong giỏ */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartDetails.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <ShoppingBag className="w-14 h-14 text-slate-200 mb-3" />
                  <p className="font-semibold text-slate-700">Giỏ hàng của bạn đang trống</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Hãy chọn thêm sản phẩm để trải nghiệm tính phí ship GHN & thanh toán QR nhé!
                  </p>
                </div>
              ) : (
                cartDetails.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-blue-600 font-bold mt-0.5">
                        {formatVND(item.price)}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Khối lượng: {item.lineWeight}g
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-1 p-1.5 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer giỏ hàng */}
            {cartDetails.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                {/* Thanh tiến độ Freeship */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                  {cartSubtotal >= shopConfig.freeshipThreshold ? (
                    <p className="text-emerald-600 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Đơn hàng của bạn đã đủ điều kiện Miễn phí vận chuyển!
                    </p>
                  ) : (
                    <p className="text-slate-600">
                      Mua thêm{' '}
                      <strong className="text-blue-600">
                        {formatVND(shopConfig.freeshipThreshold - cartSubtotal)}
                      </strong>{' '}
                      để được Freeship GHN toàn quốc.
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>Tổng khối lượng dự kiến:</span>
                    <span>{cartTotalWeight} gram</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-slate-900">
                    <span>Tạm tính:</span>
                    <span className="text-blue-600">{formatVND(cartSubtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Tiến hành thanh toán</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}