import { Component } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Button } from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import "react-toastify/dist/ReactToastify.css";
import css from "./App.module.css";
import { fetchImages } from "./fetchImages/fetchImages";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";

let page = 1;

export default class App extends Component {
  state = {
    inputData: "",
    items: [],

    status: "idle",
    totalHits: 0,
  };

  handleSubmit = async (inputData) => {
    page = 1;
    if (inputData.trim() === "") {
      return alert("Line is empty, please enter your request");
      // toast.warn("Line is empty, please enter your request");
    } else {
      try {
        this.setState({ status: "pending" });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: "idle" });
          alert(
            "There are no images matching your request. Please try again."
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: "resolved",
          });
        }
      } catch (error) {
        this.setState({ status: "rejected" });
      }
    }
  };
  onNextPage = async () => {
    this.setState({ status: "pending" });

    try {
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState((prevState) => ({
        status: "resolved",
        items: [...prevState.items, ...hits],
      }));
    } catch (error) {
      this.setState({ status: "rejected" });
    }
  };
  render() {
    const { totalHits, items, status } = this.state;
    if (status === "idle") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === "rejected") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something went wrong, please try again later.</p>
        </div>
      );
    }
    if (status === "resolved") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
      {/* <ToastContainer autoClose={3000}/> */}
        </div>
      );
    }
  }
}
