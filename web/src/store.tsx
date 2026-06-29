import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Category, Product } from "@/data/site";

export interface CartItem {
  id: string;
  category: string;
  name: string;
  size: string;
  qty: number;
  unit: string;
  img: string;
}

export type ModalType = "call" | "consult" | "checkout" | null;

interface ProductModalState {
  catIndex: number;
  prodIndex: number;
}

interface StoreValue {
  items: CartItem[];
  count: number;
  city: string;
  setCity: (c: string) => void;
  addItem: (cat: Category, product: Product, size: string, qty: number) => void;
  inc: (i: number) => void;
  dec: (i: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  modal: ModalType;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
  productModal: ProductModalState | null;
  openProduct: (catIndex: number, prodIndex?: number) => void;
  closeProduct: () => void;
  toast: string;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [city, setCityState] = useState<string>("Алматы");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [productModal, setProductModal] = useState<ProductModalState | null>(
    null
  );
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("yei_cart", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("yei_cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
        const savedCity = localStorage.getItem("yei_city");
        if (savedCity) {
          setCityState(savedCity);
        }
      } catch {
        // Ignore errors
      }
    }
  }, []);

  const setCity = useCallback((c: string) => {
    setCityState(c);
    if (typeof window !== "undefined") {
      localStorage.setItem("yei_city", c);
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 5000);
  }, []);

  const addItem = useCallback(
    (cat: Category, product: Product, size: string, qty: number) => {
      const id = `${cat.id}|${product.name}|${size}`;
      setItems((prev) => {
        const ex = prev.find((c) => c.id === id);
        if (ex) {
          return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
        }
        return [
          ...prev,
          {
            id,
            category: cat.name,
            name: product.name,
            size,
            qty,
            unit: product.unit,
            img: cat.img,
          },
        ];
      });
      showToast(`«${product.name}» добавлен в корзину (${qty} ${product.unit}).`);
      setDrawerOpen(true);
    },
    [showToast]
  );

  const inc = useCallback(
    (i: number) =>
      setItems((prev) =>
        prev.map((c, idx) => (idx === i ? { ...c, qty: c.qty + 1 } : c))
      ),
    []
  );
  const dec = useCallback(
    (i: number) =>
      setItems((prev) =>
        prev.map((c, idx) =>
          idx === i ? { ...c, qty: Math.max(1, c.qty - 1) } : c
        )
      ),
    []
  );
  const remove = useCallback(
    (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i)),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );

  const value: StoreValue = {
    items,
    count,
    city,
    setCity,
    addItem,
    inc,
    dec,
    remove,
    clear,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    modal,
    openModal: (m) => setModal(m),
    closeModal: () => setModal(null),
    productModal,
    openProduct: (catIndex, prodIndex = 0) =>
      setProductModal({ catIndex, prodIndex }),
    closeProduct: () => setProductModal(null),
    toast,
    showToast,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
