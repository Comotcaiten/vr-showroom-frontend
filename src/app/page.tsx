import Spinner from "../components/spinner";
import MyHeader from "../components/my.header";
import MyFooter from "../components/my.footer";

export default function Home() {
  return (
    <div>
      <MyHeader></MyHeader>
      <div className="container mx-auto bg-amber-200 flex justify-center">
        <Spinner></Spinner>
      </div>
      <MyFooter></MyFooter>
    </div>
  );
}
