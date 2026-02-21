export const Footer = () => {
  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Ch4rl0tt3. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
};
