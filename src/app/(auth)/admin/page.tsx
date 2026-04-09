export default async function Home() {
  await new Promise((resovle) => {
    setTimeout(() => {
      resovle("intentional delay");
    }, 2000);
  });

  return (
    <div>
      <h1>ADMIN</h1>
    </div>
  );
}
