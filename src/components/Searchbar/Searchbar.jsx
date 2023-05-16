import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';


export default class Searchbar extends Component {
  state = {
    inputData: '',
  };
  onChangeInput = event => {
    this.setState({ inputData: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };

  render() {
    const { inputData } = this.state.inputData;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            {/* <ImSearch size={25} /> */}
          </button>

          <input
            className={css.SearchForm__input}
            // name="inputData"
            value={inputData}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};