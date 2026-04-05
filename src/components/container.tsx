const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="container mx-auto bg-amber-200 flex justify-center">
      {children}
    </div>
  );
};

export { Container };
