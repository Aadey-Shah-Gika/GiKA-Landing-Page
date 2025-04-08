export default function PlatformLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    );
  }