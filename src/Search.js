import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import { Link } from 'react-router-dom'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    searchInput = (query) => {
        const queryTrimmed = query.trim()
        if (!queryTrimmed.length) {
            this.setState({results:[]})
            return
        }
        if (queryTrimmed !== 0) {
            BooksAPI.search(queryTrimmed)
            .then(returned => {
                if (!returned || returned.error) {
                    this.setState({results:[]})
                    return
                }
                const sameIDbooks = returned.map(returnedItem => {
                    this.props.books.forEach(book => {
                        if (book.id === returnedItem.id) returnedItem.shelf = book.shelf
                    })
                    return returnedItem
                })
                this.setState({results:sameIDbooks})
            })
        }
        else {
            this.setState({results:[]})
            return
        }
    }

    render() {
        console.log(this.state.results.map((book) =>book.shelf))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >Close
             </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.searchInput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map((book) =>
                            <li key={book.id}>
                                <Books
                                    //For unavailable images
                                    thumb={book.imageLinks?book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=No%20Cover`}
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    moveBook={this.props.moveBook}
                                    book={book}
                                />
                            </li>
                        )}

                    </ol>
                </div>
            </div>
        )
    }
}

export default Search