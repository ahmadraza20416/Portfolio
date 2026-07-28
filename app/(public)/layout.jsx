// ⚡ ISR: Cache all public pages for 60 seconds for maximum speed
export const revalidate = 60;

export default function PublicLayout({ children }) {
  return children;
}
