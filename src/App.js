import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Search from "./Search"
import Shelves from "./Shelves"
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
      .then(() => {
        this.setState((prevState) => {
          return {
            books: prevState.books.map(Search => {
              if (book.id === Search.id) {
                Search.shelf = shelf
              }
              return Search;
            })
          }
        })
      })
      .then(() => { //
        BooksAPI.getAll().then((books) => {
          this.setState({ books });
        })
      })
  }

  render() {

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          !this.state.books ? null :

            <Shelves
              books={this.state.books}
              shelf={this.state.shelf}
              key={this.props.key}
              moveBook={this.moveBook}
              book={this.state.book}
            />
        )}
        />

        <Route exact path="/Search" render={() => (
          <Search
            books={this.state.books}
            results={this.props.results}
            key={this.props.key}
            moveBook={this.moveBook}
            book={this.props.book}
            shelf={this.state.shelf}
          />
        )}
        />

      </div>
    )
  }
}

export default BooksApp