import spinner from "../images/spinner.gif";

const PageLoader = () => {
  return (
    <div className="page-container">
      <img src={spinner} className="page-loader" alt="Loading..."></img>
    </div>
  );
};

export default PageLoader;
