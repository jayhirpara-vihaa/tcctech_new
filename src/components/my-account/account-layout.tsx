import Container from "@components/ui/container";
import AccountNav from "@components/my-account/account-nav";
const AccountLayout: React.FunctionComponent<any> = ({ children }) => {
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!getToken()) {
  //       router.push("/");
  //     }
  //   }, []);
  return (
    <>
      <Container>
        <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex  md:flex-row w-full mt-16 md:mt-16 lg:mt-24 xl:mt-0">
          <div className="flex flex-col md:flex-row w-full ">
            <AccountNav />
            <div className="border-l border-gray-300 px-4" />
            <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0 mx-4">
              {children}
            </div>
          </div>
        </div>
        {/* <Subscription /> */}
      </Container>
    </>
  );
};

export default AccountLayout;
