import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";

const Home = () => {
  return (
    <div>
      <Main />
      <Row rowID="1" title="UpComing" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID="4" title="Trending" fetchURL={requests.requestTrending} />
      {/* <Row title="" fetchURL={requests.requestUpcoming} /> */}
    </div>
  );
};

export default Home;
