import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      ownerId: null,
      items: [],
      initializeForUser: (ownerId) =>
        set((state) =>
          state.ownerId === String(ownerId)
            ? state
            : { ownerId: String(ownerId), items: [] }
        ),
      addToCart: (book) =>
        set((state) => {
          const id = String(book._id || book.id);
          const existing = state.items.find((item) => String(item._id || item.id) === id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                String(item._id || item.id) === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...book,
                _id: book._id || book.id,
                quantity: 1,
              },
            ],
          };
        }),
      increase: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            String(item._id || item.id) === String(id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              String(item._id || item.id) === String(id)
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((item) => String(item._id || item.id) !== String(id)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "bookverse-cart" }
  )
);
